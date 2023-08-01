import React, { useRef } from 'react';
import mergeTags from './external/merge.tags';
import styled from 'styled-components';
import { ASSETS_BASE_URL } from './customJs/constants';

import EmailEditor, {
  User,
  UnlayerOptions,
  EditorRef,
  Design,
  HtmlExport,
} from 'react-email-editor';

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
    border: 0;
    max-width: 150px;
    cursor: pointer;
  }
`;

const App: React.FC = () => {
  const emailEditorRef = useRef<EditorRef>(null);
  const projectId: number = parseInt(
    process.env.REACT_APP_PROJECT_ID as string,
    10,
  );
  const userId: number = parseInt(process.env.REACT_APP_USER_ID as string, 10);
  const userSignature: string = process.env.REACT_APP_USER_SIGNATURE as string;
  const userExtend = {
    id: userId,
    signature: userSignature,
  } as User;
  const UnlayerOptionsExtended = {
    tools: {
      button: {
        icon: `${ASSETS_BASE_URL}/button.svg`,
      },
    },
    features: {
      preheaderText: false,
    },
    appearance: {
      panels: {
        tools: {
          dock: 'left',
        },
      },
    },
    mergeTagsConfig: {
      sort: false,
    },
    mergeTags: mergeTags,
    user: userExtend,
    customCSS: [`${process.env.PUBLIC_URL}/customJs/main.css`],
    customJS: [
      `window["unlayer-extensions-configuration"] = {
        locale: "es",
        previewMode: true,
        stores: [
          { name: "MercadoShops", promotionCodeEnabled: true },
          { name: "Magento", promotionCodeEnabled: false },
          { name: "Tiendanube", promotionCodeEnabled: false }
        ]
      };`,
      `${process.env.PUBLIC_URL}/customJs/index.js`,
    ],
  } as UnlayerOptions;

  const saveDesign = () => {
    emailEditorRef.current?.saveDesign((design: Design) => {
      console.log('Template data', '\n', design);
    });
  };

  const exportHtml = () => {
    emailEditorRef.current?.exportHtml((data: HtmlExport) => {
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
        options={UnlayerOptionsExtended}
      />
    </div>
  );
};

export default App;
