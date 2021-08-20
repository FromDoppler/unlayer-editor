unlayer.registerPropertyEditor({
  name: 'social_share_icons',
  Widget: unlayer.createWidget({
    render(value, updateValue){
      return `
        <div class="blockbuilder-widget-label mb-2"><label class="blockbuilder-label-primary"><div class=""><span class="has-value same-value">Tipo de íconos</span></div></label></div>
        <label style="display:block"><input type="radio" value="color" name="social_share_icons" class="social_share_icons" checked>
        Color</label>
        <label style="display:block"><input type="radio" value="grey" name="social_share_icons" class="social_share_icons">
        Grises</label>
        <label style="display:block"><input type="radio" value="black" name="social_share_icons" class="social_share_icons">
        Blanco y negro</label>
        <label style="display:block"><input type="radio" value="outlined" name="social_share_icons" class="social_share_icons">
        Borde</label>
      `;
    },
    mount(node, value, updateValue){
      var inputs = node.getElementsByClassName('social_share_icons');
      inputsArray = Array.from(inputs);

      inputsArray.forEach(function(input) {
        input.onchange = function(e){
          updateValue(e.target.value);
        }
      });
    
    },
  })
});

unlayer.registerPropertyEditor({
  name: 'social_share_networks',
  Widget: unlayer.createWidget({
    render(value, updateValue){
      return ``;
    },
    mount(node, value, updateValue){

    },
  })
});

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
        social_share_align: {
          label: 'Alineación',
          defaultValue: 'center',
          widget: 'alignment',
        },
        social_share_size: {
          label: 'Tamaño',
          defaultValue: 'normal',
          widget: 'dropdown',
        },
        social_share_icon: {
          label: 'Iconos',
          defaultValue: 'color',
          widget: 'social_share_icons'
        },
      },
    },
    social_share_networks: {
      title: 'Redes sociales',
      position: 2,
      options: {
        social_share_facebook: {
          label: 'Facebook',
          defaultValue: true,
          widget: 'toggle'
        },
        social_share_twitter: {
          label: 'Twitter',
          defaultValue: true,
          widget: 'toggle'
        },
        social_share_pinterest: {
          label: 'Pinterest',
          defaultValue: true,
          widget: 'toggle'
        },
        social_share_linkedin: {
          label: 'Linkedin',
          defaultValue: true,
          widget: 'toggle'
        },
        social_share_whatsapp: {
          label: 'Whatsapp',
          defaultValue: true,
          widget: 'toggle'
        },
      }
    }
  },
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        var social_share_size = '90';

        if (values.social_share_size === 'normal') {
          social_share_size = '90';
        } else 
        if (values.social_share_size === 'small') {
          social_share_size = '70';
        } else 
        if (values.social_share_size === 'big') {
          social_share_size = '120';
        }
        
        function social_share_select(toggle, network){
          if (toggle){
            return `<td id="${network}" style="display: inline-block; padding-right: 5px; padding-top: 5px; line-height: 0px;" valign="middle">
                  <a href="#" target="_blank">
                    <img width="${social_share_size}" src="https://app2.dopplerfiles.com/MSEditor/images/${values.social_share_icon}_big_${network}_en.png" alt="${network}">
                  </a>
                </td>`;
          } else {
            return `<td></td>`;
          }
        }

        return `
          <div style="text-align: ${values.social_share_align}">
            <table cellpadding="0" cellspacing="0" border="0" style="display:inline-block">
              <tr>
                ${social_share_select(values.social_share_twitter, 'twitter')}
                ${social_share_select(values.social_share_pinterest, 'pinterest')}
                ${social_share_select(values.social_share_linkedin, 'linkedin')}
                ${social_share_select(values.social_share_facebook, 'facebook')}
                ${social_share_select(values.social_share_whatsapp, 'whatsapp')}
              </tr>
            </table>
          </div>
        `;
      },
    }),
    exporters: {
      email: function () {},
    },
  },
});
