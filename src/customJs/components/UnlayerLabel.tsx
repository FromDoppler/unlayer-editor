import { React } from '../unlayer-react';

// Copied structure of Unlayer label
export const UnlayerLabel = ({ label }: { label: string }) => (
  <div className="blockbuilder-widget-label mb-2">
    <label className="blockbuilder-label-primary">
      <div>
        <span className="has-value same-value">{label}</span>
      </div>
    </label>
  </div>
);
