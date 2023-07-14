import { React, ReactNode } from '../../unlayer-react';
import { WidgetComponent } from '../../types';
import { intl } from '../../localization';
import { formatUrl } from '../../utils/url';
import { addUnlayerLabel } from '../../components/UnlayerLabel';
import { UrlValue } from './UrlValue';

export const UrlWidget: WidgetComponent<UrlValue, void, { help?: ReactNode }> =
  addUnlayerLabel(({ value, updateValue, data: { help } }) => (
    <>
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
  ));
