// src/customJs/components/MyPanel.tsx
import React from 'react';

interface MyPanelProps {
  // Add any props you need to pass to the component
}

const MyPanel: React.FC<MyPanelProps> = () => {
  return (
    <div>
      <input className="color-value" value="Test" />
      <button className="red">Red</button>
      <button className="green">Green</button>
      <button className="blue">Blue</button>
    </div>
  );
};

export default MyPanel;