import { $t } from '../../localization';
import { ReactToolDefinitionFrom } from '../../types';
import { NewTestViewer } from './NewTestViewer';
import { NewTestBase } from './types';
import { alignmentProperty, smallMediumLargeDropdownProperty } from '../../properties/helpers';


const getNewTestToolDefinition: () => ReactToolDefinitionFrom<NewTestBase> = 
() => ({
    name: 'new-test-tool',
    label: 'New Test Tool',
    icon: 'fa-smile',
    Component: NewTestViewer,
    options: {
      basic_configuration_section: {
        title: $t('option_groups.button_options.title'),
        options: {
          size: smallMediumLargeDropdownProperty({
            label: $t('_dp.size'),
            defaultValue: 'medium',
          }),
          alignment: alignmentProperty(),
        },
      },
    },
  });  

export { getNewTestToolDefinition };