import { $t } from '../../localization';
import { RssViewer } from './RssViewer';
import { RssToolDefinition, DateFormat } from './types';
import { ASSETS_BASE_URL } from '../../constants';
import {
  alignmentProperty,
  colorProperty,
  dropdownProperty,
  fontFamilyProperty,
  fontSizeProperty,
  fontWeightProperty,
  textProperty,
  toggleProperty,
  toggleShowProperty,
} from '../../properties/helpers';
import { UnlayerProperty } from '../../types';

const dateFortmatProperty: () => UnlayerProperty<DateFormat> = () =>
  dropdownProperty({
    label: $t('_dp.time_format'),
    defaultValue: 'D/M/Y H:M:S',
    options: [
      { label: $t('_dp.time_format_0'), value: 'D/M/Y H:M:S' },
      { label: $t('_dp.time_format_1'), value: 'M/D/Y H:M:S' },
      { label: $t('_dp.time_format_2'), value: 'D/M/Y' },
      { label: $t('_dp.time_format_3'), value: 'M/D/Y' },
    ],
  } as const);

export const getRssHeaderToolDefinition: () =>
  | RssToolDefinition
  | undefined = () => {
  return {
    name: 'rss',
    label: 'Rss',
    icon: `${ASSETS_BASE_URL}/rss_v3.svg`,
    usageLimit: 1,
    Component: RssViewer,
    options: {
      layout: {
        title: $t('_dp.layout'),
        options: {
          backgroundColor: colorProperty({
            label: $t('editor.background_color.label'),
          }),
        },
      },
      headTitle: {
        title: $t('_dp.rss_title_head'),
        options: {
          headTitleShown: toggleShowProperty(),
          headTitleFont: fontFamilyProperty(),
          headTitleFontWeight: fontWeightProperty({
            defaultValue: 700,
          }),
          headTitleFontSize: fontSizeProperty({
            defaultValue: '20px',
          }),
          headTitleColor: colorProperty(),
        },
      },
      headDate: {
        title: $t('_dp.rss_date_head'),
        options: {
          headDateShown: toggleShowProperty({
            defaultValue: false,
          }),
          headDateFormat: dateFortmatProperty(),
          headDateFont: fontFamilyProperty(),
          headDateFontWeight: fontWeightProperty({
            defaultValue: 700,
          }),
          headDateFontSize: fontSizeProperty({
            defaultValue: '20px',
          }),
          headDateColor: colorProperty(),
        },
      },

      headDescription: {
        title: $t('_dp.rss_description_head'),
        options: {
          headDescriptionShown: toggleShowProperty(),
          headDescriptionFont: fontFamilyProperty(),
          headDescriptionFontSize: fontSizeProperty({
            defaultValue: '16px',
          }),
          headDescriptionFontWeight: fontWeightProperty({
            defaultValue: 500,
          }),
          headDescriptionColor: colorProperty(),
        },
      },
      headButton: {
        title: $t('_dp.rss_feed_link_title'),
        options: {
          headButtonShown: toggleShowProperty({
            defaultValue: false,
          }),
          headButtonAlign: alignmentProperty({
            defaultValue: 'left',
          }),
          headButtonText: textProperty({
            label: $t('_dp.product_button_text'),
            defaultValue: $t('_dp.rss_head_button_default_value'),
          }),
          headButtonFont: fontFamilyProperty(),
          headButtonFontWeight: fontWeightProperty({
            defaultValue: 500,
          }),
          headButtonFontSize: fontSizeProperty({
            defaultValue: '16px',
          }),
          headButtonColor: colorProperty(),
        },
      },
      itemTitle: {
        title: $t('_dp.rss_title_item'),
        options: {
          itemTitleShown: toggleShowProperty(),
          itemTitleFont: fontFamilyProperty(),
          itemTitleFontWeight: fontWeightProperty({
            defaultValue: 700,
          }),
          itemTitleFontSize: fontSizeProperty({
            defaultValue: '20px',
          }),
          itemTitleColor: colorProperty(),
        },
      },
      itemDate: {
        title: $t('_dp.rss_date_item'),
        options: {
          itemDateShown: toggleShowProperty({
            defaultValue: false,
          }),
          itemDateFormat: dateFortmatProperty(),
          itemDateFont: fontFamilyProperty(),
          itemDateFontWeight: fontWeightProperty({
            defaultValue: 700,
          }),

          itemDateFontSize: fontSizeProperty({
            defaultValue: '20px',
          }),
          itemDateColor: colorProperty(),
        },
      },
      itemImage: {
        title: $t('editor.image.label'),
        options: {
          itemImageShown: toggleShowProperty({
            defaultValue: false,
          }),
        },
      },
      itemDescription: {
        title: $t('_dp.rss_description_item'),
        options: {
          itemDescriptionShown: toggleShowProperty(),
          itemDescriptionFull: toggleProperty({
            label: $t('_dp.rss_description_item'),
            defaultValue: false,
          }),
          itemDescriptionFont: fontFamilyProperty(),
          itemDescriptionFontWeight: fontWeightProperty({
            defaultValue: 500,
          }),
          itemDescriptionFontSize: fontSizeProperty({
            defaultValue: '16px',
          }),
          itemDescriptionColor: colorProperty(),
        },
      },
      itemButton: {
        title: $t('_dp.rss_item_link_title'),
        options: {
          itemButtonShown: toggleShowProperty(),
          itemButtonAlign: alignmentProperty({
            defaultValue: 'left',
          }),
          itemButtonText: textProperty({
            label: $t('_dp.product_button_text'),
            defaultValue: $t('_dp.rss_button_default_value'),
          }),
          itemButtonFont: fontFamilyProperty(),
          itemButtonFontWeight: fontWeightProperty({
            defaultValue: 500,
          }),
          itemButtonFontSize: fontSizeProperty({
            defaultValue: '16px',
          }),
          itemButtonColor: colorProperty(),
        },
      },
    },
  };
};
