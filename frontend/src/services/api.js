/**
 * API service for RAG Backend communication
 */

const API_BASE = '/api/rag';

export const ragApi = {
  // Ingestion APIs
  async ingestFile(formData) {
    const response = await fetch(`${API_BASE}/ingestion/file`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(err.detail || 'File ingestion failed');
    }
    return response.json();
  },

  async ingestText(formData) {
    const response = await fetch(`${API_BASE}/ingestion/text`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(err.detail || 'Text ingestion failed');
    }
    return response.json();
  },

  // Query API (Single-pass / Naive)
  async queryNaive(payload) {
    const response = await fetch(`${API_BASE}/naive/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(err.detail || 'Query execution failed');
    }
    return response.json();
  },

  // Chatbot Session APIs
  async createSession(config) {
    const response = await fetch(`${API_BASE}/chatbot/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(err.detail || 'Failed to create chat session');
    }
    return response.json();
  },

  async sendMessage(chatPayload) {
    const response = await fetch(`${API_BASE}/chatbot/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chatPayload),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(err.detail || 'Failed to generate chat response');
    }
    return response.json();
  },

  async getHealth() {
    const response = await fetch('/api/health');
    if (!response.ok) throw new Error('Health check failed');
    return response.json();
  }
};
