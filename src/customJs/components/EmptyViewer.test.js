import { React } from '../unlayer-react';
import { render, screen } from '@testing-library/react';
import { EmptyViewer } from './EmptyViewer';

describe(EmptyViewer.name, () => {
  const rest = {
    isViewer: true,
    toolInfo: {
      icon: 'toolIconPath',
      label: 'toolLabel',
      name: 'toolName',
    },
  };

  it('should render the icon', async () => {
    render(<EmptyViewer values={undefined} {...rest} />);

    const img = screen.getByRole('img');
    expect(img).toBeDefined();
    expect(img.src).toContain(rest.toolInfo.icon);
    expect(img.alt).toEqual(rest.toolInfo.name);
  });

  it('must be render the label', async () => {
    render(<EmptyViewer values={undefined} {...rest} />);

    const span = await screen.findByText(rest.toolInfo.label);
    expect(span).toBeDefined();
  });

  it('should not be rendered when exporting', async () => {
    const rest = {
      isViewer: false,
      toolInfo: {
        icon: 'toolIconPath',
        label: 'toolLabel',
        name: 'toolName',
      },
    };

    const { container } = render(<EmptyViewer values={undefined} {...rest} />);

    expect(container.firstChild).toBeNull();
  });
});
