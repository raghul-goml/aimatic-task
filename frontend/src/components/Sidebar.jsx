import React from 'react';
import { Database, Layers, BrainCircuit } from 'lucide-react';

export default function Sidebar({ config, setConfig }) {
  const handleChange = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">Engine Configuration</div>

        {/* Vector Store */}
        <div className="input-group">
          <label className="input-label">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Database size={12} color="var(--accent-orange)" />
              Vector Store
            </span>
          </label>
          <select
            className="select-input"
            value={config.vectorStore}
            onChange={(e) => handleChange('vectorStore', e.target.value)}
          >
            <option value="faiss">FAISS (Local)</option>
            <option value="qdrant">Qdrant</option>
            <option value="milvus">Milvus</option>
            <option value="pgvector">PGVector</option>
            <option value="opensearch">OpenSearch</option>
          </select>
        </div>

        {/* Collection */}
        <div className="input-group">
          <label className="input-label">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={12} color="var(--accent-orange)" />
              Collection Index
            </span>
          </label>
          <input
            type="text"
            className="text-input"
            value={config.collectionName}
            onChange={(e) => handleChange('collectionName', e.target.value)}
            placeholder="e.g. nexora_devops"
          />
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-title">Retrieval Parameters</div>

        {/* Top K */}
        <div className="input-group">
          <label className="input-label">
            <span>Top-K Results</span>
            <span className="range-value">{config.topK}</span>
          </label>
          <div className="range-slider-container">
            <input
              type="range"
              className="range-slider"
              min="1"
              max="15"
              value={config.topK}
              onChange={(e) => handleChange('topK', Number(e.target.value))}
            />
          </div>
        </div>

        {/* System Prompt */}
        <div className="input-group">
          <label className="input-label">
            <span>System Prompt</span>
            <span className="input-label-hint">Optional</span>
          </label>
          <textarea
            className="textarea-input"
            rows={3}
            placeholder="Custom instructions..."
            value={config.systemPrompt}
            onChange={(e) => handleChange('systemPrompt', e.target.value)}
            style={{ fontSize: '0.76rem' }}
          />
        </div>
      </div>

      {/* Model Info */}
      <div className="sidebar-section" style={{ marginTop: 'auto' }}>
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '10px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-main)' }}>
            <BrainCircuit size={13} color="var(--accent-orange)" />
            <span>GoML Core Engine</span>
          </div>

          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>LLM:</span>
              <strong style={{ color: 'var(--accent-orange-light)', fontFamily: 'var(--font-mono)' }}>minimax.minimax-m2.5</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Embeddings:</span>
              <strong style={{ color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>all-MiniLM-L6-v2</strong>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
