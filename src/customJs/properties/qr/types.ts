import { Color } from '../../types';

export type QRValue = string;
export type UrlQrImage = string;

export type QRProperty = {
  qrValue: QRValue;
  qrUrlImage: UrlQrImage;
};

export type QrDependentToolValues = {
  qrColor: Color;
  qrSize: number;
  _meta: {
    htmlID: string;
  };
};
