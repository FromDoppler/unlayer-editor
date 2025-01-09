import { $t } from '../../localization';
import { dropdownProperty } from '../../properties/helpers';
import { UnlayerProperty } from '../../types';
import {
  CustomField,
  ListOption,
  SmartFormAction,
  SubscriptionList,
} from './types';

export const behaviorListProperty: () => UnlayerProperty<string> = () =>
  dropdownProperty({
    label: $t('_dp.smart_forms.behavior.label'),
    defaultValue: '2',
    options: [
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: $t('_dp.smart_forms.behavior.option_0'), value: '0' },
    ],
  } as const);

export const congratsBehaviorListProperty: () => UnlayerProperty<SmartFormAction> =
  () =>
    dropdownProperty({
      label: $t('_dp.smart_forms.behavior.action.label'),
      defaultValue: 'close',
      options: [
        {
          label: $t('_dp.smart_forms.behavior.action.option_2'),
          value: 'close',
        },
        {
          label: $t('_dp.smart_forms.behavior.action.option_0'),
          value: 'message',
        },
        { label: $t('_dp.smart_forms.behavior.action.option_1'), value: 'url' },
      ],
    } as const);

const mapListOption = (list: SubscriptionList): ListOption => {
  return { label: list.name, value: list.listId };
};

const userData = (window as any)['user-data'] || {
  subscriptionList: [],
  fields: [],
};

const emptySubscriptionList = [
  { label: '_dp.smart_forms.action.label', value: '-1' },
];
const subscriptionList = userData.subscriptionList?.map(mapListOption) || [];

export const SubscriptionListProperty: () => UnlayerProperty<string> = () =>
  dropdownProperty({
    label: $t('_dp.smart_forms.action.label'),
    options:
      subscriptionList.length > 0
        ? subscriptionList
        : (emptySubscriptionList as [ListOption, ...ListOption[]]),
  } as const);

const getFieldCompatibleType = (type: CustomField['type']): string => {
  switch (type) {
    case 'text':
    case 'date':
    case 'number':
    case 'email':
      return type;
    case 'string':
      return 'text';
    case 'phone':
      return 'tel';
    case 'country':
    case 'select':
    case 'radio':
    case 'gender':
    case 'boolean':
    case 'permission':
      return 'dropdown';
    default:
      return 'undefined';
  }
};

const optionToString = (options: string[] | undefined) => {
  return options
    ?.reduce((stringOptions, option: string) => {
      return stringOptions.concat(option.concat('\n'));
    }, '')
    ?.slice(0, -1);
};

const fieldFilter = (field: CustomField) => {
  return field.name !== 'EMAIL';
};

export const availableFields = userData.fields
  ?.filter(fieldFilter)
  .map((field: CustomField) => {
    return {
      name: field.name,
      type: getFieldCompatibleType(field.type),
      label: field.name,
      required: field.required,
      show_label: true,
      options: optionToString(field.allowedValues),
    };
  });

export const isValidUrl = (url: string) => {
  /* eslint-disable no-useless-escape */
  const URL_VALID_REGEX = new RegExp(
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{0,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g,
  );
  return URL_VALID_REGEX.test(url);
};
