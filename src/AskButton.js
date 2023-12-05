// AJAX in AskButton.js

import React, { useState } from 'react';

const AskButton = () => {
  const [response, setResponse] = useState('');

  const handleAskClick = async () => {
    try {
      // Note: You may need to adjust this URL based on the actual CORS configuration of the server.
      const url = 'https://vyvvqaw46b643cmqiohh4abq3q0sglbb.lambda-url.us-west-2.on.aws';
      const result = await fetch(url);

      // Check if the response status is OK (200)
      if (result.ok) {
        const jsonResult = await result.json();
        // Assuming the JSON output has an 'Answer' property
        const answer = jsonResult.Answer;
        setResponse(answer);
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
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={handleAskClick}>Ask</button>
      <p>{response}</p>
    </div>
  );
};

export default AskButton;

