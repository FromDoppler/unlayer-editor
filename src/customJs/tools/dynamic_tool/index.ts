import { $t } from '../../localization';
import { ProductViewer } from './ProductViewer';
import { ProductToolDefinition, ProductPropertyGroups } from './types';
import { ASSETS_BASE_URL, DYNAMIC_TOOL_TYPE } from '../../constants';
import {
  autoWidthProperty,
  borderProperty,
  borderRadiusProperty,
  buttonColorsProperty,
  colorProperty,
  fontFamilyProperty,
  fontSizeProperty,
  fontWeightProperty,
  textProperty,
  toggleShowProperty,
} from '../../properties/helpers';
import {
  itemStructuretProperty,
  recommendedTypeProperty,
  recommendedStructureProperty,
  productLayoutProperty,
  atributesByToolType,
} from './propertyHelper';

const DEFAULT_GREEN_COLOR = '#64BF91';
const DEFAULT_FONT_SIZE = '20px';

export const getDynamicToolDefinition: (
  dynamicToolType: DYNAMIC_TOOL_TYPE,
  customLabelIcon?: boolean,
) => ProductToolDefinition | undefined = (dynamicToolType, customLabelIcon) => {
  const usageLimit = dynamicToolType !== 'recommended' ? 1 : undefined;
  const options: ProductPropertyGroups = {
    product: {
      title: $t('_dp.cart_item_structure'),
      options: {
        structure: itemStructuretProperty(),
      },
    },
    recommendedType: {
      title: $t('_dp.cart_item_structure'),
      options: {
        type: recommendedTypeProperty(),
      },
    },
    recommendedStructure: {
      title: $t('_dp.cart_item_structure'),
      options: {
        structure: recommendedStructureProperty(),
      },
    },
    layout: {
      title: $t('_dp.layout'),
      options: {
        layout: productLayoutProperty(),
        backgroundColor: colorProperty({
          label: $t('editor.background_color.label'),
        }),
      },
    },
    image: {
      title: $t('editor.image.label'),
      options: {
        imageShown: toggleShowProperty(),
        imageAutoWith: autoWidthProperty(),
      },
    },
    title: {
      title: $t('_dp.title'),
      options: {
        titleShown: toggleShowProperty(),
        titleFont: fontFamilyProperty(),
        titleFontWeight: fontWeightProperty({
          defaultValue: 700,
        }),
        titleFontSize: fontSizeProperty({
          defaultValue: DEFAULT_FONT_SIZE,
        }),
        titleColor: colorProperty(),
      },
    },
    description: {
      title: $t('_dp.description'),
      options: {
        descriptionShown: toggleShowProperty({ defaultValue: false }),
        descriptionFont: fontFamilyProperty(),
        descriptionFontWeight: fontWeightProperty({
          defaultValue: 400,
        }),
        descriptionFontSize: fontSizeProperty({
          defaultValue: '16px',
        }),
        descriptionColor: colorProperty(),
      },
    },
    quantity: {
      title: $t('_dp.quantity'),
      options: {
        quantityShown: toggleShowProperty(),
        quantityFont: fontFamilyProperty(),
        quantityFontWeight: fontWeightProperty(),
        quantityFontSize: fontSizeProperty({
          label: $t('editor.font_size.label'),
          defaultValue: '18px',
        }),
        quantityColor: colorProperty(),
      },
    },
    price: {
      title: $t('_dp.price'),
      options: {
        priceShown: toggleShowProperty(),
        priceFont: fontFamilyProperty(),
        priceFontWeight: fontWeightProperty(),
        priceFontSize: fontSizeProperty({
          label: $t('editor.font_size.label'),
          defaultValue: DEFAULT_FONT_SIZE,
        }),
        priceColor: colorProperty({
          label: $t('editor.text_color.label'),
          defaultValue: DEFAULT_GREEN_COLOR,
        }),
      },
    },
    button: {
      title: $t('_dp.product_button'),
      options: {
        buttonShown: toggleShowProperty(),
        buttonText: textProperty({
          label: $t('_dp.product_button_text'),
          defaultValue: $t('_dp.product_button_default_value'),
        }),
        buttonFont: fontFamilyProperty(),
        buttonFontWeight: fontWeightProperty({
          defaultValue: 700,
        }),
        buttonFontSize: fontSizeProperty({
          defaultValue: '15px',
        }),
        buttonColors: buttonColorsProperty(),
        buttonAutoWith: autoWidthProperty(),
        buttonBorder: borderProperty(),
        buttonBorderRadius: borderRadiusProperty(),
      },
    },
  };

  const toolOptionByType = Object.fromEntries(
    atributesByToolType[dynamicToolType].map((t) => [t, options[t]]),
  );

  const label = customLabelIcon
    ? {
        product_retargeting: $t('_dp.products'),
        recommended: $t('_dp.best_sellers'),
      }[dynamicToolType] || $t(`_dp.${dynamicToolType}`)
    : $t(`_dp.${dynamicToolType}`);

  const icon =
    {
      product_retargeting: `${ASSETS_BASE_URL}/product_v2.svg`,
    }[dynamicToolType] || `${ASSETS_BASE_URL}/${dynamicToolType}_v5.svg`;

  return {
    name: `dynamic_${dynamicToolType}`,
    label: label,
    icon: icon,
    is_dynamic: true,
    dynamicToolType: dynamicToolType,
    usageLimit: usageLimit,
    Component: ProductViewer,
    options: toolOptionByType,
    createDynamicContet(htmlComponent: string, values: any) {
      const dynamicAction = values.type || dynamicToolType;
      const htmlDinamicComponent = htmlComponent
        .replace(
          /^.[div]*/,
          `<DynamicContent action="${dynamicAction}" items="${
            values.structure || 0
          }"`,
        )
        .replace(/<\/div>$/, '</DynamicContent>');
      return htmlDinamicComponent;
    },
  };
};
