// src/App.js

import React from 'react';
import AskButton from './AskButton';
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        color: '#e0e0e0',
        padding: '2rem'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🤖</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff', letterSpacing: '-0.02em' }}>
          Deep Thought
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#9b9bc0', marginBottom: '2.5rem', textAlign: 'center', maxWidth: '360px' }}>
          The second greatest computer ever built, now running on AWS Lambda.
        </p>
        <AskButton />
        <p style={{ marginTop: '3rem', fontSize: '0.8rem', color: '#555580' }}>
          <a href="https://github.com/considerable/hello-react-gh-pages" style={{ color: '#7070a0', textDecoration: 'none' }}>
            view source
          </a>
          {' · '}
          <a href="https://github.com/considerable/hello-react-gh-pages/blob/main/aws/lambda_function.py" style={{ color: '#7070a0', textDecoration: 'none' }}>
            lambda
          </a>
          {' · '}
          <a href="https://github.com/considerable/hello-react-gh-pages/blob/main/aws/main.tf" style={{ color: '#7070a0', textDecoration: 'none' }}>
            terraform
          </a>
        </p>
      </div>
    </Router>
  );
};

export default App;
