import React, { useRef } from 'react';
import './App.css';
import styled from 'styled-components';

import EmailEditor, { ToolConfig, User } from 'react-email-editor';

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

interface UserSecurity extends User {
  readonly signature?: string | undefined;
}

const App: React.FC = () => {
  // eslint-disable-next-line
  const emailEditorRef: any = useRef(null);
  const projectId: number = parseInt(
    process.env.REACT_APP_PROJECT_ID as string,
    10,
  );
  const userId: number = parseInt(process.env.REACT_APP_USER_ID as string, 10);
  const userSignature: string = process.env
    .REACT_APP_USER_SIGNATURE as string;
  const userExtend: UserSecurity = {
    id: userId,
    signature: userSignature,
  };

  const saveDesign = () => {
    // eslint-disable-next-line
    emailEditorRef.current.editor.saveDesign((design: any) => {
      console.log('Template data', '\n', design);
    });
  };

  const exportHtml = () => {
    // eslint-disable-next-line
    emailEditorRef.current.editor.exportHtml((data: any) => {
      const { html } = data;
      console.log('HTML Email data', '\n', html);
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
        projectId={projectId}
        key="email-editor-test"
        ref={emailEditorRef}
        options={{
          user: userExtend,
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
