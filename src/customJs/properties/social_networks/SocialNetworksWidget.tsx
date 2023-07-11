import { React } from '../../unlayer-react';
import { WidgetComponent } from '../../types';
import { Toggle } from '../../components/Toggle';

type Option = { id: string; name: string } & Record<string, any>;
type Value = string[];

export const SocialNetworksWidget: WidgetComponent = ({
  data: { options = [] } = {},
  updateValue,
  value: currentSelection = [],
}: {
  data: { options?: Option[] };
  updateValue: (value: Value) => void;
  value: Value;
}) => {
  const updateSelection = (isChecked: boolean, id: string) => {
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
