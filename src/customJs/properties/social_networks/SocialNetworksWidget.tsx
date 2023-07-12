import { React } from '../../unlayer-react';
import { SocialNetworkId, WidgetComponent } from '../../types';
import { Toggle } from '../../components/Toggle';
import { SocialNetworksValue } from './SocialNetworksValue';

type Option = { id: SocialNetworkId; name: string } & Record<string, any>;

export const SocialNetworksWidget: WidgetComponent<SocialNetworksValue> = ({
  value: currentSelection = [],
  updateValue,
  data: { options = [] } = {},
}: {
  data: { options?: Option[] };
  updateValue: (value: SocialNetworksValue) => void;
  value: SocialNetworksValue;
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
