// AJAX in AskButton.js

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AskButton = () => {
  const [response, setResponse] = useState('');

  // Use a state variable to track the button text
  const [buttonText, setButtonText] = useState('Click to ask');

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

        // Change the button text to 'Try again'
        setButtonText('Try again');
      } else {
        console.error('Failed to fetch data. Status:', result.status);
        // Set a friendly error message for the user
        setResponse('Sorry, something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Set a friendly error message for the user
      setResponse('Sorry, something went wrong. Please check your internet connection and try again.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div><strong>The Ultimate Question?</strong></div>
      <p> </p>
      <div style={{ marginBottom: '10px' }}>
        {/* Use the state variable for the button text */}
        <button onClick={handleAskClick}><strong>{buttonText}</strong></button>
      </div>
      <p>{response}</p>
    </div>
  );

};

export default AskButton;
