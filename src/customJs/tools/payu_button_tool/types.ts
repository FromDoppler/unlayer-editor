import { UrlValue } from '../../properties/url/UrlValue';
import { Alignment, PropertyGroupsFrom, ToolValuesFrom } from '../../types';

export type PayuButtonBase = {
  basic_configuration_section: {
    paymentURL: UrlValue;
    size: 'small' | 'medium' | 'large';
    alignment: Alignment;
  };
};

export type PayuButtonPropertyGroups = PropertyGroupsFrom<PayuButtonBase>;

export type PayuButtonValues = ToolValuesFrom<PayuButtonBase>;
