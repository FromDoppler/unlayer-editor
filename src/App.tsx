import React, { useRef } from 'react';
import './App.css';

import EmailEditor from 'react-email-editor';

const App: React.FC = () => {
  const emailEditorRef = useRef(null);

  return (
    <div className="App" data-testid="email-editor-test">
      <EmailEditor
        ref={emailEditorRef}
        key="email-editor-test"
        projectId={1071}
        options={{
          customJS: [
            window.location.protocol +
              '//' +
              window.location.host +
              '/socialShare.js',
          ],
          tools: {
            'custom#social_share_tool': {
              properties: {
                department: {
                  editor: {
                    data: {
                      options: [
                        { label: 'Grande', value: 'grande' },
                        { label: 'Pequeño', value: 'pequenio' },
                      ],
                    },
                  },
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default App;
