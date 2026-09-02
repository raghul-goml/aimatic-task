import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Send, 
  Bot, 
  User, 
  ChevronDown, 
  ChevronUp, 
  Loader2, 
  Database,
  Trash2,
  Copy,
  Check
} from 'lucide-react';
import { ragApi } from '../services/api';

export default function ChatView({ config }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: "👋 **Welcome to GoML DevOps Intelligence.**\n\nI can assist you with incident analysis, troubleshooting runbooks, architecture specs, and standard operating procedures from the indexed knowledge base.",
      sources: [],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedSources, setExpandedSources] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const toggleSources = (msgId) => {
    setExpandedSources(prev => ({
      ...prev,
      [msgId]: !prev[msgId]
    }));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    const query = inputQuery.trim();
    if (!query || loading) return;

    const userMsgId = Date.now().toString();
    const userMsg = {
      id: userMsgId,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const result = await ragApi.queryNaive({
        query: query,
        vector_store: config.vectorStore,
        collection_name: config.collectionName,
        top_k: config.topK,
        score_threshold: config.scoreThreshold,
        system_prompt: config.systemPrompt || undefined,
      });

      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.answer || "No response generated from model.",
        sources: result.sources || [],
        confidence: result.confidence,
        ragType: result.rag_type || 'naive',
        vectorStore: result.vector_store || config.vectorStore,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `⚠️ **Error:** ${err.message || 'Check server connection and Bedrock credentials.'}`,
        isError: true,
        sources: [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e) => {
    setInputQuery(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'cleared',
        role: 'assistant',
        content: "Chat cleared. What would you like to ask?",
        sources: [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  const handleQuickQuestion = (q) => {
    setInputQuery(q);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="chat-container">
      {/* Messages Scroll Area */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message-row ${msg.role}`}>
            {msg.role === 'assistant' && (
              <div className="chat-avatar assistant">
                <Bot size={16} />
              </div>
            )}

            <div className={`message-bubble ${msg.role}`}>
              <div 
                className="message-card" 
                style={msg.isError ? { borderColor: 'rgba(239, 68, 68, 0.4)', background: 'rgba(239, 68, 68, 0.08)' } : {}}
              >
                {msg.role === 'assistant' ? (
                  <div className="markdown-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
                )}

                {/* Retrieved Sources Section */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="sources-container">
                    <button
                      type="button"
                      className="sources-toggle"
                      onClick={() => toggleSources(msg.id)}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Database size={12} color="var(--accent-orange)" />
                        Retrieved Context ({msg.sources.length} document{msg.sources.length > 1 ? 's' : ''})
                      </span>
                      {expandedSources[msg.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {expandedSources[msg.id] && (
                      <div className="sources-list">
                        {msg.sources.map((src, idx) => (
                          <div key={idx} className="source-item">
                            <div className="source-item-header">
                              <span>
                                {src.metadata?.filename || src.source || src.metadata?.source || `Document #${idx + 1}`}
                              </span>
                              {typeof src.score === 'number' && (
                                <span style={{ color: 'var(--text-faint)' }}>
                                  Score: {src.score.toFixed(3)}
                                </span>
                              )}
                            </div>
                            <div className="source-content">
                              {src.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="message-meta">
                <span>{msg.timestamp}</span>
                {msg.role === 'assistant' && (
                  <button 
                    onClick={() => copyToClipboard(msg.content, msg.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-faint)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '3px', marginLeft: 'auto' }}
                    title="Copy response"
                  >
                    {copiedId === msg.id ? <Check size={11} color="#34d399" /> : <Copy size={11} />}
                    <span style={{ fontSize: '0.68rem' }}>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>
            </div>

            {msg.role === 'user' && (
              <div className="chat-avatar user">
                <User size={16} />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="chat-message-row assistant">
            <div className="chat-avatar assistant">
              <Bot size={16} />
            </div>
            <div className="message-bubble assistant">
              <div className="message-card" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Loader2 size={15} className="animate-spin" color="var(--accent-orange)" />
                <span style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                  Retrieving knowledge & generating answer...
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions if only welcome message is present */}
      {messages.length === 1 && (
        <div style={{ padding: '0 28px 10px', maxWidth: '860px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {[
              "What approvals and steps are needed before executing a database schema change?",
              "What was the root cause and resolution for INC-001 (payment 503)?",
              "How to troubleshoot Kubernetes pod CrashLoopBackOff (RB-002)?"
            ].map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickQuestion(q)}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '5px 10px',
                  color: 'var(--text-muted)',
                  fontSize: '0.74rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-main)'; e.currentTarget.style.borderColor = 'var(--accent-orange)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Bar */}
      <div className="chat-input-area">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '6px' }}>
          <button
            type="button"
            className="btn-icon"
            onClick={clearChat}
            title="Clear chat history"
            style={{ fontSize: '0.72rem', color: 'var(--text-faint)', height: '24px', width: 'auto', padding: '0 7px', gap: '4px' }}
          >
            <Trash2 size={11} />
            Clear
          </button>
        </div>

        <div className="chat-input-box">
          <textarea
            ref={textareaRef}
            className="chat-textarea"
            placeholder="Ask a question about DevOps, runbooks, or incidents..."
            rows={1}
            value={inputQuery}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />

          <button
            type="button"
            className="chat-send-btn"
            onClick={handleSend}
            disabled={!inputQuery.trim() || loading}
            title="Send query"
          >
            {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
          </button>
        </div>
      </div>
    </div>
  );
}
