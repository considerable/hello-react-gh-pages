// src/App.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders the message about Deep Thought', () => {
    render(<App />);
    const messageElement = screen.getByText(/Deep Thought, the second greatest computer ever, is here./i);
    expect(messageElement).toBeInTheDocument();
  });

  test('renders the AskButton component', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });
});
