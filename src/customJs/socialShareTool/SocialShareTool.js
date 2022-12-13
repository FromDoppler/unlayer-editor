const React = window.unlayer.React;
import PropTypes from 'prop-types';

export const SocialShareTool = (props) => {
  const { social_share_align_option } = props.values;

  const socialButtonCommonStyle = {
    margin: '0px 2px',
    display: 'inline-block',
  };

  const socialSettings = [
    {
      link: '[[shareInFacebookLink]]',
      socialImg:
        'https://app2.dopplerfiles.com/MSEditor/images/color_big_facebook_en.png',
      altText: 'Facebook',
    },
    {
      link: '[[shareInLinkedinLink]]',
      socialImg:
        'https://app2.dopplerfiles.com/MSEditor/images/color_big_linkedin_en.png',
      altText: 'Linkedin',
    },
    {
      link: '[[shareInTwitterLink]]',
      socialImg:
        'https://app2.dopplerfiles.com/MSEditor/images/color_big_twitter_en.png',
      altText: 'Twitter',
    },
    {
      link: '[[shareInPinterestLink]]',
      socialImg:
        'https://app2.dopplerfiles.com/MSEditor/images/color_big_pinterest_en.png',
      altText: 'Pinterest',
    },
    {
      link: '[[shareInWhatsappLink]]',
      socialImg:
        'https://app2.dopplerfiles.com/MSEditor/images/color_big_whatsapp_en.png',
      altText: 'Whatsapp',
    },
  ];

  return (
    <table cellPadding="0" cellSpacing="0" border="0" width="100%">
      <tr>
        <td style={{ textAlign: social_share_align_option }}>
          <table cellPadding="0" cellSpacing="0" border="0" width="100%">
            <tr>
              <td
                style={{
                  paddingRight: '5px',
                  paddingTop: '5px',
                  textAlign: social_share_align_option,
                }}
                valign="middle"
              >
                {socialSettings.map((config, id) => (
                  <a
                    href={config.link}
                    target="_blank"
                    rel="noreferrer"
                    id={`social_button_${id}`}
                  >
                    <img
                      src={config.socialImg}
                      alt={config.altText}
                      style={socialButtonCommonStyle}
                    />
                  </a>
                ))}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  );
};

SocialShareTool.propTypes = {
  values: {
    social_share_align_option: PropTypes.string,
    social_share_network_facebook: PropTypes.bool,
    social_share_size: PropTypes.string,
    social_share_network_linkedin: PropTypes.string,
    social_share_network_twitter: PropTypes.string,
    social_share_network_pinterest: PropTypes.string,
    social_share_network_whatsapp: PropTypes.string,
  },
};
