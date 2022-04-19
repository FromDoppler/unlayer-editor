import PropTypes from 'prop-types';

const React = window.unlayer.React;

export const LinkedInProperty = (props) => {
  const value = props.value;
  return (
    <div>
      <input className="color-value" defaultValue={value} />
      <img
        alt="Linkedin"
        src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_14-linkedin-24.png"
      />
    </div>
  );
};

LinkedInProperty.propTypes = {
  value: PropTypes.string,
};

export const getLinkedInPropertyConfig = () => ({
  name: 'linkedin',
  layout: 'bottom',
  Widget: LinkedInProperty,
});
