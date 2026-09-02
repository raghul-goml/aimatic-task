"""
FAISS Vector Store Adapter

This module provides the FAISS implementation of the VectorStoreAdapter interface.
FAISS is designed for local/embedded vector search without a server.
"""

import os
import json
import pickle
import logging
from typing import List, Dict, Any, Optional
from pathlib import Path

from app.adapters.vector_store.base import (
    VectorStoreAdapter,
    VectorStoreConfig,
    SearchResult,
    DistanceMetric,
)
from app.config.rag.registry import register_adapter

logger = logging.getLogger(__name__)


@register_adapter("faiss")
class FAISSAdapter(VectorStoreAdapter):
    """
    FAISS vector database adapter.
    
    FAISS (Facebook AI Similarity Search) is a library for efficient
    similarity search, ideal for local/offline deployments.
    """

    def __init__(self, config: VectorStoreConfig):
        """Initialize the FAISS adapter."""
        logger.debug("Initializing FAISSAdapter with config: %s", config)
        super().__init__(config)
        self._indices: Dict[str, Any] = {}  # collection_name -> faiss index
        self._metadata: Dict[str, Dict[str, Dict]] = {}  # collection_name -> {id -> metadata}
        self._id_map: Dict[str, Dict[int, str]] = {}  # collection_name -> {faiss_id -> our_id}
        self._reverse_id_map: Dict[str, Dict[str, int]] = {}  # collection_name -> {our_id -> faiss_id}
        self._storage_path: Optional[Path] = None
        self._faiss = None
        logger.debug("FAISSAdapter initialized.")

    async def connect(self) -> None:
        """Initialize FAISS (no server connection needed)."""
        logger.debug("Connecting FAISSAdapter...")
        try:
            import faiss
            self._faiss = faiss

            # Set up storage path for persistence
            storage_path = self.config.extra_params.get("storage_path", "./faiss_data")
            self._storage_path = Path(storage_path)
            self._storage_path.mkdir(parents=True, exist_ok=True)
            logger.info(f"FAISS storage directory ensured at {self._storage_path}")

            # Load existing indices if any
            logger.debug("Loading FAISS indices from disk on connect.")
            await self._load_indices()

            logger.info(f"FAISS initialized with storage at {self._storage_path}")
        except ImportError:
            logger.error("faiss-cpu is required for FAISS adapter. Install with: pip install faiss-cpu")
            raise ImportError("faiss-cpu is required for FAISS adapter. Install with: pip install faiss-cpu")
        except Exception as e:
            logger.error(f"Failed to initialize FAISS: {e}")
            raise ConnectionError(f"Failed to initialize FAISS: {e}")

    async def disconnect(self) -> None:
        """Save indices and clean up."""
        logger.debug("Disconnecting FAISSAdapter, saving indices and clearing in-memory state.")
        await self._save_indices()
        self._indices.clear()
        self._metadata.clear()
        self._id_map.clear()
        self._reverse_id_map.clear()
        logger.info("FAISS disconnected")

    async def _load_indices(self) -> None:
        """Load existing indices from disk."""
        logger.debug(f"Attempting to load FAISS indices from storage path: {self._storage_path}")
        if not self._storage_path:
            logger.warning("No storage path set; skipping FAISS index loading.")
            return

        for index_file in self._storage_path.glob("*.index"):
            collection_name = index_file.stem
            try:
                logger.debug(f"Attempting to load index for collection: {collection_name}")
                # Load FAISS index
                self._indices[collection_name] = self._faiss.read_index(str(index_file))
                logger.debug(f"Index file {index_file} successfully loaded.")

                # Load metadata
                meta_file = self._storage_path / f"{collection_name}.meta"
                if meta_file.exists():
                    with open(meta_file, "rb") as f:
                        data = pickle.load(f)
                        self._metadata[collection_name] = data.get("metadata", {})
                        self._id_map[collection_name] = data.get("id_map", {})
                        self._reverse_id_map[collection_name] = data.get("reverse_id_map", {})
                    logger.debug(f"Metadata file {meta_file} loaded for collection {collection_name}.")

                logger.info(f"Loaded FAISS index: {collection_name}")
            except Exception as e:
                logger.warning(f"Failed to load index {collection_name}: {e}")

    async def _save_indices(self) -> None:
        """Save all indices to disk."""
        logger.debug("Saving FAISS indices to disk...")
        if not self._storage_path:
            logger.warning("No storage path set; skipping FAISS index saving.")
            return

        for collection_name, index in self._indices.items():
            try:
                logger.debug(f"Saving FAISS index for collection: {collection_name}")
                # Save FAISS index
                index_file = self._storage_path / f"{collection_name}.index"
                self._faiss.write_index(index, str(index_file))

                # Save metadata
                meta_file = self._storage_path / f"{collection_name}.meta"
                with open(meta_file, "wb") as f:
                    pickle.dump({
                        "metadata": self._metadata.get(collection_name, {}),
                        "id_map": self._id_map.get(collection_name, {}),
                        "reverse_id_map": self._reverse_id_map.get(collection_name, {}),
                    }, f)

                logger.debug(f"Saved FAISS index and metadata for collection {collection_name}")
            except Exception as e:
                logger.error(f"Failed to save index {collection_name}: {e}")

    def _create_index(self, vector_dim: int, metric: DistanceMetric) -> Any:
        """Create a FAISS index with the specified configuration."""
        logger.debug(f"Creating FAISS index with dim={vector_dim}, metric={metric}")
        if metric == DistanceMetric.COSINE:
            # For cosine similarity, we normalize vectors and use inner product
            index = self._faiss.IndexFlatIP(vector_dim)
        elif metric == DistanceMetric.EUCLIDEAN:
            index = self._faiss.IndexFlatL2(vector_dim)
        elif metric == DistanceMetric.DOT_PRODUCT:
            index = self._faiss.IndexFlatIP(vector_dim)
        else:
            logger.warning(f"Unknown distance metric {metric}, defaulting to L2.")
            index = self._faiss.IndexFlatL2(vector_dim)

        # Wrap with IDMap for custom IDs
        logger.debug(f"Wrapping FAISS index with IndexIDMap for custom ID support.")
        return self._faiss.IndexIDMap(index)

    async def create_collection(
        self,
        collection_name: str,
        vector_dim: int,
        distance_metric: DistanceMetric = DistanceMetric.COSINE,
        **kwargs
    ) -> bool:
        """Create a new FAISS index."""
        logger.debug(f"Starting collection creation: {collection_name}, vector_dim={vector_dim}, distance_metric={distance_metric}")
        try:
            if collection_name in self._indices:
                logger.warning(f"Collection {collection_name} already exists")
                return True

            logger.debug(f"Creating new FAISS index for collection: {collection_name}")
            self._indices[collection_name] = self._create_index(vector_dim, distance_metric)
            self._metadata[collection_name] = {}
            self._id_map[collection_name] = {}
            self._reverse_id_map[collection_name] = {}

            # Store config for later reference
            config_file = self._storage_path / f"{collection_name}.config"
            with open(config_file, "w") as f:
                json.dump({
                    "vector_dim": vector_dim,
                    "distance_metric": distance_metric.value,
                }, f)
            logger.debug(f"Saved config for collection {collection_name} at {config_file}")

            logger.info(f"Created FAISS index: {collection_name}")
            return True
        except Exception as e:
            logger.error(f"Failed to create index {collection_name}: {e}")
            return False

    async def delete_collection(self, collection_name: str) -> bool:
        """Delete a FAISS index."""
        logger.debug(f"Deleting FAISS collection: {collection_name}")
        try:
            if collection_name in self._indices:
                del self._indices[collection_name]
                logger.debug(f"Removed collection {collection_name} from _indices.")
            if collection_name in self._metadata:
                del self._metadata[collection_name]
                logger.debug(f"Removed collection {collection_name} from _metadata.")
            if collection_name in self._id_map:
                del self._id_map[collection_name]
                logger.debug(f"Removed collection {collection_name} from _id_map.")
            if collection_name in self._reverse_id_map:
                del self._reverse_id_map[collection_name]
                logger.debug(f"Removed collection {collection_name} from _reverse_id_map.")

            # Remove files
            for ext in [".index", ".meta", ".config"]:
                file_path = self._storage_path / f"{collection_name}{ext}"
                if file_path.exists():
                    file_path.unlink()
                    logger.debug(f"Deleted file {file_path}")

            logger.info(f"Deleted FAISS index: {collection_name}")
            return True
        except Exception as e:
            logger.error(f"Failed to delete index {collection_name}: {e}")
            return False

    async def collection_exists(self, collection_name: str) -> bool:
        """Check if a FAISS index exists."""
        exists = collection_name in self._indices
        logger.debug(f"Checked collection existence for '{collection_name}': {exists}")
        return exists

    async def upsert(
        self,
        collection_name: str,
        ids: List[str],
        embeddings: List[List[float]],
        metadata: List[Dict[str, Any]],
        **kwargs
    ) -> int:
        """Insert or update vectors in FAISS."""
        logger.debug(f"Upserting {len(ids)} vectors into collection '{collection_name}'")
        try:
            import numpy as np

            if collection_name not in self._indices:
                logger.error(f"Collection {collection_name} does not exist")
                return 0

            index = self._indices[collection_name]
            meta_store = self._metadata[collection_name]
            id_map = self._id_map[collection_name]
            reverse_id_map = self._reverse_id_map[collection_name]

            # Convert to numpy array
            vectors = np.array(embeddings, dtype=np.float32)

            # Normalize for cosine similarity
            norms = np.linalg.norm(vectors, axis=1, keepdims=True)
            vectors = vectors / np.maximum(norms, 1e-10)

            count = 0
            for i, (id_val, vector, meta) in enumerate(zip(ids, vectors, metadata)):
                logger.debug(f"Upserting id={id_val} into collection={collection_name}")
                # Generate FAISS ID
                if id_val in reverse_id_map:
                    faiss_id = reverse_id_map[id_val]
                    logger.debug(f"ID {id_val} already present with FAISS id {faiss_id}.")
                    # FAISS doesn't support direct updates, we track metadata separately
                else:
                    faiss_id = len(id_map)
                    id_map[faiss_id] = id_val
                    reverse_id_map[id_val] = faiss_id
                    # Add to index
                    index.add_with_ids(vector.reshape(1, -1), np.array([faiss_id]))
                    logger.debug(f"Added new id={id_val} with faiss_id={faiss_id}.")

                meta_store[id_val] = meta
                count += 1

            # Save after upsert
            logger.debug(f"Saving FAISS state after upserting {count} vectors to {collection_name}")
            await self._save_indices()

            logger.info(f"Upserted {count} vectors to {collection_name}")
            return count
        except Exception as e:
            logger.error(f"Failed to upsert vectors: {e}")
            return 0

    async def query(
        self,
        collection_name: str,
        query_vector: List[float],
        top_k: int = 10,
        filters: Optional[Dict[str, Any]] = None,
        include_vectors: bool = False,
        **kwargs
    ) -> List[SearchResult]:
        """Query FAISS for similar vectors."""
        logger.info(f"Querying FAISS collection='{collection_name}' with top_k={top_k}, filters={filters}")
        try:
            import numpy as np

            if collection_name not in self._indices:
                logger.error(f"Collection {collection_name} does not exist in loaded indices. Available collections: {list(self._indices.keys())}")
                # Try to reload indices in case it was created but not loaded
                logger.debug("Attempting to reload indices...")
                await self._load_indices()
                if collection_name not in self._indices:
                    logger.error(f"Collection {collection_name} still does not exist after reload")
                    return []
                else:
                    logger.info(f"Collection {collection_name} found after reload")

            index = self._indices[collection_name]
            meta_store = self._metadata[collection_name]
            id_map = self._id_map[collection_name]

            # Convert and normalize query vector
            query = np.array([query_vector], dtype=np.float32)
            query = query / np.maximum(np.linalg.norm(query), 1e-10)

            # Search
            logger.debug(f"Performing search in FAISS with ntotal={index.ntotal}.")
            if index.ntotal == 0:
                logger.warning(f"Collection '{collection_name}' exists but has 0 vectors. No results can be returned.")
                return []
            
            scores, faiss_ids = index.search(query, min(top_k * 2, index.ntotal))  # Get extra for filtering
            logger.debug(f"FAISS search returned {len(faiss_ids[0])} candidate results before filtering")

            search_results = []
            filtered_count = 0
            for score, faiss_id in zip(scores[0], faiss_ids[0]):
                if faiss_id == -1:  # Invalid ID
                    continue

                our_id = id_map.get(int(faiss_id))
                if our_id is None:
                    logger.debug(f"FAISS ID {faiss_id} not found in id_map")
                    continue

                metadata = meta_store.get(our_id, {})

                # Apply filters
                if filters:
                    match = True
                    for key, value in filters.items():
                        # Skip None, empty dict, or empty list values
                        if value is None or value == {} or value == []:
                            logger.debug(f"Skipping filter for key '{key}' with empty/None value")
                            continue
                        
                        # Handle different value types
                        metadata_value = metadata.get(key)
                        if isinstance(value, list):
                            # List filter: check if metadata value is in the list
                            if metadata_value not in value:
                                match = False
                                logger.debug(f"Filter mismatch: metadata[{key}]={metadata_value} not in filter[{key}]={value}")
                                break
                        else:
                            # Single value comparison
                            if metadata_value != value:
                                match = False
                                logger.debug(f"Filter mismatch: metadata[{key}]={metadata_value} != filter[{key}]={value}")
                                break
                    if not match:
                        filtered_count += 1
                        continue

                logger.debug(f"Query match: id={our_id}, score={score}, metadata={metadata}")
                search_results.append(
                    SearchResult(
                        id=our_id,
                        score=float(score),
                        payload=metadata,
                        vector=None,  # FAISS doesn't store vectors by default
                    )
                )

                if len(search_results) >= top_k:
                    break

            logger.info(f"Query returned {len(search_results)} results for collection '{collection_name}' (filtered out {filtered_count} results)")
            if len(search_results) == 0 and filtered_count > 0:
                logger.warning(f"All {filtered_count} results were filtered out. Check filter criteria: {filters}")
            return search_results
        except Exception as e:
            logger.error(f"Failed to query vectors: {e}")
            return []

    async def delete(
        self,
        collection_name: str,
        ids: List[str]
    ) -> bool:
        """Delete vectors by ID from FAISS."""
        logger.debug(f"Deleting {len(ids)} vectors from collection '{collection_name}'")
        try:
            import numpy as np

            if collection_name not in self._indices:
                logger.warning(f"Collection {collection_name} does not exist for deletion.")
                return False

            index = self._indices[collection_name]
            meta_store = self._metadata[collection_name]
            reverse_id_map = self._reverse_id_map[collection_name]

            # Get FAISS IDs to remove
            faiss_ids = []
            for id_val in ids:
                if id_val in reverse_id_map:
                    faiss_ids.append(reverse_id_map[id_val])
                    logger.debug(f"Removing id={id_val} with faiss_id={reverse_id_map[id_val]}")
                    if id_val in meta_store:
                        del meta_store[id_val]

            if faiss_ids:
                # FAISS IndexIDMap supports remove_ids
                index.remove_ids(np.array(faiss_ids))
                logger.debug(f"Called remove_ids with {faiss_ids}")

            await self._save_indices()
            logger.info(f"Deleted {len(ids)} vectors from {collection_name}")
            return True
        except Exception as e:
            logger.error(f"Failed to delete vectors: {e}")
            return False

    async def get_by_ids(
        self,
        collection_name: str,
        ids: List[str],
        include_vectors: bool = False
    ) -> List[SearchResult]:
        """Retrieve vectors by ID from FAISS."""
        logger.debug(f"Getting vectors by IDs {ids} from collection '{collection_name}'")
        try:
            if collection_name not in self._metadata:
                logger.warning(f"Collection {collection_name} does not exist or has no metadata.")
                return []

            meta_store = self._metadata[collection_name]

            results = [
                SearchResult(
                    id=id_val,
                    score=1.0,
                    payload=meta_store.get(id_val, {}),
                    vector=None,
                )
                for id_val in ids
                if id_val in meta_store
            ]
            logger.debug(f"Returned {len(results)} SearchResult(s) from get_by_ids for collection '{collection_name}'")
            return results
        except Exception as e:
            logger.error(f"Failed to retrieve vectors by ID: {e}")
            return []

    async def count(self, collection_name: str) -> int:
        """Get the number of vectors in an index."""
        logger.debug(f"Getting count of vectors for collection '{collection_name}'")
        try:
            if collection_name not in self._indices:
                logger.debug(f"Collection {collection_name} not found. Returning count 0.")
                return 0
            result = self._indices[collection_name].ntotal
            logger.debug(f"Collection {collection_name} has {result} vectors.")
            return result
        except Exception as e:
            logger.error(f"Failed to get index count: {e}")
            return 0

    async def health_check(self) -> bool:
        """Check if FAISS is healthy (always true for local)."""
        logger.debug("Performing FAISS health check.")
        is_healthy = self._faiss is not None
        logger.info(f"FAISS health check: {'healthy' if is_healthy else 'unhealthy'}")
        return is_healthy

