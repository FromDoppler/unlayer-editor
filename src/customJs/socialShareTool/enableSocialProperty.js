import PropTypes from 'prop-types';
const React = window.unlayer.React;

const Toggle = ({ label, onChange, defaultValue }) => {
  const [active, setActive] = React.useState(true);
  const [focus, setFocus] = React.useState(false);
  const clickEvent = (e) => {
    e.preventDefault();
    setActive((prev) => {
      if (onChange) {
        onChange(!prev);
      }

      return !prev;
    });
  };

  React.useEffect(() => {
    setActive(defaultValue);
  }, [setActive]);

  return (
    <div className="blockbuilder-widget-label">
      <label className="blockbuilder-label-primary">
        <div className="">
          <span className="has-value same-value">{label}</span>
        </div>
      </label>
      <label className="blockbuilder-label-right">
        <div
          className={`react-toggle ${active ? 'react-toggle--checked' : ''} ${
            focus ? 'react-toggle--focus' : ''
          }`}
          onClick={clickEvent}
        >
          <div className="react-toggle-track">
            <div className="react-toggle-track-check">
              <svg width="14" height="11" viewBox="0 0 14 11">
                <path
                  d="M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0"
                  fill="#fff"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="react-toggle-track-x">
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path
                  d="M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12"
                  fill="#fff"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div className="react-toggle-thumb"></div>
          <input
            className="react-toggle-screenreader-only"
            type="checkbox"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </div>
      </label>
    </div>
  );
};

export const EnableSocialProperty = (props) => {
  const { data, updateValue, value, defaultValue: defaultValueProp } = props;
  const options = data && data.options ? data.options : [];
  let defaultValue = [];

  const changeValue = (isCheck, key) => {
    const currentSelection = value ? value : [];
    if (isCheck) {
      updateValue([...currentSelection, key]);
      return;
    }
    updateValue(currentSelection.filter((id) => id !== key));
  };

  React.useEffect(() => {
    if (defaultValueProp && defaultValueProp.length > 0) {
      defaultValue = defaultValueProp;
    }
  });

  return options.map((option, index) => {
    return (
      <Toggle
        key={index}
        onChange={(value) => changeValue(value, option.id)}
        label={option.name}
        defaultValue={defaultValue.includes(option.id)}
      />
    );
  });
};

export const getEnableSocialPropertyConfig = () => ({
  name: 'enable_social_property',
  Widget: EnableSocialProperty,
});

Toggle.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.bool,
};
