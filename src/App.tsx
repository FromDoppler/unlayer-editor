import React, { useRef } from 'react';
import './App.css';
import styled from 'styled-components';

import EmailEditor, { ToolConfig } from 'react-email-editor';

const Bar = styled.div`
  flex: 1;
  background-color: #fcc338;
  color: #000;
  padding: 10px;
  display: flex;
  max-height: 40px;
  h1 {
    flex: 1;
    font-size: 16px;
    text-align: left;
  }
  button {
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    background-color: #000;
    color: #fff;
    border: 0px;
    max-width: 150px;
    cursor: pointer;
  }
`;

const App: React.FC = () => {
  // eslint-disable-next-line
  const emailEditorRef: any = useRef(null);

  const saveDesign = () => {
    // eslint-disable-next-line
    emailEditorRef.current.editor.saveDesign((design: any) => {
      console.log('Template data', '\n', design);
    });
  };

  const exportHtml = () => {
    // eslint-disable-next-line
    emailEditorRef.current.editor.exportHtml((data: any) => {
      console.log('HTML Email data', '\n', data.html);
    });
  };

  return (
    <div className="App" data-testid="email-editor-test">
      <Bar>
        <h1>Doppler Unlayer Editor POC</h1>
        <button onClick={saveDesign}>Save Design</button>
        <button onClick={exportHtml}>Export HTML</button>
      </Bar>
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
