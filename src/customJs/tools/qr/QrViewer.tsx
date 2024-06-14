import { React } from '../../unlayer-react';
import { ViewerComponent } from '../../types';
import { QrValues } from './types';
import QRious from 'qrious';
import { EmptyViewer } from '../../components/EmptyViewer';

export const QrViewer: ViewerComponent<QrValues> = ({ values, ...rest }) => {
  const containerStyle = {
    display: 'block',
    backgroundColor: values.backgroundColor,
    padding: '5px',
    width: '100%',
  } as const;

  const imageData: string = getQrImage(values);
  const formatStyle = {
    textAlign: values.qrAlignment,
  } as const;

  const isQrEmpty = values.qrValue === undefined || values.qrValue === '';

  return isQrEmpty ? (
    <EmptyViewer {...rest} />
  ) : (
    <div>
      <div role="container" style={containerStyle}>
        <div style={formatStyle}>
          <a role="link" href={values.qrValue} target="_blank" rel="noreferrer">
            <img src={imageData} alt={values.qrValue} />
          </a>
        </div>
      </div>
    </div>
  );
};

const getQrImage = (values: QrValues): string => {
  return new QRious({
    value: values.qrValue,
    foreground: values.qrColor || 'black',
    background: values.backgroundColor || 'white',
    size: values.qrSize,
    level: 'H', // Error correction level of the QR code (L, M, Q, H)
  }).toDataURL('image/jpeg');
};
