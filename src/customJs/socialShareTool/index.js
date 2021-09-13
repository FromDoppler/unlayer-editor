const React = window.unlayer.React;
import ReactDOMServer from 'react-dom/server';

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
                  <a href="#" target="_blank">
                    <img
                      width={values.social_share_size}
                      src="https://app2.dopplerfiles.com/MSEditor/images/color_big_facebook_en.png"
                      alt="facebook"
                      style={{ margin: '0px 2px', display: 'inline-block' }}
                    />
                  </a>
                )}
                {values.social_share_network_linkedin && (
                  <a href="#" target="_blank">
                    <img
                      width={values.social_share_size}
                      src="https://app2.dopplerfiles.com/MSEditor/images/color_big_linkedin_en.png"
                      alt="linkedin"
                      style={{ margin: '0px 2px', display: 'inline-block' }}
                    />
                  </a>
                )}
                {values.social_share_network_twitter && (
                  <a href="#" target="_blank">
                    <img
                      width={values.social_share_size}
                      src="https://app2.dopplerfiles.com/MSEditor/images/color_big_twitter_en.png"
                      alt="twitter"
                      style={{ margin: '0px 2px', display: 'inline-block' }}
                    />
                  </a>
                )}
                {values.social_share_network_pinterest && (
                  <a href="#" target="_blank">
                    <img
                      width={values.social_share_size}
                      src="https://app2.dopplerfiles.com/MSEditor/images/color_big_pinterest_en.png"
                      alt="pinterest"
                      style={{ margin: '0px 2px', display: 'inline-block' }}
                    />
                  </a>
                )}
                {values.social_share_network_whatsapp && (
                  <a href="#" target="_blank">
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

SocialShareTool.PropTypes = {
  values: {
    sizeSocialTool: PropTypes.string,
  },
};

export const socialShareToolConfig = {
  name: 'social_share_tool',
  label: 'Social Share',
  icon: 'fa-share-alt',
  category: 'contents',
  type: 'whatever',
  values: {},
  options: {
    default: {
      title: null,
    },
    social_share_size: {
      title: 'Tamaño',
      position: 1,
      options: {
        social_share_size: {
          defaultValue: '90',
          widget: 'dropdown',
          data: {
            options: [
              { label: 'Normal', value: '90' },
              { label: 'Pequeño', value: '70' },
              { label: 'Grande', value: '120' },
            ],
          },
        },
      },
    },
    social_share_network: {
      title: 'Redes',
      position: 2,
      options: {
        social_share_network_facebook: {
          label: 'Facebook',
          defaultValue: true,
          widget: 'toggle',
        },
        social_share_network_linkedin: {
          label: 'Linkedin',
          defaultValue: true,
          widget: 'toggle',
        },
        social_share_network_twitter: {
          label: 'Twitter',
          defaultValue: true,
          widget: 'toggle',
        },
        social_share_network_pinterest: {
          label: 'Pinterest',
          defaultValue: true,
          widget: 'toggle',
        },
        social_share_network_whatsapp: {
          label: 'Whatsapp',
          defaultValue: true,
          widget: 'toggle',
        },
      },
    },
    social_share_align: {
      title: 'Alineación',
      position: 3,
      options: {
        social_share_align_option: {
          label: 'Alineación',
          defaultValue: 'center',
          widget: 'alignment',
        },
      },
    },
  },
  renderer: {
    Viewer: SocialShareTool,
    exporters: {
      email: function (values) {
        return ReactDOMServer.renderToStaticMarkup(
          <SocialShareTool values={values} />,
        );
      },
    },
  },
};
