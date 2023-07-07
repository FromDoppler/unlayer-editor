const React = window.unlayer.React;
const unlayer = window.unlayer;
import ReactDOMServer from 'react-dom/server';

const enableLogging = false;

export const setLinkTypes = (linkTypes) => unlayer.setLinkTypes?.(linkTypes);

export const registerPropertyEditor = (propertyDefinition) =>
  unlayer.registerPropertyEditor(propertyDefinition);

export const registerReactTool = (toolDefinition) =>
  unlayer.registerTool(createTool(toolDefinition));

const createTool = ({
  name,
  label,
  icon,
  Component,
  ...restOfToolDefinitions
}) => {
  const toolData = { name, label, icon };
  return {
    ...restOfToolDefinitions,
    name,
    label,
    icon,
    renderer: {
      Viewer: ({ values, displayMode, ...restOfViewerProps }) =>
        viewer({
          Component,
          displayMode,
          values,
          toolData,
          restOfViewerProps,
          restOfToolDefinitions,
        }),
      exporters: {
        web: (values, ...restOfExporterParameters) =>
          exporter({
            Component,
            displayMode: 'web',
            values,
            toolData,
            restOfExporterParameters,
            restOfToolDefinitions,
          }),
        email: (values, ...restOfExporterParameters) =>
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
