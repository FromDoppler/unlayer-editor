import { React, useEffect, useState } from '../../unlayer-react';
import { Color, WidgetComponent } from '../../types';
import { QRProperty, QrDependentToolValues } from './types';
import { requestDopplerApp } from '../../utils/dopplerAppBridge';
import { formatUrl } from '../../utils/url';
import QRious from 'qrious';

export const qrWidget: WidgetComponent<
  QRProperty,
  QrDependentToolValues,
  void
> = ({ label, value, updateValue, values: { qrColor, qrSize, _meta } }) => {
  const [qrValue, setQrValue] = useState(value);

  useEffect(() => {
    if (qrValue.qrValue === '') {
      return;
    }
    // set temporal qr with dataUri
    const qrDataUri = getQrImage(qrValue, qrColor, qrSize);
    updateValue({
      qrValue: qrValue.qrValue,
      qrUrlImage: qrDataUri,
    });

    const qrImageFile = getImageFile(qrDataUri, _meta.htmlID);
    const { destructor } = requestDopplerApp({
      action: 'getImageUrlFile',
      qrImageFile,
      callback: (value: string) => {
        updateValue({
          qrValue: qrValue.qrValue,
          qrUrlImage: value,
        });
      },
    });

    return destructor;
  }, [qrValue, qrColor, qrSize]);

  const changeValue = (e: any) => {
    setQrValue({
      qrValue: e,
      qrUrlImage: 'UrlQrImage',
    });
  };

  return (
    <>
      <div className="blockbuilder-widget blockbuilder-link-widget mb-2">
        <div className="field_container href_field flex">
          <form className="input-form">
            <div role="group" className="input-group horizontal left">
              <label>{label}</label>
              <input
                onBlur={(e) => {
                  e.target.value = formatUrl(e.target.value);
                  changeValue(e.target.value);
                }}
                defaultValue={value.qrValue}
                className="input"
                type="url"
                aria-label="link-property-input"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const getQrImage = (
  values: QRProperty,
  qrColor: Color,
  qrSize: number,
): string => {
  return new QRious({
    value: values.qrValue,
    foreground: qrColor || 'black',
    size: qrSize,
    level: 'H', // Error correction level of the QR code (L, M, Q, H)
  }).toDataURL('image/jpeg');
};

const getImageFile = (imageData: string, htmlID: string) => {
  const binary = atob(imageData.split(',')[1]),
    array: number[] = [];
  for (let i = 0; i < binary.length; i++) array.push(binary.charCodeAt(i));
  const blob = new Blob([new Uint8Array(array)], { type: 'image/png' });
  const timestamp = new Date().getTime();
  return new File([blob], `${htmlID}${timestamp}.jpg`, {
    type: 'image/jpeg',
  }) as File;
};
