import PropTypes from 'prop-types';

const React = window.unlayer.React;

export const FacebookProperty = (props) => {
  const value = props.value;
  return (
    <div>
      <input className="facebook" defaultValue={value} />
      <img
        alt="Facebook"
        src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_1-facebook-24.png"
      />
    </div>
  );
};

FacebookProperty.propTypes = {
  value: PropTypes.string,
};

export const facebookPropertyConfig = {
  name: 'facebook',
  layout: 'bottom',
  Widget: FacebookProperty,
};
