import { React } from '../../unlayer-react';
import { render, screen } from '@testing-library/react';
import { SocialShareViewer } from './SocialShareViewer';

describe(SocialShareViewer.name, () => {
  const rest = {
    isViewer: true,
    toolInfo: {
      icon: 'toolIconPath',
      label: 'toolLabel',
      name: 'toolName',
    },
  };

  it('must be render the empty content for unselect social share options ', async () => {
    const values = {
      social_share_align_option: 'center',
      social_share_available: [],
      social_share_size: 'small',
    };

    render(<SocialShareViewer values={values} {...rest} />);
    const span = await screen.findByText(rest.toolInfo.label);
    expect(span).toBeDefined();

    const img = await screen.findByAltText(rest.toolInfo.name);
    expect(img).toBeDefined();
  });
});
