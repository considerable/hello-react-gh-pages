// AskButton.js

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AskButton = () => {
  const [response, setResponse] = useState('');
  const [buttonText, setButtonText] = useState('Ask the Question');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAskClick = async () => {
    setLoading(true);
    setResponse('');
    try {
      const url = 'https://fizeg4m36e.execute-api.us-west-2.amazonaws.com/answer';
      const result = await fetch(url, { method: 'GET', mode: 'cors' });

      if (result.ok) {
        const jsonResult = await result.json();
        const message = jsonResult.message;
        const responseText = typeof message === 'string' ? message : JSON.stringify(message);
        setResponse(responseText);
        setButtonText('Ask again');
      } else {
        setResponse('Something went wrong. Please try again.');
      }
    } catch (error) {
      setResponse('Could not reach Deep Thought. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      <p style={{ fontSize: '1.1rem', color: '#c0c0e0', margin: 0, textAlign: 'center', maxWidth: '420px' }}>
        What is the Answer to the Ultimate Question of Life, the Universe, and Everything?
      </p>
      <button
        onClick={handleAskClick}
        disabled={loading}
        style={{
          padding: '0.75rem 2rem',
          fontSize: '1rem',
          fontWeight: 600,
          background: loading ? '#3a3a6a' : 'linear-gradient(135deg, #667eea, #764ba2)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'opacity 0.2s',
          opacity: loading ? 0.7 : 1,
          minWidth: '160px'
        }}
      >
        {loading ? 'Thinking...' : buttonText}
      </button>
      {response && (
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '10px',
          padding: '1.25rem 2rem',
          fontSize: '1.1rem',
          color: '#a0f0c0',
          maxWidth: '480px',
          textAlign: 'center',
          lineHeight: 1.6
        }}>
          {response}
        </div>
      )}
    </div>
  );
};

export default AskButton;
