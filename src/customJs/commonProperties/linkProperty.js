import { intl } from '../localization';
import { UnlayerLabelProperty } from './unlayerLabelProperty';
import { formatUrl } from '../utils/url';

const React = window.unlayer.React;

export const LinkPropertyWidget = (props) => {
  const {
    value,
    updateValue,
    data: { label, help },
  } = props;

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
            onBlur={(e) => {
              e.target.value = formatUrl(e.target.value);
              updateValue(e.target.value);
            }}
            defaultValue={value}
            type="url"
            className="form-control"
            aria-label="link-property-input"
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
