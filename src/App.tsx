import React, { useRef } from 'react';
import './App.css';

import EmailEditor from 'react-email-editor';

const App: React.FC = () => {
  const emailEditorRef = useRef(null);

  return (
    <div className="App" data-testid="email-editor-test">
      <EmailEditor key="email-editor-test" ref={emailEditorRef} />
    </div>
  );
};

export default App;
