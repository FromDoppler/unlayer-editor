import { EMPTY_SELECTION } from '../../constants';
import { Alignment, PropertyGroupsFrom, ToolValuesFrom } from '../../types';

export type PromoCodeBase = {
  promo_code: {
    store: string | EMPTY_SELECTION;
  promo_code: {
    code: string | EMPTY_SELECTION;
  };
  };
  default: {
    alignment: Alignment;
    backgroundColor: string;
    textColor: string;
    fontSize: string;
  };
};

export type PromoCodePropertyGroups = PropertyGroupsFrom<PromoCodeBase>;

export type PromoCodeValues = ToolValuesFrom<PromoCodeBase>;
