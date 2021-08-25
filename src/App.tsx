import React, { useRef } from 'react';
import './App.css';

import EmailEditor, { ToolConfig } from 'react-email-editor';

const App: React.FC = () => {
  const emailEditorRef = useRef(null);

  return (
    <div className="App" data-testid="email-editor-test">
      <EmailEditor
        projectId={1071}
        key="email-editor-test"
        ref={emailEditorRef}
        options={{
          customJS: [`${window.location.href}/customJs/index.js`],
          tools: {
            'custom#social_share_tool': {
              properties: {
                social_share_size: {
                  editor: {
                    data: {
                      options: [
                        { label: 'Normal', value: '90' },
                        { label: 'Pequeño', value: '70' },
                        { label: 'Grande', value: '120' },
                      ],
                    },
                  },
                },
              },
            } as ToolConfig,
          },
        }}
      />
    </div>
  );
};

export default App;
