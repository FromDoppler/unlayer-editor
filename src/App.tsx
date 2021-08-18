import React, { useRef } from 'react';
import './App.css';

import EmailEditor from 'react-email-editor';

const App: React.FC = () => {
  const emailEditorRef = useRef(null);

  return (
    <div className="App" data-testid="email-editor-test">
      <EmailEditor
        projectId={1071}
        key="email-editor-test"
        ref={emailEditorRef}
        options={{
          customJS: [
            window.location.protocol +
              '//' +
              window.location.host +
              '/socialTool.js',
            window.location.protocol +
              '//' +
              window.location.host +
              '/subscribeTool.js',
          ],
        }}
      />
    </div>
  );
};

export default App;
