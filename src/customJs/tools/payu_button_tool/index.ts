import { $t } from '../../localization';
import { PayuButtonViewer } from './PayuButtonViewer';
import { ASSETS_BASE_URL } from '../../constants';
import { ReactToolDefinitionFrom } from '../../types';
import { PayuButtonHelp } from './PayuButtonHelp';
import { PayuButtonBase } from './types';
import { urlProperty } from '../../properties/url';
import {
  alignmentProperty,
  smallMediumLargeDropdownProperty,
} from '../../properties/helpers';

export const getPayuButtonToolDefinition: () => ReactToolDefinitionFrom<PayuButtonBase> =
  () => ({
    name: 'payu_button_tool',
    label: $t('_dp.payu_button'),
    icon: `${ASSETS_BASE_URL}/payu_button.svg`,
    Component: PayuButtonViewer,
    options: {
      basic_configuration_section: {
        title: $t('option_groups.button_options.title'),
        options: {
          paymentURL: urlProperty({
            label: $t('_dp.pay_button_link'),
            help: PayuButtonHelp(),
          }),
          size: smallMediumLargeDropdownProperty({
            label: $t('_dp.size'),
            defaultValue: 'medium',
          }),
          alignment: alignmentProperty(),
        },
      },
    },
    validator: ({ defaultErrors, values }) => {
      if (!values.paymentURL) {
        defaultErrors.push({
          id: 'CUSTOM_ERROR',
          icon: `${ASSETS_BASE_URL}/payu_button.svg`,
          severity: 'WARNING',
          title: $t('tabs.audit.rules.payu_button.empty_links.title'),
          description: $t(
            'tabs.audit.rules.payu_button.empty_links.description',
          ),
        });
      }

      return defaultErrors;
    },
  });
