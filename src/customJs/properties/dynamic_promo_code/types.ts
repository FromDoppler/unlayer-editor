import { PromoCodeTypes } from '../../tools/promo_code/types';

export type DynamicPromoCodeDependentToolValues = {
  type: PromoCodeTypes;
  amount: string;
  expire_days: string;
  min_price: string;
  prefixe_code: string;
  includes_shipping: boolean;
  first_consumer_purchase: boolean;
  combines_with_other_discounts: boolean;
  store: string;
};
