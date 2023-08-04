import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { registerListeners } from './editorsWebappListenersRegistrator';

const container = document.getElementById('unlayer-editor-container');

registerListeners();

if (!container) {
  console.error('Expected element #unlayer-editor-container not found.');
} else {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
