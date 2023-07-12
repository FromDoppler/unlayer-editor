import { React } from '../unlayer-react';
const unlayer = (window as any).unlayer;
import ReactDOMServer from 'react-dom/server';
import {
  DisplayMode,
  LinkType,
  ObjectWithStringProps,
  ReactPropertyDefinition,
  ReactToolDefinition,
  ToolData,
  ViewerComponent,
} from '../types';
import { getConfiguration } from '../configuration';

const { previewMode: enableLogging } = getConfiguration();

export const setLinkTypes = (
  linkTypes: { name: LinkType; enabled: boolean }[],
) => unlayer.setLinkTypes?.(linkTypes);

export const registerPropertyEditor = <
  TPropertyName extends string,
  TPropertyValue,
  TToolValues,
>(
  propertyDefinition: ReactPropertyDefinition<
    TPropertyName,
    TPropertyValue,
    TToolValues
  >,
) => unlayer.registerPropertyEditor(propertyDefinition);

export const registerReactTool = <TToolValues,>(
  toolDefinition: ReactToolDefinition<TToolValues>,
) => unlayer.registerTool(createTool(toolDefinition));

const createTool = <TToolValues,>({
  name,
  label,
  icon,
  Component,
  ...restOfToolDefinitions
}: ReactToolDefinition<TToolValues>) => {
  const toolData: ToolData = { name, label, icon };
  return {
    ...restOfToolDefinitions,
    name,
    label,
    icon,
    renderer: {
      Viewer: ({
        values,
        displayMode,
        ...restOfViewerProps
      }: {
        values: TToolValues;
        displayMode: DisplayMode;
      }) =>
        viewer({
          Component,
          displayMode,
          values,
          toolData,
          restOfViewerProps,
          restOfToolDefinitions,
        }),
      exporters: {
        web: (values: TToolValues, ...restOfExporterParameters: any[]) =>
          exporter({
            Component,
            displayMode: 'web',
            values,
            toolData,
            restOfExporterParameters,
            restOfToolDefinitions,
          }),
        email: (values: TToolValues, ...restOfExporterParameters: any[]) =>
          exporter({
            Component,
            displayMode: 'email',
            values,
            toolData,
            restOfExporterParameters,
            restOfToolDefinitions,
          }),
      },
    },
  };
};

const viewer = <TToolValues,>({
  Component,
  displayMode,
  values,
  toolData,
  restOfViewerProps,
  restOfToolDefinitions,
}: {
  Component: ViewerComponent<TToolValues>;
  displayMode: DisplayMode;
  values: TToolValues;
  toolData: ToolData;
  restOfViewerProps: ObjectWithStringProps;
  restOfToolDefinitions: ObjectWithStringProps;
}) => {
  const isViewer = true;
  enableLogging &&
    console.log('RENDERING VIEWER', {
      Component,
      displayMode,
      isViewer,
      toolData,
      restOfViewerProps,
      restOfToolDefinitions,
      values,
    });
  // restOfViewerProps and restOfToolDefinitions are here only for debugging process
  // and to evaluate if they could be used in the future.
  // TODO: remove restOfViewerProps and restOfToolDefinitions when they are not needed
  return (
    <Component
      values={values}
      displayMode={displayMode}
      isViewer={isViewer}
      toolData={toolData}
    />
  );
};

const exporter = <TToolValues,>({
  Component,
  displayMode,
  values,
  toolData,
  restOfExporterParameters,
  restOfToolDefinitions,
}: {
  Component: ViewerComponent<TToolValues>;
  displayMode: DisplayMode;
  values: TToolValues;
  toolData: ToolData;
  restOfExporterParameters: ObjectWithStringProps;
  restOfToolDefinitions: ObjectWithStringProps;
}) => {
  // restOfExporterParameters and restOfToolDefinitions are here only for debugging process
  // and to evaluate if they could be used in the future.
  // TODO: remove restOfExporterParameters and restOfToolDefinitions when they are not needed
  const isViewer = false;
  enableLogging &&
    console.log('EXPORTING', {
      Component,
      displayMode,
      isViewer,
      toolData,
      restOfExporterParameters,
      restOfToolDefinitions,
      values,
    });
  return ReactDOMServer.renderToStaticMarkup(
    <Component
      values={values}
      displayMode={displayMode}
      isViewer={isViewer}
      toolData={toolData}
    />,
  );
};
