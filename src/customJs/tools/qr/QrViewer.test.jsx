import { React } from '../../unlayer-react';
import { render, screen } from '@testing-library/react';
import { QrViewer } from './QrViewer';

jest.mock('qrious', () => {
  return (param) => {
    return {
      toDataURL: () => {
        return `data_image_${param.value}_${param.size}_${param.foreground}`;
      },
    };
  };
});

describe(QrViewer.name, () => {
  it('should render the main container with default styles', async () => {
    const values = {
      backgroundColor: 'rgb(255, 255, 255)',
      qrValue: 'https://www.fromdoppler.com/',
    };

    render(<QrViewer values={values} />);
    const container = await screen.findByRole('container');

    expect(container.style.backgroundColor).toEqual(values.backgroundColor);
    expect(container.style.display).toEqual('block');
    expect(container.style.width).toEqual('100%');
  });

  it('should render the main container with default styles', async () => {
    const values = {
      backgroundColor: 'rgb(255, 255, 255)',
      qrValue: 'https://www.fromdoppler.com/',
    };

    render(<QrViewer values={values} />);
    const container = await screen.findByRole('container');

    expect(container.style.backgroundColor).toEqual(values.backgroundColor);
    expect(container.style.display).toEqual('block');
    expect(container.style.width).toEqual('100%');
  });

  it('should render the empty content when qr value is undefined or blank', async () => {
    const values = {
      backgroundColor: 'rgb(255, 255, 255)',
      qrValue: '',
    };

    const rest = {
      isViewer: true,
      toolInfo: {
        icon: 'toolIconPath',
        label: 'toolLabel',
        name: 'toolName',
      },
    };

    render(<QrViewer values={values} {...rest} />);
    const span = await screen.findByText(rest.toolInfo.label);
    expect(span).toBeDefined();

    const img = await screen.findByAltText(rest.toolInfo.name);
    expect(img).toBeDefined();
  });

  it('should render the QR image with some styles', async () => {
    const values = {
      backgroundColor: 'rgb(255, 255, 255)',
      qrValue: 'https://www.fromdoppler.com/',
      qrSize: 100,
      qrColor: 'black',
    };

    render(<QrViewer values={values} />);
    const img = screen.getByRole('img');

    expect(img.src).toEqual(
      'http://localhost/data_image_https://www.fromdoppler.com/_100_black',
    );
    expect(img.alt).toEqual('https://www.fromdoppler.com/');
  });
});
