const React = window.unlayer.React;
import ReactDOMServer from 'react-dom/server';

export const createRenderer = (Component) => ({
  Viewer: Component,
  exporters: {
    web: function (values) {
      return ReactDOMServer.renderToStaticMarkup(<Component values={values} />);
    },
    email: function (values) {
      return ReactDOMServer.renderToStaticMarkup(<Component values={values} />);
    },
  },
});
