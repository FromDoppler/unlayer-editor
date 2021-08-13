import React, { Component } from 'react';
import './App.css';

import EmailEditor from 'react-email-editor';

class App extends Component {
  render(): JSX.Element {
    return (
      <div className="App" data-testid="email-editor-test">
        <EmailEditor
          projectId={1071}
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
  }
}

export default App;
