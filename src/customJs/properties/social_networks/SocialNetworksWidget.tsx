import { React } from '../../unlayer-react';
import { BaseToolData, SocialNetworkId, WidgetComponent } from '../../types';
import { Toggle } from '../../components/Toggle';
import { SocialNetworksValue } from './SocialNetworksValue';

type Option = { id: SocialNetworkId; name: string } & Record<string, any>;

export const SocialNetworksWidget: WidgetComponent<
  SocialNetworksValue,
  void,
  BaseToolData & { options?: Option[] }
> = ({
  value: currentSelection = [],
  updateValue,
  data: { options = [] } = {},
}) => {
  const updateSelection = (isChecked: boolean, id: SocialNetworkId) => {
    if (isChecked) {
      updateValue([...currentSelection, id]);
      return;
    }
    updateValue(currentSelection.filter((x) => x !== id));
  };
  return (
    <>
      {options.map(({ id, name }) => {
        return (
          <Toggle
            key={id}
            onChange={(isChecked) => updateSelection(isChecked, id)}
            label={name}
            defaultValue={currentSelection.includes(id)}
          />
        );
      })}
    </>
  );
};
