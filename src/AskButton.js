// AJAX in AskButton.js

import React, { useState } from 'react';

const AskButton = () => {
  const [response, setResponse] = useState('');

const handleAskClick = async () => {
  try {
    const url = 'https://vyvvqaw46b643cmqiohh4abq3q0sglbb.lambda-url.us-west-2.on.aws';
    const result = await fetch(url);

    if (result.ok) {
      const jsonResult = await result.json();

      // Assuming the JSON output has an 'answer' property
      const answer = jsonResult.answer;

      // Check if 'answer' is a string, if not, convert it to a string
      const responseText = typeof answer === 'string' ? answer : JSON.stringify(answer);

      setResponse(responseText);
    } else {
      console.error('Failed to fetch data. Status:', result.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


  return (
    <div>
      <div>&nbsp;</div>
      {/* Adjusted spacing for better readability */}
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleAskClick}><b>Ask</b></button>
      </div>
      <p>{response}</p>
    </div>
  );
};

export default AskButton;

