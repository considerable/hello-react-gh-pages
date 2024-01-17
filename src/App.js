// src/App.js

import React from 'react';
import AskButton from './AskButton';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      Deep Thought, the second greatest computer ever, is here.
      <AskButton />
    </div>
  );
};

export default App;
