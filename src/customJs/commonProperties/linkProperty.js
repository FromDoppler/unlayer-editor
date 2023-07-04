const React = window.unlayer.React;
import { intl } from '../localization';
import { formatUrl } from '../utils/url';
import { UnlayerLabelProperty } from './unlayerLabelProperty';

export const LinkPropertyWidget = ({
  value,
  updateValue,
  data: { label, help },
}) => (
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

export const getLinkPropertyConfiguration = () => ({
  name: 'link_property',
  Widget: LinkPropertyWidget,
});
