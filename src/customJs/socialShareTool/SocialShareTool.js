const React = window.unlayer.React;
import PropTypes from 'prop-types';

export const SocialShareTool = (props) => {
  const values = props.values;

  return (
    <table cellPadding="0" cellSpacing="0" border="0" width="100%">
      <tr>
        <td style={{ textAlign: values.social_share_align_option }}>
          <table cellPadding="0" cellSpacing="0" border="0" width="100%">
            <tr>
              <td
                style={{
                  paddingRight: '5px',
                  paddingTop: '5px',
                  textAlign: values.social_share_align_option,
                }}
                valign="middle"
              >
                {values.social_share_network_facebook && (
                  <a
                    socialshare="4"
                    href="[[[$share_vo_facebook]]]"
                    target="_blank"
                  >
                    <img
                      width={values.social_share_size}
                      src="https://app2.dopplerfiles.com/MSEditor/images/color_big_facebook_en.png"
                      alt="Facebook"
                      style={{ margin: '0px 2px', display: 'inline-block' }}
                    />
                  </a>
                )}
                {values.social_share_network_linkedin && (
                  <a
                    socialshare="3"
                    href="[[[$share_vo_linkedin]]]"
                    target="_blank"
                  >
                    <img
                      width={values.social_share_size}
                      src="https://app2.dopplerfiles.com/MSEditor/images/color_big_linkedin_en.png"
                      alt="Linkedin"
                      style={{ margin: '0px 2px', display: 'inline-block' }}
                    />
                  </a>
                )}
                {values.social_share_network_twitter && (
                  <a
                    socialshare="2"
                    href="[[[$share_vo_twitter]]]"
                    target="_blank"
                  >
                    <img
                      width={values.social_share_size}
                      src="https://app2.dopplerfiles.com/MSEditor/images/color_big_twitter_en.png"
                      alt="Twitter"
                      style={{ margin: '0px 2px', display: 'inline-block' }}
                    />
                  </a>
                )}
                {values.social_share_network_pinterest && (
                  <a
                    socialshare="20"
                    href="[[[$share_vo_pinterest]]]"
                    target="_blank"
                  >
                    <img
                      width={values.social_share_size}
                      src="https://app2.dopplerfiles.com/MSEditor/images/color_big_pinterest_en.png"
                      alt="Pinterest"
                      style={{ margin: '0px 2px', display: 'inline-block' }}
                    />
                  </a>
                )}
                {values.social_share_network_whatsapp && (
                  <a
                    socialshare="24"
                    href="[[[$share_vo_whatsapp]]]"
                    target="_blank"
                  >
                    <img
                      width={values.social_share_size}
                      src="https://app2.dopplerfiles.com/MSEditor/images/color_big_whatsapp_en.png"
                      alt="Whatsapp"
                      style={{ margin: '0px 2px', display: 'inline-block' }}
                    />
                  </a>
                )}
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
