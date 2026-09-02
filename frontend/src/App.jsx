import React, { useState } from 'react';
import { 
  UploadCloud, 
  MessageSquare, 
  SlidersHorizontal,
  Layers,
  Sparkles
} from 'lucide-react';
import IngestionView from './components/IngestionView';
import ChatView from './components/ChatView';
import Sidebar from './components/Sidebar';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'ingest'
  const [showSidebar, setShowSidebar] = useState(false); // Clean default: collapsed settings

  // Central RAG and Vector configuration
  const [config, setConfig] = useState({
    vectorStore: 'faiss',
    collectionName: 'nexora_devops',
    topK: 5,
    scoreThreshold: 0.0,
    systemPrompt: '',
  });

  return (
    <div className="app-container">
      {/* Minimal Header */}
      <header className="app-header">
        <div className="brand-section">
          <div className="brand-logo">
            GoML
          </div>
          <div className="brand-title-group">
            <h1>DevOps Assistant</h1>
            <div className="badge-container">
              <span className="badge badge-primary">FAISS RAG</span>
              <span className="badge badge-live">● Online</span>
            </div>
          </div>
        </div>

        {/* Center Tabs */}
        <div className="nav-tabs">
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare size={14} />
            Assistant
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'ingest' ? 'active' : ''}`}
            onClick={() => setActiveTab('ingest')}
          >
            <UploadCloud size={14} />
            Knowledge Base
          </button>
        </div>

        {/* Right Action */}
        <div className="header-actions">
          <button
            type="button"
            className={`btn-icon ${showSidebar ? 'active' : ''}`}
            onClick={() => setShowSidebar(prev => !prev)}
            title="Toggle Engine Settings"
          >
            <SlidersHorizontal size={15} />
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="main-layout">
        {showSidebar && (
          <Sidebar 
            config={config} 
            setConfig={setConfig} 
          />
        )}

        <main className="content-area">
          {activeTab === 'ingest' ? (
            <IngestionView 
              config={config} 
            />
          ) : (
            <ChatView 
              config={config} 
            />
          )}
        </main>
      </div>
    </div>
  );
}
