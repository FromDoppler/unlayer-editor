import { React, ReactNode } from '../../unlayer-react';
import { WidgetComponent } from '../../types';
import { $t } from '../../localization';
import { formatUrl } from '../../utils/url';
import { addUnlayerLabel } from '../../components/UnlayerLabel';
import { UrlValue } from './UrlValue';

export const UrlWidget: WidgetComponent<UrlValue, void, { help?: ReactNode }> =
  addUnlayerLabel(({ value, updateValue, data: { help } }) => (
    <>
      <div className="blockbuilder-widget blockbuilder-link-widget mb-2">
        <div className="field_container href_field flex">
          <form className="input-form">
            <div role="group" className="input-group horizontal left">
              <label>{$t('editor.link.url')}</label>
              <input
                onBlur={(e) => {
                  e.target.value = formatUrl(e.target.value);
                  updateValue(e.target.value);
                }}
                defaultValue={value}
                className="input"
                type="url"
                aria-label="link-property-input"
              />
            </div>
          </form>
        </div>
      </div>
      {help ? help : ''}
    </>
  ));
