import { React } from '../../unlayer-react';
import { ViewerComponent } from '../../types';
import { QrValues } from './types';
import { EmptyViewer } from '../../components/EmptyViewer';

export const QrViewer: ViewerComponent<QrValues> = ({ values, ...rest }) => {
  const containerStyle = {
    display: 'block',
    backgroundColor: values.backgroundColor,
    padding: '5px',
    width: '100%',
  } as const;

  const formatStyle = {
    textAlign: values.qrAlignment,
  } as const;

  const isQrEmpty = values.qr.qrValue === '';

  return isQrEmpty ? (
    <EmptyViewer {...rest} />
  ) : (
    <div>
      <div role="container" style={containerStyle}>
        <div style={formatStyle}>
          <a
            role="link"
            href={values.qr.qrValue}
            target="_blank"
            rel="noreferrer"
          >
            <img src={values.qr.qrUrlImage} alt={values.qr.qrValue} />
          </a>
        </div>
      </div>
    </div>
  );
};
