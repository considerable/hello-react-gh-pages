// AJAX in AskButton.js

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AskButton = () => {
  const [response, setResponse] = useState('');

  const navigate = useNavigate();

  const goToRoot = () => {
    // Go to the root page and replace the current page in history
    navigate("/", { replace: true });
  };

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div><strong>The Ultimate Question?</strong></div>
      <p>&nbsp;</p>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={goToRoot}><strong>Try again</strong></button>
      </div>
      <p>{response}</p>
    </div>
  );

};

export default AskButton;