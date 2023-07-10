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
  Values,
  ViewerComponent,
} from '../types';

const enableLogging = false;

export const setLinkTypes = (
  linkTypes: { name: LinkType; enabled: boolean }[],
) => unlayer.setLinkTypes?.(linkTypes);

export const registerPropertyEditor = (
  propertyDefinition: ReactPropertyDefinition,
) => unlayer.registerPropertyEditor(propertyDefinition);

export const registerReactTool = (toolDefinition: ReactToolDefinition) =>
  unlayer.registerTool(createTool(toolDefinition));

const createTool = ({
  name,
  label,
  icon,
  Component,
  ...restOfToolDefinitions
}: ReactToolDefinition) => {
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
        values: Values;
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
        web: (values: Values, ...restOfExporterParameters: any[]) =>
          exporter({
            Component,
            displayMode: 'web',
            values,
            toolData,
            restOfExporterParameters,
            restOfToolDefinitions,
          }),
        email: (values: Values, ...restOfExporterParameters: any[]) =>
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

const viewer = ({
  Component,
  displayMode,
  values,
  toolData,
  restOfViewerProps,
  restOfToolDefinitions,
}: {
  Component: ViewerComponent;
  displayMode: DisplayMode;
  values: Values;
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

const exporter = ({
  Component,
  displayMode,
  values,
  toolData,
  restOfExporterParameters,
  restOfToolDefinitions,
}: {
  Component: ViewerComponent;
  displayMode: DisplayMode;
  values: Values;
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
