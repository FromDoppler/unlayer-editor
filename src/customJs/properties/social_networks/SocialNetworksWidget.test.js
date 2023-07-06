import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { SocialNetworksWidget } from './SocialNetworksWidget';
import { SOCIAL_NETWORKS } from '../../constants';

// TODO: this is a shared code, make it a common helper
function prepareUnlayerGlobalObject() {
  window.unlayer = {
    setLocale: jest.fn(),
    setTranslations: jest.fn(),
  };
  return window.unlayer;
}

const unlayerPropertyProps = {
  data: {
    options: SOCIAL_NETWORKS,
  },
  value: ['facebook', 'linkedin', 'twitter', 'pinterest', 'whatsapp'],
};

describe('EnableSocialProperty', () => {
  it('must be render the option props configuration', async () => {
    prepareUnlayerGlobalObject();
    render(<SocialNetworksWidget {...unlayerPropertyProps} />);

    const socialSettings = SOCIAL_NETWORKS;
    let query = '';
    socialSettings.forEach((option, index) => {
      query += `(${option.name})${
        index < socialSettings.length - 1 ? '|' : ''
      }`;
    });
    const renderedProperties = await screen.findAllByText(new RegExp(query));
    expect(renderedProperties).toHaveLength(5);
  });
});
