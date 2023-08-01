import { React } from '../unlayer-react';
import { ToolInfo, ViewerComponent } from '../types';

export const EmptyViewer: ViewerComponent<void> = ({
  toolInfo,
  isViewer,
}: {
  toolInfo: ToolInfo;
  isViewer: boolean;
}) => {
  // TODO: Consider moving these styles to the style guide
  const containerStyle = {
    padding: '10px',
    color: 'rgb(153, 153, 153)',
    backgroundColor: 'rgb(238, 238, 238)',
    border: '2px dashed rgb(204, 204, 204)',
    display: 'flex',
    flexDirection: 'column',
  } as const;

  const iconStyle = {
    filter: 'brightness(2)',
    marginBottom: '5px',
    height: '40px',
    width: 'auto',
  } as const;

  const textStyle = {
    textTransform: 'uppercase',
    textAlign: 'center',
  } as const;
  return isViewer ? (
    <section style={containerStyle}>
      <img style={iconStyle} src={toolInfo.icon} alt={toolInfo.name} />
      <span style={textStyle}>{toolInfo.label}</span>
    </section>
  ) : (
    <></>
  );
};
