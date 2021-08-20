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
          customJS: [
            window.location.protocol +
              '//' +
              window.location.host +
              '/socialTool.js',
            window.location.protocol +
              '//' +
              window.location.host +
              '/subscribeTool.js',
            window.location.protocol +
              '//' +
              window.location.host +
              '/socialShare.js',
          ],
          tools: {
            'custom#social_share_tool': {
              properties: {
                social_share_size: {
                  editor: {
                    data: {
                      options: [
                        { label: 'Normal', value: 'normal' },
                        { label: 'Pequeño', value: 'small' },
                        { label: 'Grande', value: 'big' },
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
