import { Alignment, PropertyGroupsFrom, ToolValuesFrom } from '../../types';

export type NewTestBase = {
  basic_configuration_section: {
    size: 'small' | 'medium' | 'large';
    alignment: Alignment;
  };
};

export type NewTestPropertyGroups = PropertyGroupsFrom<NewTestBase>;

export type NewTestValues = ToolValuesFrom<NewTestBase>;
