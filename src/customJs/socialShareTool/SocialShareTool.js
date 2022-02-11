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
                  <a href="[[[$share_vo_facebook]]]" target="_blank">
                    <img
                      width={values.social_share_size}
                      src="https://app2.dopplerfiles.com/MSEditor/images/color_big_facebook_en.png"
                      alt="facebook"
                      style={{ margin: '0px 2px', display: 'inline-block' }}
                    />
                  </a>
                )}
                {values.social_share_network_linkedin && (
                  <a href="[[[$share_vo_linkedin]]]" target="_blank">
                    <img
                      width={values.social_share_size}
                      src="https://app2.dopplerfiles.com/MSEditor/images/color_big_linkedin_en.png"
                      alt="linkedin"
                      style={{ margin: '0px 2px', display: 'inline-block' }}
                    />
                  </a>
                )}
                {values.social_share_network_twitter && (
                  <a href="[[[$share_vo_twitter]]]" target="_blank">
                    <img
                      width={values.social_share_size}
                      src="https://app2.dopplerfiles.com/MSEditor/images/color_big_twitter_en.png"
                      alt="twitter"
                      style={{ margin: '0px 2px', display: 'inline-block' }}
                    />
                  </a>
                )}
                {values.social_share_network_pinterest && (
                  <a href="[[[$share_vo_pinterest]]]" target="_blank">
                    <img
                      width={values.social_share_size}
                      src="https://app2.dopplerfiles.com/MSEditor/images/color_big_pinterest_en.png"
                      alt="pinterest"
                      style={{ margin: '0px 2px', display: 'inline-block' }}
                    />
                  </a>
                )}
                {values.social_share_network_whatsapp && (
                  <a href="[[[$share_vo_whatsapp]]]" target="_blank">
                    <img
                      width={values.social_share_size}
                      src="https://app2.dopplerfiles.com/MSEditor/images/color_big_whatsapp_en.png"
                      alt="whatsapp"
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
