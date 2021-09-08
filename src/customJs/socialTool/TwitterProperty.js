import PropTypes from 'prop-types';

const React = window.unlayer.React;

export const TwitterProperty = (props) => {
  const value = props.value;
  return (
    <div>
      <input className="color-value" defaultValue={value} />
      <img
        alt="Twitter"
        src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_6-twitter-24.png"
      />
    </div>
  );
};

TwitterProperty.propTypes = {
  value: PropTypes.string,
};

export const twitterPropertyConfig = {
  name: 'twitter',
  layout: 'bottom',
  Widget: TwitterProperty,
};
