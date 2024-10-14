import { EMPTY_SELECTION } from '../../constants';
import { Alignment, PropertyGroupsFrom, ToolValuesFrom } from '../../types';

export type PromoCodeTypes = 'percent' | 'money' | 'shipping';

export type PromoCodeBase = {
  store_promo_code: {
    store: string | EMPTY_SELECTION;
    isDynamic: boolean;
  };
  promo_code: {
    code: string | EMPTY_SELECTION;
  };
  dynamic_code: {
    expire_days: string;
    type: PromoCodeTypes;
    amount: string;
    min_price: string;
    advanced_options: boolean;
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
