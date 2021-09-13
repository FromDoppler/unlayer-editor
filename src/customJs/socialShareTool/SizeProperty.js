import PropTypes from 'prop-types';

const React = window.unlayer.React;

export const sizeProperty = (props) => {
  const {updateValue} = props;

  return (
    <div>
      <select name="sizeSocialTool" id="sizeSocialTool" className="form-control" onChange={e => updateValue(e.target.value)}>
        <option value="90">Normal</option>
        <option value="70">Pequeño</option>
        <option value="120">Grande</option>
      </select>
    </div>
  );
};

sizeProperty.propTypes = {
  value: PropTypes.string,
};

export const sizePropertyConfig = {
  name: 'sizeSocialTool',
  layout: 'bottom',
  Widget: sizeProperty,
};
