import { EMPTY_SELECTION } from '../../constants';
import { Alignment, PropertyGroupsFrom, ToolValuesFrom } from '../../types';

export type PromoCodeTypes = 'percent' | 'money' | 'shipping';

export type PromoCodeBase = {
  promo_code_store: {
    store: string | EMPTY_SELECTION;
    isDynamic: boolean;
  };
  promo_code: {
    code: string | EMPTY_SELECTION;
  };
  dynamic_code: {
    code_type: PromoCodeTypes;
    code_value: string;
    expire_days: string;
    min_price: string;
    advance_options: boolean;
  };
  promo_code_advance: {
    prefixe_code: string;
    includes_shipping: boolean;
    first_consumer_purchase: boolean;
    combines_with_other_discounts: boolean;
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
