import { React, useEffect } from '../../unlayer-react';
import { WidgetComponent } from '../../types';
import { DynamicPromoCodeDependentToolValues } from './types';
import { requestDopplerApp } from '../../utils/dopplerAppBridge';

export const dynamicPromoCodeWidget: WidgetComponent<
  string,
  DynamicPromoCodeDependentToolValues,
  void
> = ({
  value,
  updateValue,
  values: {
    type,
    amount,
    expire_days,
    min_price,
    prefixe_code,
    includes_shipping,
    first_consumer_purchase,
    combines_with_other_discounts,
  },
}) => {
  useEffect(() => {
    updateValue(value);

    const dynamicProperties = {
      dynamicId: value,
      type: type,
      value: amount,
      expire_days: expire_days,
      min_price: min_price,
      prefixe_code: prefixe_code,
      includes_shipping: includes_shipping,
      first_consumer_purchase: first_consumer_purchase,
      combines_with_other_discounts: combines_with_other_discounts,
    };

    const getData = setTimeout(() => {
      requestDopplerApp({
        action: 'getPromoCodeDynamicId',
        dynamicProperties,
        callback: (value: string) => {
          updateValue(value);
        },
      });
    }, 2000);
    return () => clearTimeout(getData);
  }, [
    type,
    amount,
    expire_days,
    min_price,
    prefixe_code,
    includes_shipping,
    first_consumer_purchase,
    combines_with_other_discounts,
  ]);

  return <></>;
};
