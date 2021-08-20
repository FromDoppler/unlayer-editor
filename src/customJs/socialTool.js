// eslint-disable-next-line no-undef
unlayer.registerPropertyEditor({
  name: 'facebook',
  layout: 'bottom',
  // eslint-disable-next-line no-undef
  Widget: unlayer.createWidget({
    render(value) {
      return `
        <div>
          <input class="facebook" value=${value} />
          <img alt="Facebook"
              src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_1-facebook-24.png" />
        </div>
      `;
    },
    mount(node, value, updateValue) {
      var input = node.getElementsByClassName('facebook')[0];
      input.onchange = function (event) {
        updateValue(event.target.value);
      };
    },
  }),
});

// eslint-disable-next-line no-undef
unlayer.registerPropertyEditor({
  name: 'twitter',
  layout: 'bottom',
  // eslint-disable-next-line no-undef
  Widget: unlayer.createWidget({
    render(value) {
      return `
        <div>
          <input class="color-value" value=${value} />
          <img alt="Twitter"
              src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_6-twitter-24.png" />
        </div>
      `;
    },
    mount(node, value, updateValue) {
      var input = node.getElementsByClassName('color-value')[0];
      input.onchange = function (event) {
        updateValue(event.target.value);
      };
    },
  }),
});

// eslint-disable-next-line no-undef
unlayer.registerPropertyEditor({
  name: 'linkedin',
  layout: 'bottom',
  // eslint-disable-next-line no-undef
  Widget: unlayer.createWidget({
    render(value) {
      return `
        <div>
          <input class="color-value" value=${value} />
          <img alt="Linkedin"
              src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_14-linkedin-24.png" />
        </div>
      `;
    },
    mount(node, value, updateValue) {
      var input = node.getElementsByClassName('color-value')[0];
      input.onchange = function (event) {
        updateValue(event.target.value);
      };
    },
  }),
});

// eslint-disable-next-line no-undef
unlayer.registerTool({
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
    // eslint-disable-next-line no-undef
    Viewer: unlayer.createViewer({
      render(values) {
        return `
          <p align="center">
            <a style="text-decoration: none" href="${values.facebook}" target="_blank">
            <img alt="Facebook"
              src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_1-facebook-32.png" />
          </a>
          <a style="text-decoration: none" href="${values.twitter}" target="_blank">
            <img alt="Twitter"
              src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_6-twitter-32.png" />
          </a>
          <a style="text-decoration: none" href="${values.linkedin}" target="_blank">
            <img alt="Linkedin"
              src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_14-linkedin-32.png" />
          </a>
          </p>
        `;
      },
    }),
    exporters: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      email: function () {},
    },
  },
});
