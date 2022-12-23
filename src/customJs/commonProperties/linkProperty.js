import { intl } from '../localization';
import { customPropertyLabel } from './unlayerLabelProperty';

const unlayer = window.unlayer;

const linkPropertyWidget = {
  render(value, updateValue, data) {
    const label = data && data.label ? customPropertyLabel(data.label) : '';
    const help = data && data.help ? data.help : '';

    return `
            ${label}
            <div class="blockbuilder-widget-label mb-2">
              <div class="href_field input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    ${intl.formatMessage({ id: 'editor.link.url' })}
                  </span>
                </div>
                <input type="url" class="form-control" value="${
                  value ? value : ''
                }">
              </div>
            </div>
            ${help}
      `;
  },
  mount(node, value, updateValue) {
    const input = node.getElementsByTagName('input')[0];
    input.onchange = (e) => {
      updateValue(e.target.value);
    };
  },
};

export const getLinkPropertyConfiguration = () => ({
  name: 'link_property',
  Widget: unlayer.createWidget(linkPropertyWidget),
});
