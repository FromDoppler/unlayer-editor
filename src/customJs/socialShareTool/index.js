const React = window.unlayer.React;
import ReactDOMServer from "react-dom/server";

import PropTypes from 'prop-types';

export const SocialShareTool = (props) => {
  const values = props.values;

  return (
            <div style={{ textAlign: 'center'}}>
              <table cellPadding="0" cellSpacing="0" border="0">
                <tr>
                { values.social_share_network_facebook && (
                  <td id="facebook" style={{ display: 'inline-block', paddingRight: '5px', paddingTop: '5px', lineHeight: '0'}} valign="middle">
                  <a href="#" target="_blank">
                    <img width={values.social_share_size} src="https://app2.dopplerfiles.com/MSEditor/images/color_big_facebook_en.png" alt="facebook" />
                  </a>
                </td>
                )}
                { values.social_share_network_linkedin && (
                  <td id="linkedin" style={{ display: 'inline-block', paddingRight: '5px', paddingTop: '5px', lineHeight: '0'}} valign="middle">
                <a href="#" target="_blank">
                  <img width={values.social_share_size} src="https://app2.dopplerfiles.com/MSEditor/images/color_big_linkedin_en.png" alt="linkedin" />
                </a>
              </td>
                )}
                { values.social_share_network_twitter && (
                  <td id="twitter" style={{ display: 'inline-block', paddingRight: '5px', paddingTop: '5px', lineHeight: '0'}} valign="middle">
                <a href="#" target="_blank">
                  <img width={values.social_share_size} src="https://app2.dopplerfiles.com/MSEditor/images/color_big_twitter_en.png" alt="twitter" />
                </a>
              </td>
                )}
                { values.social_share_network_pinterest && (
                  <td id="pinterest" style={{ display: 'inline-block', paddingRight: '5px', paddingTop: '5px', lineHeight: '0'}} valign="middle">
                <a href="#" target="_blank">
                  <img width={values.social_share_size} src="https://app2.dopplerfiles.com/MSEditor/images/color_big_pinterest_en.png" alt="pinterest" />
                </a>
              </td>
                )}
                { values.social_share_network_whatsapp && (
                <td id="whatsapp" style={{ display: 'inline-block', paddingRight: '5px', paddingTop: '5px', lineHeight: '0'}} valign="middle">
                <a href="#" target="_blank">
                  <img width={values.social_share_size} src="https://app2.dopplerfiles.com/MSEditor/images/color_big_whatsapp_en.png" alt="whatsapp" />
                </a>
              </td>
                )}
                </tr>
              </table>
            </div>
          );
};

SocialShareTool.PropTypes = {
values: {
  sizeSocialTool: PropTypes.string,
  }
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
        label: 'Tamaño',
        defaultValue: '90',
        widget: 'sizeSocialTool',
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
        widget: 'toggle'
      },
      social_share_network_linkedin: {
        label: 'Linkedin',
        defaultValue: true,
        widget: 'toggle'
      },
      social_share_network_twitter: {
        label: 'Twitter',
        defaultValue: true,
        widget: 'toggle'
      },
      social_share_network_pinterest: {
        label: 'Pinterest',
        defaultValue: true,
        widget: 'toggle'
      },
      social_share_network_whatsapp: {
        label: 'Whatsapp',
        defaultValue: true,
        widget: 'toggle'
      },
    }
  },

},
renderer: {
  Viewer: SocialShareTool,
  exporters: {
    email: function(values){
      return ReactDOMServer.renderToStaticMarkup(<SocialShareTool values={values}/>)
    },
  },
},
};
