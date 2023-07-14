import { React } from '../../unlayer-react';
import { SocialNetworkId, WidgetComponent } from '../../types';
import { Toggle } from '../../components/Toggle';
import { SocialNetworksValue } from './SocialNetworksValue';

export const SocialNetworksWidget: WidgetComponent<
  SocialNetworksValue,
  void,
  { options?: { id: SocialNetworkId; name: string }[] }
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
