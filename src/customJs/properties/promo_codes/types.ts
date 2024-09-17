import { EMPTY_SELECTION } from '../../constants';

export type PromoCodesValue = string | EMPTY_SELECTION;
export type StoresValue = string | EMPTY_SELECTION;

export type StoreDependentToolValues = {
  store: StoresValue;
};

export type PromoCodeItem = {
  code: string;
  type: 'percent' | 'money' | 'shipping';
  value: number;
  formattedValue: string;
};
