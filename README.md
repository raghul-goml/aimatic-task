# GoML DevOps RAG Studio

A standardized, production-grade **Retrieval-Augmented Generation (RAG)** platform and intelligent assistant tailored for DevOps troubleshooting, runbooks, architecture exploration, and incident resolution.

Powered by **AWS Bedrock (`minimax.minimax-m2.5`)**, **Local Vector Embeddings (`sentence-transformers/all-MiniLM-L6-v2`)**, **FAISS Vector Store**, and a modern **React + Vite** frontend.

---

## 🌟 Key Features

- **DevOps Knowledge Engine**: Pre-indexed with **41 Nexora DevOps documents** across:
  - 🚨 **Incident Postmortems** (`INC-001` to `INC-012`)
  - 🛠️ **Troubleshooting Runbooks** (`RB-001` to `RB-012`)
  - 📋 **Standard Operating Procedures** (`SOP-001` to `SOP-006`)
  - 🏗️ **Architecture & Microservices** (`ARCH-001` to `ARCH-006`)
  - 📊 **Monitoring & Observability** (`MON-001` to `MON-004`)
- **AWS Bedrock LLM Integration**: Uses `minimax.minimax-m2.5` via the Bedrock Converse API with reasoning block extraction.
- **Local Embedding Execution**: Embedded via `all-MiniLM-L6-v2` (384-dim) for fast retrieval without external embedding API costs.
- **Multi-Vector Store Support**: FAISS (local embedded store), Qdrant, Milvus, PGVector, OpenSearch, and Neo4j.
- **Modern GoML UI**: Clean, responsive black & precision orange interface with full Markdown formatting, code copy, expandable context citations, and document ingestion.

---

## 🏗️ Architecture & Project Structure

```text
.
├── app/
│   ├── adapters/vector_store/     # FAISS, Qdrant, PGVector, Milvus, OpenSearch
│   ├── api/
│   │   ├── dependencies/          # Dependency injection (LLM, Embedder, Store)
│   │   ├── endpoints/rag/         # Naive, Ingestion, Chatbot APIs
│   │   └── schemas/rag/           # Pydantic request/response models
│   ├── config/                    # Base, Model Gateway, RAG Settings
│   ├── core/
│   │   ├── model_gateway/         # Bedrock, Azure, OpenAI unified provider
│   │   └── pipelines/rag/         # Ingestion pipelines, chunkers, strategies
│   ├── services/rag/              # IngestionService, RetrievalService, ChatbotService
│   └── utils/rag/                 # GatewayLLMClient (SentenceTransformer + Bedrock)
├── frontend/                      # React 19 + Vite + Lucide UI (GoML Theme)
│   ├── src/
│   │   ├── components/            # ChatView, IngestionView, Sidebar
│   │   ├── services/api.js        # FastAPI Client
│   │   └── index.css              # Precision Orange & Black Design System
│   └── package.json
├── faiss_data/                    # Persistent vector indices & metadata
├── nexora_devops_rag_dataset/     # 41 Markdown knowledge base documents
├── requirements.txt               # Backend Python dependencies
├── run.py                         # Startup script
└── .env                           # Environment configuration
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Python 3.10+** (Recommended Python 3.11 / 3.12 / 3.14)
- **Node.js 18+** & `npm`
- **AWS Bedrock Access** (with access to `minimax.minimax-m2.5`)

---

### 2. Backend Setup

```powershell
# 1. Activate your virtual environment
.\.venv\Scripts\Activate.ps1

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure environment variables in .env
# Required AWS credentials:
# AWS_ACCESS_KEY_ID=your_access_key
# AWS_SECRET_ACCESS_KEY=your_secret_key
# AWS_DEFAULT_REGION=us-east-1
# MODEL_ID=minimax.minimax-m2.5
# EMBEDDING_MODEL_ID=all-MiniLM-L6-v2
# DEFAULT_VECTOR_STORE=faiss

# 4. Start the FastAPI backend server
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

The backend documentation will be accessible at:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Health Check**: [http://localhost:8000/api/health](http://localhost:8000/api/health)

---

### 3. Frontend Setup

```powershell
# 1. Navigate to frontend directory
cd frontend

# 2. Install UI dependencies
npm install

# 3. Launch Vite development server
npm run dev
```

Open your browser at **[http://localhost:5173](http://localhost:5173)** to access the GoML DevOps Assistant.

---

## 🔍 Example Queries to Test

Try asking questions in the chat interface:

| Category | Example Question | Target Documents |
| :--- | :--- | :--- |
| **SOPs** | *"What approvals and steps are needed before executing a database schema change?"* | `SOP-004-database-change.md` |
| **Incidents** | *"What was the root cause and resolution for the payment 503 incident (INC-001)?"* | `INC-001-payment-503.md` |
| **Runbooks** | *"How do I troubleshoot Kubernetes pod CrashLoopBackOff?"* | `RB-002-crashloopbackoff.md` |
| **Architecture** | *"Explain Nexora's authentication architecture and JWT token flow."* | `ARCH-003-authentication.md` |
| **Monitoring** | *"What are the critical alert severities and escalation paths?"* | `MON-003-alert-severity-guide.md` |

---

## 📊 Dataset Re-Indexing (Optional)

If you modify or add new markdown files in `nexora_devops_rag_dataset/`, re-ingest them with:

```powershell
python -c "
import asyncio
from app.services.rag.ingestion_service import IngestionService
from app.utils.rag.llm_client import GatewayLLMClient

async def reindex():
    llm = GatewayLLMClient()
    service = IngestionService(embedder=llm)
    res = await service.ingest_directory(
        directory_path='nexora_devops_rag_dataset',
        vector_store='faiss',
        collection_name='nexora_devops',
        reset_collection=True
    )
    print('Ingested documents:', res.get('total_documents'), '| Vectors stored:', res.get('vectors_stored'))

asyncio.run(reindex())
"
```

---

## 🛠️ API Reference

### RAG Single-Pass Query
`POST /api/rag/naive/query`
```json
{
  "query": "What are the rollback procedures in SOP-002?",
  "vector_store": "faiss",
  "collection_name": "nexora_devops",
  "top_k": 5,
  "score_threshold": 0.0
}
```

### Document Ingestion
`POST /api/rag/ingestion/file` (multipart/form-data)
- `file`: Upload document (`.md`, `.pdf`, `.txt`, `.json`)
- `vector_store`: `faiss`
- `collection_name`: `nexora_devops`
- `chunk_size`: `1000`
- `chunk_overlap`: `200`

---

## 🏢 Organization & Standard
Developed under the **GoML Intelligent Systems** architecture standard.
