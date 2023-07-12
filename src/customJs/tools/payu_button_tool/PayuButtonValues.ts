import { Alignment } from '../../types';

export type PayuButtonValues = {
  size: 'small' | 'medium' | 'large';
  paymentURL: string;
  alignment: Alignment;
};
