import React, { useRef } from 'react';
import './App.css';

import EmailEditor from 'react-email-editor';

const App: React.FC = () => {
  const emailEditorRef = useRef(null);

  // const exportHtml = () => {
  //   emailEditorRef.current.editor.exportHtml((data: any) => {
  //     const { design, html } = data
  //     console.log('exportHtml', html)
  //   })
  // }

  const onLoad = () => {
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  };

  return (
    <div className="App" data-testid="email-editor-test">
      <EmailEditor
        key="email-editor-test"
        ref={emailEditorRef}
        onLoad={onLoad}
      />
    </div>
  );
};

export default App;
