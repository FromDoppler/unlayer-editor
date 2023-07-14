import { React } from '../unlayer-react';
import { WidgetComponent } from '../types';

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

type AddUnlayerLabel = <TPropertyValue, TToolValues, TToolData>(
  WrappedComponent: WidgetComponent<TPropertyValue, TToolValues, TToolData>,
) => WidgetComponent<TPropertyValue, TToolValues, TToolData>;

/* eslint-disable react/display-name */
export const addUnlayerLabel: AddUnlayerLabel =
  (WrappedComponent) => (props) => (
    <>
      {props.label ? <UnlayerLabel label={props.label} /> : <></>}
      <WrappedComponent {...props} />
    </>
  );
