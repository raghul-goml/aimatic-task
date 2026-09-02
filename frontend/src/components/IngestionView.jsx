import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { ragApi } from '../services/api';

export default function IngestionView({ config, onIngested }) {
  const [activeTab, setActiveTab] = useState('file'); // 'file' | 'text'
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [rawText, setRawText] = useState('');
  const [textSource, setTextSource] = useState('custom_document');
  const [chunkSize, setChunkSize] = useState(1000);
  const [chunkOverlap, setChunkOverlap] = useState(200);
  const [resetCollection, setResetCollection] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileIngest = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('vector_store', config.vectorStore);
    formData.append('collection_name', config.collectionName);
    formData.append('chunk_size', chunkSize.toString());
    formData.append('chunk_overlap', chunkOverlap.toString());
    formData.append('chunker_type', 'recursive');
    formData.append('loader_type', 'auto');
    formData.append('reset_collection', resetCollection.toString());

    try {
      const res = await ragApi.ingestFile(formData);
      setStatus({
        type: 'success',
        message: `Indexed "${file.name}" into "${config.collectionName}" (${res.vectors_stored} chunks created).`,
        details: res,
      });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (onIngested) onIngested(res);
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'File ingestion failed.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTextIngest = async (e) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    setLoading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('text', rawText);
    formData.append('vector_store', config.vectorStore);
    formData.append('collection_name', config.collectionName);
    formData.append('source', textSource || 'direct_input');
    formData.append('chunk_size', chunkSize.toString());
    formData.append('chunk_overlap', chunkOverlap.toString());
    formData.append('chunker_type', 'recursive');
    formData.append('reset_collection', resetCollection.toString());

    try {
      const res = await ragApi.ingestText(formData);
      setStatus({
        type: 'success',
        message: `Indexed raw text into "${config.collectionName}" (${res.vectors_stored} chunks created).`,
        details: res,
      });
      setRawText('');
      if (onIngested) onIngested(res);
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Text ingestion failed.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ingestion-container">
      <div className="ingestion-header">
        <h2>Knowledge Ingestion</h2>
        <p>Index documents directly into the <strong>{config.collectionName}</strong> vector store.</p>
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '18px' }}>
        <button
          type="button"
          className={`nav-tab-btn ${activeTab === 'file' ? 'active' : ''}`}
          onClick={() => setActiveTab('file')}
        >
          <UploadCloud size={14} />
          Upload Document
        </button>
        <button
          type="button"
          className={`nav-tab-btn ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >
          <FileText size={14} />
          Raw Text
        </button>
      </div>

      {activeTab === 'file' ? (
        <form onSubmit={handleFileIngest} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div
            className={`dropzone ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              accept=".pdf,.txt,.md,.json,.jsonl"
              onChange={handleFileChange}
            />
            <div className="dropzone-icon">
              <UploadCloud size={20} />
            </div>
            <div>
              <div className="dropzone-text">
                {file ? file.name : "Choose a file or drag & drop"}
              </div>
              <div className="dropzone-hint">
                PDF, Markdown (.md), Plain Text (.txt), JSON
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={resetCollection}
                onChange={(e) => setResetCollection(e.target.checked)}
                style={{ accentColor: 'var(--accent-orange)' }}
              />
              Reset collection
            </label>

            <button
              type="submit"
              className="btn-primary"
              disabled={!file || loading}
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
              Ingest Document
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleTextIngest} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="input-group">
            <label className="input-label">Document Title:</label>
            <input
              type="text"
              className="text-input"
              placeholder="e.g. Incident-Report-01"
              value={textSource}
              onChange={(e) => setTextSource(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Content:</label>
            <textarea
              className="textarea-input"
              rows={8}
              placeholder="Paste text content..."
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingTop: '4px' }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={!rawText.trim() || loading}
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
              Ingest Text
            </button>
          </div>
        </form>
      )}

      {status && (
        <div className={`status-card ${status.type}`}>
          {status.type === 'success' ? (
            <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
          ) : (
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
          )}
          <div>
            <div style={{ fontWeight: 600 }}>{status.type === 'success' ? 'Ingestion Complete' : 'Error'}</div>
            <div style={{ marginTop: '2px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{status.message}</div>
          </div>
        </div>
      )}
    </div>
  );
}
