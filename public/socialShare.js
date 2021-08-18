unlayer.registerTool({
  name: 'social_share_tool',
  label: 'Social Share',
  icon: 'fa-share',
  category: 'contents',
  type: 'whatever',
  values: {},
  options: {
    default: {
      title: null,
    },
    propiedades: {
      title: 'Propiedades',
      position: 1,
      options: {
        alineacion: {
          label: 'Alineación',
          defaultValue: 'center',
          widget: 'alignment',
        },
        tamanio: {
          label: 'Tamaño',
          defaultValue: 'Pequeño',
          widget: 'dropdown',
        },
      },
    },
  },
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        return `
          <div style="color: ${values.color};text-align: ${values.alineacion}">I am a custom tool.</div>
        `;
      },
    }),
    exporters: {
      email: function () {},
    },
  },
});
