unlayer.registerPropertyEditor({
  name: 'subscribe-editor',
  layout: 'bottom',
  Widget: unlayer.createWidget({
    render(value) {
      return `
        <input class="unsubscribe-link" value=${value} />
      `;
    },
    mount(node, value, updateValue) {
      var input = node.getElementsByClassName('unsubscribe-link')[0];
      input.onchange = function (event) {
        updateValue(event.target.value);
      };
    },
  }),
});

unlayer.registerTool({
  type: 'subscribe-tool',
  category: 'contents',
  label: 'Subscribe',
  icon: 'fa-bell',
  values: {},
  options: {
    default: {
      title: null,
    },
    link: {
      title: 'Link',
      position: 1,
      options: {
        unsubscribe: {
          label: 'Unsubscribe',
          defaultValue: 'www.unsubscribe.com',
          widget: 'subscribe-editor',
        },
      },
    },
  },
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        return `
          <p align="center">
            If you'd like to unsubscribe and stop receiving these emails
            <a target="_blank" href="${values.unsubscribe}">click here</a>.
          </p>
        `;
      },
    }),
    exporters: {
      email: function () {},
    },
  },
});
