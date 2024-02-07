// src/App.js

import React from 'react';
import AskButton from './AskButton';
// Import the Router component
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    // Wrap your App component with the Router component
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        Deep Thought, the second greatest computer ever, is here.
        <AskButton />
        <p>&nbsp;</p>
        <p>Want to see how it works? Check out the source code <a href="https://github.com/considerable/hello-react-gh-pages">here</a></p>
      </div>
    </Router>
  );
};

export default App;
