import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('Application mount on unlayer-editor-container', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    div.id = 'unlayer-editor-container';
    document.body.appendChild(div);
    require('./index.tsx');
    expect(ReactDOM.render).toHaveBeenCalledWith(
      <StrictMode>
        <App />
      </StrictMode>,
      div,
    );
  });
});
