import { React } from '../../unlayer-react';
import { render, screen } from '@testing-library/react';
import { QrViewer } from './QrViewer';

describe(QrViewer.name, () => {
  it('should render the main container with default styles', async () => {
    const values = {
      backgroundColor: 'rgb(255, 255, 255)',
      qr: {
        qrValue: 'https://www.fromdoppler.com/',
        qrUrlImage: '',
      },
      _meta: {
        htmlID: 'qr',
      },
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
      qr: {
        qrValue: '',
        qrUrlImage: '',
      },
      _meta: {
        htmlID: 'qr',
      },
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

  it('should render the QR image', async () => {
    const values = {
      backgroundColor: 'rgb(255, 255, 255)',
      qr: {
        qrValue: 'https://www.fromdoppler.com/',
        qrUrlImage: 'https://www.fromdoppler.com/qr.jpg',
      },
      qrSize: 100,
      qrColor: 'black',
      _meta: {
        htmlID: 'qr',
      },
    };

    render(<QrViewer values={values} />);
    const img = screen.getByRole('img');

    expect(img.src).toEqual('https://www.fromdoppler.com/qr.jpg');
    expect(img.alt).toEqual('https://www.fromdoppler.com/');
  });
});
