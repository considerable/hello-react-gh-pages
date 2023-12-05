// src/AskButton.js

import React, { useState } from 'react';

const AskButton = () => {
  const [response, setResponse] = useState('');

  const handleAskClick = async () => {
    try {
      const url = 'https://vyvvqaw46b643cmqiohh4abq3q0sglbb.lambda-url.us-west-2.on.aws';
      const result = await fetch(url);
      const jsonResult = await result.json();

      // Assuming the JSON output has an 'Answer' property
      const answer = jsonResult.Answer;

      setResponse(answer);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button onClick={handleAskClick}>Ask</button>
      <p>Response: {response}</p>
    </div>
  );
};

export default AskButton;

