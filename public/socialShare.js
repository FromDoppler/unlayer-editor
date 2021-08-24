unlayer.registerTool({
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
    social_share_props: {
      title: 'Propiedades',
      position: 1,
      options: {
        social_share_size: {
          label: 'Tamaño',
          defaultValue: 'normal',
          widget: 'dropdown',
        },
      },
    },
  },
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        var social_share_size = '90';

        if (values.social_share_size === 'normal') {
          social_share_size = '90';
        } else if (values.social_share_size === 'small') {
          social_share_size = '70';
        } else if (values.social_share_size === 'big') {
          social_share_size = '120';
        }

        return `
          <div style="text-align: center">
            <table cellpadding="0" cellspacing="0" border="0" style="display:inline-block">
              <tr>
              <td id="facebook" style="display: inline-block; padding-right: 5px; padding-top: 5px; line-height: 0px;" valign="middle">
              <a href="#" target="_blank">
                <img width="${social_share_size}" src="https://app2.dopplerfiles.com/MSEditor/images/color_big_facebook_en.png" alt="facebook">
              </a>
            </td>
              <td id="linkedin" style="display: inline-block; padding-right: 5px; padding-top: 5px; line-height: 0px;" valign="middle">
              <a href="#" target="_blank">
                <img width="${social_share_size}" src="https://app2.dopplerfiles.com/MSEditor/images/color_big_linkedin_en.png" alt="linkedin">
              </a>
            </td>
              <td id="twitter" style="display: inline-block; padding-right: 5px; padding-top: 5px; line-height: 0px;" valign="middle">
              <a href="#" target="_blank">
                <img width="${social_share_size}" src="https://app2.dopplerfiles.com/MSEditor/images/color_big_twitter_en.png" alt="twitter">
              </a>
            </td>
              <td id="pinterest" style="display: inline-block; padding-right: 5px; padding-top: 5px; line-height: 0px;" valign="middle">
              <a href="#" target="_blank">
                <img width="${social_share_size}" src="https://app2.dopplerfiles.com/MSEditor/images/color_big_pinterest_en.png" alt="pinterest">
              </a>
            </td>
              <td id="whatsapp" style="display: inline-block; padding-right: 5px; padding-top: 5px; line-height: 0px;" valign="middle">
              <a href="#" target="_blank">
                <img width="${social_share_size}" src="https://app2.dopplerfiles.com/MSEditor/images/color_big_whatsapp_en.png" alt="whatsapp">
              </a>
            </td>
              </tr>
            </table>
          </div>
        `;
      },
    }),
    exporters: {
      email: function (values) {
        var social_share_size = '90';

        if (values.social_share_size === 'normal') {
          social_share_size = '90';
        } else if (values.social_share_size === 'small') {
          social_share_size = '70';
        } else if (values.social_share_size === 'big') {
          social_share_size = '120';
        }

        return `<div style="text-align: center">
        <table cellpadding="0" cellspacing="0" border="0" style="display:inline-block">
          <tr>
          <td id="facebook" style="display: inline-block; padding-right: 5px; padding-top: 5px; line-height: 0px;" valign="middle">
          <a href="#" target="_blank">
            <img width="${social_share_size}" src="https://app2.dopplerfiles.com/MSEditor/images/color_big_facebook_en.png" alt="facebook">
          </a>
        </td>
        <td id="linkedin" style="display: inline-block; padding-right: 5px; padding-top: 5px; line-height: 0px;" valign="middle">
              <a href="#" target="_blank">
                <img width="${social_share_size}" src="https://app2.dopplerfiles.com/MSEditor/images/color_big_linkedin_en.png" alt="linkedin">
              </a>
            </td>
              <td id="twitter" style="display: inline-block; padding-right: 5px; padding-top: 5px; line-height: 0px;" valign="middle">
              <a href="#" target="_blank">
                <img width="${social_share_size}" src="https://app2.dopplerfiles.com/MSEditor/images/color_big_twitter_en.png" alt="twitter">
              </a>
            </td>
              <td id="pinterest" style="display: inline-block; padding-right: 5px; padding-top: 5px; line-height: 0px;" valign="middle">
              <a href="#" target="_blank">
                <img width="${social_share_size}" src="https://app2.dopplerfiles.com/MSEditor/images/color_big_pinterest_en.png" alt="pinterest">
              </a>
            </td>
              <td id="whatsapp" style="display: inline-block; padding-right: 5px; padding-top: 5px; line-height: 0px;" valign="middle">
              <a href="#" target="_blank">
                <img width="${social_share_size}" src="https://app2.dopplerfiles.com/MSEditor/images/color_big_whatsapp_en.png" alt="whatsapp">
              </a>
            </td>
          </tr>
        </table>
      </div>`;
      },
    },
  },
});
