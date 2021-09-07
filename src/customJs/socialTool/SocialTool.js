const React = window.unlayer.React;
import PropTypes from 'prop-types';

export const SocialTool = (props) => {
  const values = props.values;
  return (
    <p align="center">
      <a
        style={{ textDecoration: 'none' }}
        href={values.facebook}
        target="_blank"
        rel="noreferrer"
      >
        <img
          alt="Facebook"
          src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_1-facebook-32.png"
        />
      </a>
      <a
        style={{ textDecoration: 'none' }}
        href={values.twitter}
        target="_blank"
        rel="noreferrer"
      >
        <img
          alt="Twitter"
          src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_6-twitter-32.png"
        />
      </a>
      <a
        style={{ textDecoration: 'none' }}
        href={values.linkedin}
        target="_blank"
        rel="noreferrer"
      >
        <img
          alt="Linkedin"
          src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_14-linkedin-32.png"
        />
      </a>
    </p>
  );
};

SocialTool.propTypes = {
  values: {
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    linkedin: PropTypes.string,
  },
};

export const socialToolConfig = {
  type: 'social-tool',
  category: 'contents',
  label: 'Social',
  icon: 'fa-users',
  values: {},
  options: {
    default: {
      title: null,
    },
    link: {
      title: 'Link',
      position: 1,
      options: {
        facebook: {
          label: 'Color',
          defaultValue: 'www.facebook.com',
          widget: 'facebook',
        },
        twitter: {
          label: 'Color',
          defaultValue: 'www.twitter.com',
          widget: 'twitter',
        },
        linkedin: {
          label: 'Color',
          defaultValue: 'www.linkedin.com',
          widget: 'linkedin',
        },
      },
    },
  },
  renderer: {
    Viewer: SocialTool,
  },
};
