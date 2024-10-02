import { React } from '../unlayer-react';
const unlayer = (window as any).unlayer;
import ReactDOMServer from 'react-dom/server';
import {
  DisplayMode,
  LinkType,
  ObjectWithStringProps,
  ReactPropertyDefinition,
  ReactToolDefinition,
  ToolInfo,
  ViewerComponent,
  TabDefinition,
} from '../types';
import { getConfiguration } from '../configuration';

export const setLinkTypes = (
  linkTypes: { name: LinkType; enabled: boolean }[],
) => unlayer.setLinkTypes?.(linkTypes);

export const registerPropertyEditor = <
  TPropertyName extends string,
  TPropertyValue,
  TToolValues,
  TToolData,
>(
  propertyDefinition: ReactPropertyDefinition<
    TPropertyName,
    TPropertyValue,
    TToolValues,
    TToolData
  >,
) => unlayer.registerPropertyEditor(propertyDefinition);

export const registerReactTool = <TToolValues, TToolOptions>(
  toolDefinition?: ReactToolDefinition<TToolValues, TToolOptions>,
) => toolDefinition && unlayer.registerTool(createTool(toolDefinition));

export const registerTab = (tabDefinition: TabDefinition) => {
  (window as any).unlayer.registerTab(tabDefinition);
};

const createTool = <TToolValues, TToolOptions>({
  name,
  label,
  icon,
  Component,
  ...restOfToolDefinitions
}: ReactToolDefinition<TToolValues, TToolOptions>) => {
  const toolInfo: ToolInfo = { name, label, icon };
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
          toolInfo,
          restOfViewerProps,
          restOfToolDefinitions,
        }),
      exporters: {
        web: (values: TToolValues, ...restOfExporterParameters: any[]) =>
          exporter({
            Component,
            displayMode: 'web',
            values,
            toolInfo,
            restOfExporterParameters,
            restOfToolDefinitions,
          }),
        email: (values: TToolValues, ...restOfExporterParameters: any[]) =>
          exporter({
            Component,
            displayMode: 'email',
            values,
            toolInfo,
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
  toolInfo,
  restOfViewerProps,
  restOfToolDefinitions,
}: {
  Component: ViewerComponent<TToolValues>;
  displayMode: DisplayMode;
  values: TToolValues;
  toolInfo: ToolInfo;
  restOfViewerProps: ObjectWithStringProps;
  restOfToolDefinitions: ObjectWithStringProps;
}) => {
  const { previewMode: enableLogging } = getConfiguration();
  const isViewer = true;
  enableLogging &&
    console.log('RENDERING VIEWER', {
      Component,
      displayMode,
      isViewer,
      toolInfo,
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
      toolInfo={toolInfo}
    />
  );
};

const exporter = <TToolValues,>({
  Component,
  displayMode,
  values,
  toolInfo,
  restOfExporterParameters,
  restOfToolDefinitions,
}: {
  Component: ViewerComponent<TToolValues>;
  displayMode: DisplayMode;
  values: TToolValues;
  toolInfo: ToolInfo;
  restOfExporterParameters: ObjectWithStringProps;
  restOfToolDefinitions: ObjectWithStringProps;
}) => {
  // restOfExporterParameters and restOfToolDefinitions are here only for debugging process
  // and to evaluate if they could be used in the future.
  // TODO: remove restOfExporterParameters and restOfToolDefinitions when they are not needed
  const { previewMode: enableLogging } = getConfiguration();
  const isViewer = false;
  enableLogging &&
    console.log('EXPORTING', {
      Component,
      displayMode,
      isViewer,
      toolInfo,
      restOfExporterParameters,
      restOfToolDefinitions,
      values,
    });
  const stringHTMLComponent = ReactDOMServer.renderToStaticMarkup(
    <Component
      values={values}
      displayMode={displayMode}
      isViewer={isViewer}
      toolInfo={toolInfo}
    />,
  );
  return restOfToolDefinitions.is_dynamic
    ? restOfToolDefinitions.createDynamicContet(stringHTMLComponent, values)
    : stringHTMLComponent;
};

export const closePropertyEditorBar = () => {
  // This is a hack to close property editor right bar
  const outerBody = document.querySelector('#u_body') as any;
  outerBody?.click?.();
};
