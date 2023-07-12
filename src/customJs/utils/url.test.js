import { React } from '../unlayer-react';
import { formatUrl } from './url';

describe(formatUrl.name, () => {
  it.each([
    { urlWithoutFormat: 'just_a_word', urlExpected: 'just_a_word' },
    { urlWithoutFormat: '/slash.com', urlExpected: '/slash.com' },
    {
      urlWithoutFormat: '/slash_without_dot',
      urlExpected: '/slash_without_dot',
    },
    { urlWithoutFormat: ':dot.com', urlExpected: ':dot.com' },
    { urlWithoutFormat: 'dot.com', urlExpected: 'https://dot.com' },
    { urlWithoutFormat: 'dot.com?', urlExpected: 'https://dot.com?' },
    { urlWithoutFormat: "dot.com'", urlExpected: "https://dot.com'" },
    { urlWithoutFormat: 'dot.cooooooom', urlExpected: 'https://dot.cooooooom' },
    { urlWithoutFormat: "'url", urlExpected: "'url" },
    { urlWithoutFormat: "'url.com", urlExpected: "'url.com" },
    {
      urlWithoutFormat: 'https://with_ssl.com',
      urlExpected: 'https://with_ssl.com',
    },
    { urlWithoutFormat: 'http://nossl.com', urlExpected: 'http://nossl.com' },
    { urlWithoutFormat: 'abc cde', urlExpected: 'abc cde' },
    { urlWithoutFormat: '   abc cde   ', urlExpected: 'abc cde' },
    {
      urlWithoutFormat: 'https://   abc cde   ',
      urlExpected: 'https://   abc cde',
    },
    { urlWithoutFormat: '   a.b   ', urlExpected: 'https://a.b' },
  ])(
    'must be return url formatted: $urlExpected',
    async ({ urlWithoutFormat, urlExpected }) => {
      const urlFormatted = formatUrl(urlWithoutFormat);
      expect(urlFormatted).toEqual(urlExpected);
    },
  );
});
