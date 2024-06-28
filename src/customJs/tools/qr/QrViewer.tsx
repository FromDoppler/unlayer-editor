import { React, useEffect, useState } from '../../unlayer-react';
import { ViewerComponent } from '../../types';
import { QrValues } from './types';
import QRious from 'qrious';
import { EmptyViewer } from '../../components/EmptyViewer';
import { $t } from '../../localization';
import { requestDopplerApp } from '../../utils/dopplerAppBridge';

export const QrViewer: ViewerComponent<QrValues> = ({ values, ...rest }) => {
  const loadingStyle = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  } as const;

  const containerStyle = {
    display: 'block',
    backgroundColor: values.backgroundColor,
    padding: '5px',
    width: '100%',
  } as const;

  const formatStyle = {
    textAlign: values.qrAlignment,
  } as const;

  const { loading, qrUrlImage } = useQrImage({ values });
  const isQrEmpty = values.qrValue === undefined || values.qrValue === '';

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div className="spinner-border text-secondary" role="status"></div>
        <span className="visually-hidden" style={containerStyle}>
          {$t('labels.loading')}...
        </span>
      </div>
    );
  }

  return isQrEmpty ? (
    <EmptyViewer {...rest} />
  ) : (
    <div>
      <div role="container" style={containerStyle}>
        <div style={formatStyle}>
          <a role="link" href={values.qrValue} target="_blank" rel="noreferrer">
            <img src={qrUrlImage} alt={values.qrValue} />
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

const getComponentName = (values: QrValues): string => {
  const componetData = values as any;
  return componetData._meta.htmlID;
};

const getImageFile = (values: QrValues) => {
  const imageData = getQrImage(values);
  const binary = atob(imageData.split(',')[1]),
    array: number[] = [];
  for (let i = 0; i < binary.length; i++) array.push(binary.charCodeAt(i));
  const blob = new Blob([new Uint8Array(array)], { type: 'image/png' });
  return new File([blob], `${getComponentName(values)}.jpg`, {
    type: 'image/jpeg',
  }) as File;
};

const useQrImage = ({ values }: { values: QrValues }) => {
  const [loading, setLoading] = useState(false);
  const [qrUrlImage, setqrUrlImage] = useState<string>('');

  useEffect(() => {
    if (values.qrValue === undefined || values.qrValue === '') {
      setLoading(false);
      setqrUrlImage('');
      return;
    }

    setLoading(true);
    const qrImageFile = getImageFile(values);

    const { destructor } = requestDopplerApp({
      action: 'getImageUrlFile',
      qrImageFile,
      callback: (value: string) => {
        setqrUrlImage(value);
        setLoading(false);
      },
    });

    return destructor;
  }, [values]);

  return {
    loading,
    qrUrlImage,
  };
};
