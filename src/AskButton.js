// AJAX in AskButton.js

import React, { useState } from 'react';

const AskButton = () => {
  const [response, setResponse] = useState('');

  const handleAskClick = async () => {
    try {
      const url = 'https://dmqqfwxqwjya6jkwx3u5j2yw240wxuzo.lambda-url.us-west-2.on.aws';
      const result = await fetch(url);

      if (result.ok) {
        const jsonResult = await result.json();

        // Assuming the JSON output has an 'message' property
        const message = jsonResult.message;

        // Check if 'message' is a string, if not, convert it to a string
        const responseText = typeof message === 'string' ? message : JSON.stringify(message);

        setResponse('Answer: ' + responseText);
      } else {
        console.error('Failed to fetch data. Status:', result.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div><strong>The Ultimate Question?</strong></div>
      <p>&nbsp;</p>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleAskClick}><strong>Click to ask</strong></button>
      </div>
      <p>{response}</p>
    </div>
  );

};

export default AskButton;

