import { EMPTY_SELECTION } from '../../constants';
import { Alignment } from '../../types';

export type PromoCodeValues = {
  store: string | EMPTY_SELECTION;
  promo_code: string | EMPTY_SELECTION;
  alignment: Alignment;
  textColor: string;
  backgroundColor: string;
  fontSize: string;
};
