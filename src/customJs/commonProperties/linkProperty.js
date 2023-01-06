import { intl } from '../localization';
import { UnlayerLabelProperty } from './unlayerLabelProperty';

const React = window.unlayer.React;

export const LinkPropertyWidget = (props) => {
  const {
    value,
    updateValue,
    data: { label, help },
  } = props;

  const [currentValue, setCurrentValue] = React.useState(value);

  React.useEffect(() => {
    if (!currentValue) {
      return;
    }
    updateValue(currentValue);
  }, [currentValue]);

  return (
    <>
      <UnlayerLabelProperty label={label}></UnlayerLabelProperty>
      <div className="blockbuilder-widget-label mb-2">
        <div className="href_field input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              {intl.formatMessage({ id: 'editor.link.url' })}
            </span>
          </div>
          <input
            type="url"
            className="form-control"
            aria-label="link-property-input"
            value={currentValue}
            onChange={(e) => {
              setCurrentValue(e.target.value);
            }}
          />
        </div>
      </div>
      {help ? help : ''}
    </>
  );
};

export const getLinkPropertyConfiguration = () => ({
  name: 'link_property',
  Widget: LinkPropertyWidget,
});
