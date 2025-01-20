import { React } from '../../unlayer-react';
import { ViewerComponent } from '../../types';
import { UnlayerField } from './types';

export const SmartFormViewer: ViewerComponent<any> = ({ values }) => {
  const formSectionStyle = {
    display: 'block',
    textAlign: values.formAlign,
    padding: '5px',
  };

  const congratSectionStyle = {
    display: 'none',
    padding: '5px',
  };

  const formStyle = {
    display: 'inline-block',
    width: values.formWidth.autoWidth ? '100%' : values.formWidth.width,
    boxSizing: 'border-box',
  } as const;

  const fieldContentStyle = {
    paddingBottom: values.fieldDistance,
  };

  /* TODO:
  Add option for boolean type or impove with toogle element
  Improve adding radio button element
*/
  const getOption = (options: string): string => {
    const list = options.split(/\n/);
    return list.reduce((options, option) => {
      const optVal = option.split('|');
      return options.concat(
        `<option value="${optVal[0]}">${optVal[1] || optVal[0]}</option>`,
      );
    }, '');
  };

  const congratUrlEncode = encodeURI(values.congratUrl);
  const getCheboxList = (field: UnlayerField): string => {
    const labelStyle = `
      display: block; text-align: left; vertical-align: middle; color: rgb(68, 68, 68); font-size: 14px;
    `;
    const inputStyle = `
      border-width: 1px; border-style: solid; border-color: rgb(204, 204, 204); border-radius: 0px; padding: 10px; color: rgb(0, 0, 0);
      background-color: rgb(255, 255, 255); font-size: 12px; width: auto; vertical-align: middle; margin-right: 5px;
    `;
    const list = field.options?.split(/\n/);

    return (
      list?.reduce((options, option) => {
        const optVal = option.split('|');
        return options.concat(
          `<label style="${labelStyle}">
            <input type="checkbox"
              id= "dp_sf_${field.name}"
              name="${field.name}"
              value="${optVal[1] || optVal[0]}"
              style="${inputStyle}">
              <span style="vertical-align: middle;">${optVal[0]}</span>
          </label>`,
        );
      }, '') || ''
    );
  };

  const inputStyle = `
    border-width: ${values.fieldBorder?.borderTopWidth} ${values.fieldBorder?.borderRightWidth} ${values.fieldBorder?.borderBottomWidth} ${values.fieldBorder?.borderLeftWidth};
    border-style: ${values.fieldBorder?.borderTopStyle} ${values.fieldBorder?.borderRightStyle} ${values.fieldBorder?.borderBottomStyle} ${values.fieldBorder?.borderLeftStyle};
    border-color: ${values.fieldBorder?.borderTopColor} ${values.fieldBorder?.borderRightColor} ${values.fieldBorder?.borderBottomColor} ${values.fieldBorder?.borderLeftColor};
    border-radius: ${values.fieldBorderRadius};
    padding:  ${values.fieldPadding};
    color: ${values.fieldColor};
    background-color: ${values.fieldBackgroundColor};
    font-size:  ${values.fieldFontSize};
    width: 100%;
  `;

  const labelStyle = {
    textAlign: values.labelAlign,
    color: values.labelColor,
    fontSize: values.labelFontSize,
    padding: values.labelPadding,
  };

  const submitStyle = {
    borderStyle: `${values.buttonBorder?.borderTopStyle} ${values.buttonBorder?.borderRightStyle} ${values.buttonBorder?.borderBottomStyle} ${values.buttonBorder?.borderLeftStyle}`,
    borderColor: `${values.buttonBorder?.borderTopColor} ${values.buttonBorder?.borderRightColor} ${values.buttonBorder?.borderBottomColor} ${values.buttonBorder?.borderLeftColor}`,
    borderWidth: `${values.buttonBorder?.borderTopWidth} ${values.buttonBorder?.borderRightWidth} ${values.buttonBorder?.borderBottomWidth} ${values.buttonBorder?.borderLeftWidth}`,
    borderRadius: values.buttonBorderRadius,
    display: 'inline-block',
    textAlign: values.buttonAlign,
    overflow: 'hidden',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: values.buttonFontWeight,
    padding: values.buttonPadding,
    margin: values.buttonMargin,
    fontSize: values.buttonFontSize,
    width: values.buttonWidth.autoWidth ? '100%' : values.buttonWidth.width,
    color: values.buttonColor,
    backgroundColor: values.buttonBackgroundColor,
  } as const;

  const renderSwitch = (field: UnlayerField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'password':
      case 'number':
      case 'date':
      case 'hidden':
        return `<input type= "${field.type}"' ${field.required ? 'required' : ''}
          name="${field.meta_data.name}"
          id= "dp_sf_${field.meta_data.name}"
          placeholder="${field.placeholder_text}"
          class="v-field-font-size-font-size"
          style="${inputStyle}"
          />`;
      case 'dropdown':
        return `<select ${field.required ? 'required' : ''}
            name="${field.name}"
            id= "dp_sf_${field.name}"
            placeholder="${field.placeholder_text}"
            class="v-field-font-size-font-size"
            style="${inputStyle}">
            ${getOption(field.options as string)}
          </select>`;
      case 'checkbox':
        return getCheboxList(field);
      case 'textarea':
        return `<textarea ${field.required ? 'required' : ''}
        name="${field.name}"
        id="dp_sf_${field.name}"
        placeholder="${field.placeholder_text}"
        class="v-field-font-size-font-size"
        style="${inputStyle}"></textarea>`;
      default:
        return '';
    }
  };

  return (
    <div>
      <section style={formSectionStyle} role="container">
        <form
          id="dp_sf"
          action=""
          method="POST"
          target="_self"
          style={formStyle}
          data-field-instance={values.display}
          data-target-id-list={values.list}
          data-action-on-finish={values.congratBehavior}
          data-action-on-finish-url={congratUrlEncode}
        >
          <div color="#000">
            {values.fields.map((field) => (
              <div
                style={fieldContentStyle}
                key={field.name}
                id={'fieldset_'.concat(field.name)}
              >
                <div style={labelStyle}>
                  <label>
                    {field.show_label ? field.label : ''}{' '}
                    {field.required ? '*' : ''}
                  </label>
                  <div
                    style={{ position: 'relative' }}
                    dangerouslySetInnerHTML={{ __html: renderSwitch(field) }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="v-button-align-text-align"
            style={{ textAlign: 'center' }}
          >
            <button type="submit" style={submitStyle}>
              {values.buttonText}
            </button>
          </div>
        </form>
      </section>
      <section style={congratSectionStyle} role="container">
        <span
          style={{ display: 'block' }}
          dangerouslySetInnerHTML={{ __html: values.descriptionHtml }}
        />
      </section>
    </div>
  );
};
