// src/App.js

import React from 'react';
import AskButton from './AskButton';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Deep Thought, the second greatest computer ever, is here.</h1>
      <label htmlFor="question">Ask me anything</label>
      <textarea id="question" name="question" placeholder="Enter your question" spellCheck="true" />
      <AskButton />
      <p>&nbsp;</p>
      <p>Want to see how I work? Check out my source code <a href="https://github.com/considerable/hello-react-gh-pages">here</a></p>
    </div>
  );
};

export default App;

