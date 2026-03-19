import { $t } from '../../localization';
import { PromotionalViewer } from './PromotionalViewer';
import { ReactToolDefinitionFrom } from '../../types';
import { PromotionalBase } from './types';
import { ASSETS_BASE_URL } from '../../constants';
import {
  alignmentProperty,
  autoWidthProperty,
  borderProperty,
  borderRadiusProperty,
  colorProperty,
  fontSizeProperty,
  fontWeightProperty,
  richTextProperty,
  textProperty,
} from '../../properties/helpers';
import { urlProperty } from '../../properties/url';

const DEFAULT_PROMOTIONAL_BACKGROUND = '#FFF4E5';
const DEFAULT_PROMOTIONAL_TEXT_COLOR = '#1F2937';
const DEFAULT_PROMOTIONAL_DESCRIPTION_COLOR = '#4B5563';
const DEFAULT_PROMOTIONAL_BUTTON_COLOR = '#F97316';

export const getPromotionalToolDefinition: () =>
  | ReactToolDefinitionFrom<PromotionalBase>
  | undefined = () => {
  return {
    name: 'promotional',
    label: $t('_dp.promotional.label'),
    icon: `${ASSETS_BASE_URL}/promotion_code_v2.svg`,
    Component: PromotionalViewer,
    options: {
      content: {
        title: $t('_dp.promotional.content.title'),
        options: {
          badgeText: textProperty({
            label: $t('_dp.promotional.content.badge_text'),
            defaultValue: $t('_dp.promotional.content.badge_default'),
          }),
          titleText: textProperty({
            label: $t('_dp.promotional.content.title_text'),
            defaultValue: $t('_dp.promotional.content.title_default'),
          }),
          descriptionHtml: richTextProperty({
            label: $t('_dp.promotional.content.description'),
            defaultValue: $t('_dp.promotional.content.description_default'),
          }),
        },
      },
      layout: {
        title: $t('_dp.layout'),
        options: {
          cardWidth: autoWidthProperty(),
          cardAlign: alignmentProperty(),
          cardBackgroundColor: colorProperty({
            label: $t('editor.background_color.label'),
            defaultValue: DEFAULT_PROMOTIONAL_BACKGROUND,
          }),
          cardBorder: borderProperty({
            defaultValue: '1px',
          }),
          cardBorderRadius: borderRadiusProperty(),
          cardPadding: {
            label: 'Padding',
            defaultValue: '24px',
            widget: 'padding',
          },
        },
      },
      title: {
        title: $t('_dp.title'),
        options: {
          titleColor: colorProperty({
            defaultValue: DEFAULT_PROMOTIONAL_TEXT_COLOR,
          }),
          titleFontSize: fontSizeProperty({
            defaultValue: '30px',
          }),
          titleFontWeight: fontWeightProperty({
            defaultValue: 700,
          }),
        },
      },
      description: {
        title: $t('_dp.description'),
        options: {
          descriptionColor: colorProperty({
            defaultValue: DEFAULT_PROMOTIONAL_DESCRIPTION_COLOR,
          }),
          descriptionFontSize: fontSizeProperty({
            defaultValue: '16px',
          }),
        },
      },
      button: {
        title: $t('_dp.promotional.button.title'),
        options: {
          buttonText: textProperty({
            label: $t('_dp.promotional.button.text'),
            defaultValue: $t('_dp.promotional.button.text_default'),
          }),
          buttonUrl: urlProperty({
            label: $t('_dp.promotional.button.url'),
          }),
          buttonBackgroundColor: colorProperty({
            label: $t('editor.background_color.label'),
            defaultValue: DEFAULT_PROMOTIONAL_BUTTON_COLOR,
          }),
          buttonColor: colorProperty({
            defaultValue: '#FFFFFF',
          }),
          buttonAlign: alignmentProperty(),
          buttonFontWeight: fontWeightProperty({
            defaultValue: 700,
          }),
          buttonWidth: {
            defaultValue: {
              autoWidth: true,
              width: '100%',
            },
            label: 'Width',
            widget: 'auto_width',
          },
          buttonFontSize: fontSizeProperty({
            defaultValue: '14px',
          }),
          buttonBorder: borderProperty(),
          buttonBorderRadius: borderRadiusProperty(),
          buttonPadding: {
            label: 'Padding',
            defaultValue: '12px 20px 12px 20px',
            widget: 'padding',
          },
          buttonMargin: {
            label: 'Margin',
            defaultValue: '0px',
            widget: 'margin',
          },
        },
      },
    },
  };
};
