const React = window.unlayer.React;
import { Toggle } from '../../components/Toggle';

export const SocialNetworksWidget = ({
  data: { options = [] } = {},
  updateValue,
  value: currentSelection = [],
}) => {
  const updateSelection = (isChecked, id) => {
    if (isChecked) {
      updateValue([...currentSelection, id]);
      return;
    }
    updateValue(currentSelection.filter((x) => x !== id));
  };

  return options.map(({ id, name }) => {
    return (
      <Toggle
        key={id}
        onChange={(isChecked) => updateSelection(isChecked, id)}
        label={name}
        defaultValue={currentSelection.includes(id)}
      />
    );
  });
};
