import { intl } from './localization';

const unlayer = window.unlayer;

const customPropertyLabel = (label) => `
            <div class="blockbuilder-widget-label mb-2">
                <label class="blockbuilder-label-primary">
                    <div class=""><span class="has-value same-value">${label}</span>
                    </div>
                </label>
            </div>`;

const linkPropertyWidget = {
  render(value, updateValue, data) {
    const label = data && data.label ? customPropertyLabel(data.label) : '';

    return `
            ${label}
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
      `;
  },
  mount(node, value, updateValue, data) {
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
