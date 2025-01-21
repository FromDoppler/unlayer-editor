import { getConfiguration } from '../../configuration';
import { DYNAMIC_TOOL_TYPE } from '../../constants';
import { $t } from '../../localization';
import { dropdownProperty } from '../../properties/helpers';
import { UnlayerProperty } from '../../types';
import {
  ProductLayout,
  ItemsStructure,
  RecommendedStructure,
  RecommendedType,
  OptionTool,
  LinkTarget,
} from './types';

const { bestSellingEnabled, crossSellingEnabled, newProductsEnabled } =
  getConfiguration();

export const productLayoutProperty: () => UnlayerProperty<ProductLayout> = () =>
  dropdownProperty({
    label: undefined,
    defaultValue: '00_horizontal',
    options: [
      { label: $t('_dp.layout_00_horizontal'), value: '00_horizontal' },
      { label: $t('_dp.layout_01_vertical'), value: '01_vertical' },
    ],
  } as const);

export const linkTargettProperty: () => UnlayerProperty<LinkTarget> = () =>
  dropdownProperty({
    label: $t('editor.link.target'),
    defaultValue: '_blank',
    options: [
      { label: $t('editor.link.new_tab'), value: '_blank' },
      { label: $t('editor.link.same_tab'), value: '_self' },
    ],
  } as const);

export const itemStructuretProperty: () => UnlayerProperty<ItemsStructure> =
  () =>
    dropdownProperty({
      label: undefined,
      defaultValue: '1',
      options: [
        { label: $t('_dp.cart_item_structure_option_0'), value: '0' },
        { label: $t('_dp.cart_item_structure_option_1'), value: '1' },
        { label: $t('_dp.cart_item_structure_option_2'), value: '2' },
        { label: $t('_dp.cart_item_structure_option_3'), value: '3' },
      ],
    } as const);

export const recommendedStructureProperty: () => UnlayerProperty<RecommendedStructure> =
  () =>
    dropdownProperty({
      label: $t('_dp.recommended_structure'),
      defaultValue: '3',
      options: [
        { label: $t('_dp.recommended_structure_option_1'), value: '1' },
        { label: $t('_dp.recommended_structure_option_2'), value: '2' },
        { label: $t('_dp.recommended_structure_option_3'), value: '3' },
        { label: $t('_dp.recommended_structure_option_4'), value: '4' },
      ],
    } as const);

type RecommendedOption = { label: string; value: RecommendedType };
export const getRecommended_type_options: () => Readonly<
  [RecommendedOption, ...RecommendedOption[]]
> = () => {
  return [
    {
      label: $t('_dp.recommended_type_best_selling'),
      value: 'best_selling',
      enabled: bestSellingEnabled,
    },
    {
      label: $t('_dp.recommended_type_cross_selling'),
      value: 'cross_selling',
      enabled: crossSellingEnabled,
    },
    {
      label: $t('_dp.recommended_type_new_products'),
      value: 'new_products',
      enabled: newProductsEnabled,
    },
  ]
    .filter(({ enabled }) => !!enabled)
    .map(({ label, value }) => {
      return <RecommendedOption>{ label: label, value: value };
    }) as [RecommendedOption, ...RecommendedOption[]];
};

export const recommendedTypeProperty: () => UnlayerProperty<RecommendedType> =
  () =>
    dropdownProperty({
      label: $t('_dp.recommended_type'),
      defaultValue: 'best_selling',
      options: getRecommended_type_options(),
    } as const);

export const atributesByToolType: Record<DYNAMIC_TOOL_TYPE, OptionTool[]> = {
  abandoned_cart: ['product', 'layout', 'image', 'title', 'price', 'button'],
  product_retargeting: [
    'product',
    'layout',
    'image',
    'title',
    'price',
    'button',
  ],
  order_details: ['layout', 'image', 'title', 'quantity', 'price'],
  recommended: ['recommendedStructure', 'image', 'title', 'price', 'button'],
  recommended_product: [
    'recommendedProductStructure',
    'image',
    'title',
    'price',
    'info',
    'button',
  ],
  products_completed: [
    'product',
    'layout',
    'image',
    'title',
    'price',
    'info',
    'button',
  ],
};
