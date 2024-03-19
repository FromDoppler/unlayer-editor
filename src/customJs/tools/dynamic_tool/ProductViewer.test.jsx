import { React } from '../../unlayer-react';
import { render, screen } from '@testing-library/react';
import { ProductViewer } from './ProductViewer';
import { setLocale } from '../../localization';

describe(ProductViewer.name, () => {
  const rest = {
    toolInfo: {
      icon: 'https://cdn.fromdoppler.com/unlayer-editor/assets/cart_v3.svg',
    },
  };
  setLocale('es-ES');

  it('should render the main container with horizontal layout', async () => {
    const values = {
      backgroundColor: 'rgb(255, 255, 255)',
      layout: '00_horizontal',
      imageShown: true,
    };

    render(<ProductViewer values={values} {...rest} />);
    const container = await screen.findByRole('container');
    expect(container.style.backgroundColor).toEqual(values.backgroundColor);
    expect(container.style.display).toEqual('block');
    const imageContainer = screen.getByTestId('image-container');
    expect(imageContainer.style.display).toEqual('inline-block');
    expect(imageContainer.style.width).toEqual('40%');
    const descriptionContainer = screen.getByTestId('description-container');
    expect(descriptionContainer.style.display).toEqual('inline-block');
    expect(descriptionContainer.style.width).toEqual('55%');
  });

  it('should render the main container with vertical layout', async () => {
    const values = {
      backgroundColor: 'rgb(255, 255, 255)',
      layout: '01_vertical',
      imageShown: true,
    };

    render(<ProductViewer values={values} {...rest} />);
    const imageContainer = screen.getByTestId('image-container');
    expect(imageContainer.style.display).toEqual('block');
    expect(imageContainer.style.width).toEqual('100%');
    const descriptionContainer = screen.getByTestId('description-container');
    expect(descriptionContainer.style.display).toEqual('block');
    expect(descriptionContainer.style.width).toEqual('100%');
  });

  describe('image container', () => {
    it('should render image container with style display none when imageShown is false', async () => {
      const values = {
        imageShown: false,
      };

      render(<ProductViewer values={values} {...rest} />);
      const imageContainer = screen.getByTestId('image-container');
      expect(imageContainer.style.display).toEqual('none');
    });

    it('should render image container with full width when imageShown is true', async () => {
      const values = {
        imageShown: true,
      };

      render(<ProductViewer values={values} {...rest} />);
      const imageContainer = screen.getByTestId('image-container');
      expect(imageContainer.style.display).toEqual('block');
      expect(imageContainer.style.width).toEqual('100%');
    });

    it('should render image container with a width of 40% with a horizontal layout', async () => {
      const values = {
        imageShown: true,
        layout: '00_horizontal',
      };

      render(<ProductViewer values={values} {...rest} />);
      const imageContainer = screen.getByTestId('image-container');
      expect(imageContainer.style.width).toEqual('40%');
    });

    it('should render image with full width and default url', async () => {
      const values = {
        imageShown: true,
      };

      render(<ProductViewer values={values} {...rest} />);
      const image = screen.getByAltText('abandoned cart image');
      expect(image.style.objectFit).toEqual('contain');
      expect(image.style.height).toEqual('auto');
      expect(image.style.width).toEqual('100%');

      expect(image.src).toEqual(
        'https://cdn.fromdoppler.com/unlayer-editor/assets/cart_v3.svg',
      );
    });

    it('should render image with 80% width', async () => {
      const values = {
        imageShown: true,
        imageAutoWith: {
          autoWidth: false,
          width: '80%',
        },
      };

      render(<ProductViewer values={values} {...rest} />);
      const image = screen.getByAltText('abandoned cart image');
      expect(image.style.width).toEqual('80%');
    });
  });

  describe('description container', () => {
    it('should render description container full width for vertical layout', async () => {
      const values = {
        layout: '01_vertical',
      };

      render(<ProductViewer values={values} {...rest} />);
      const descriptionContainer = screen.getByTestId('description-container');
      expect(descriptionContainer.style.width).toEqual('100%');
    });

    it('should render description container with width 55% for horizontal layout', async () => {
      const values = {
        layout: '00_horizontal',
        imageShown: true,
      };

      render(<ProductViewer values={values} {...rest} />);
      const descriptionContainer = screen.getByTestId('description-container');
      expect(descriptionContainer.style.width).toEqual('55%');
    });

    it('should render description container full width for horizontal layout when imageShown is false', async () => {
      const values = {
        layout: '00_horizontal',
      };

      render(<ProductViewer values={values} {...rest} />);
      const descriptionContainer = screen.getByTestId('description-container');
      expect(descriptionContainer.style.width).toEqual('100%');
    });

    it('should render title with specific style', async () => {
      const values = {
        titleColor: 'rgb(51, 51, 51)',
        titleFontWeight: '700',
        titleFontSize: '22px',
        titleFont: {
          value: 'arial',
        },
      };

      render(<ProductViewer values={values} {...rest} />);
      const titleSpan = screen.getByText('[[[DC:TITLE]]]');
      expect(titleSpan.style.color).toEqual('rgb(51, 51, 51)');
      expect(titleSpan.style.fontWeight).toEqual('700');
      expect(titleSpan.style.fontSize).toEqual('22px');
      expect(titleSpan.style.fontFamily).toEqual('arial');
    });

    it('should render title with style display none when titleShown is false', async () => {
      const values = {
        titleText: 'titulo del producto',
        titleShown: false,
      };

      render(<ProductViewer values={values} {...rest} />);
      const titleSpan = screen.getByText('[[[DC:TITLE]]]');
      expect(titleSpan.style.display).toEqual('none');
    });

    it('should render quantity with specific style', async () => {
      const values = {
        quantityColor: 'rgb(51, 51, 51)',
        quantityFontWeight: '700',
        quantityFontSize: '22px',
        quantityFont: {
          value: 'arial',
        },
      };

      render(<ProductViewer values={values} {...rest} />);
      const quantitySpan = screen.getByText('Cantidad: [[[DC:QUANTITY]]]');
      expect(quantitySpan.style.color).toEqual('rgb(51, 51, 51)');
      expect(quantitySpan.style.fontWeight).toEqual('700');
      expect(quantitySpan.style.fontSize).toEqual('22px');
      expect(quantitySpan.style.fontFamily).toEqual('arial');
    });

    it('should render quantity with style display none when quantityShown is false', async () => {
      const values = {
        quantityShown: false,
      };

      render(<ProductViewer values={values} {...rest} />);
      const quantitySpan = screen.getByText('Cantidad: [[[DC:QUANTITY]]]');
      expect(quantitySpan.style.display).toEqual('none');
    });

    it('should render price span with specific style', async () => {
      const values = {
        priceShown: true,
        priceFontWeight: '700',
        priceFontSize: '14px',
        priceColor: 'rgb(51, 51, 51)',
        priceFont: {
          value: 'arial',
        },
      };

      render(<ProductViewer values={values} {...rest} />);
      const priceSpan = screen.getByText('[[[DC:PRICE]]]');
      expect(priceSpan.style.fontSize).toEqual('14px');
      expect(priceSpan.style.color).toEqual('rgb(51, 51, 51)');
      expect(priceSpan.style.fontWeight).toEqual('700');
      expect(priceSpan.style.fontFamily).toEqual('arial');
    });

    it('should render prices span with style display none when priceShown is false', async () => {
      const values = {
        priceShown: false,
      };

      render(<ProductViewer values={values} {...rest} />);
      const priceSpan = screen.getByText('[[[DC:PRICE]]]');
      expect(priceSpan.style.display).toEqual('none');
    });

    it('should render buy button with specific style', async () => {
      const values = {
        buttonShown: true,

        buttonFontWeight: 700,
        buttonFontSize: '14px',
        buttonColors: {
          color: 'rgb(51, 51, 51)',
          backgroundColor: 'rgb(109, 196, 151)',
        },
        buttonFont: {
          value: 'arial',
        },
        buttonBorder: {
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
          borderTopColor: '#CCCCCC',
          borderLeftWidth: '2px',
          borderLeftStyle: 'solid',
          borderLeftColor: '#CCCCCC',
          borderRightWidth: '3px',
          borderRightStyle: 'solid',
          borderRightColor: '#CCCCCC',
          borderBottomWidth: '4px',
          borderBottomStyle: 'solid',
          borderBottomColor: '#CCCCCC',
        },
        buttonBorderRadius: '5px',
        buttonAutoWith: {
          autoWidth: false,
          width: '50%',
        },
      };

      render(<ProductViewer values={values} {...rest} />);
      const buttton = await screen.findByRole('link');
      expect(buttton.style.display).toEqual('block');
      expect(buttton.style.fontSize).toEqual('14px');
      expect(buttton.style.color).toEqual('rgb(51, 51, 51)');
      expect(buttton.style.backgroundColor).toEqual('rgb(109, 196, 151)');
      expect(buttton.style.fontWeight).toEqual('700');
      expect(buttton.style.fontFamily).toEqual('arial');
      expect(buttton.style.borderStyle).toEqual('solid solid solid solid');
      expect(buttton.style.borderColor).toEqual(
        '#cccccc #cccccc #cccccc #cccccc',
      );
      expect(buttton.style.borderWidth).toEqual('1px 3px 4px 2px');
      expect(buttton.style.borderRadius).toEqual('5px');
      expect(buttton.style.width).toEqual('50%');
      // default styles values
      expect(buttton.style.textAlign).toEqual('center');
      expect(buttton.style.minHeight).toEqual('20px');
      expect(buttton.style.padding).toEqual('13px 0px');
      expect(buttton.style.lineHeight).toEqual('20px');
      expect(buttton.style.textDecoration).toEqual('none');
    });

    it('should render buy button with display none when buttonShown is false', async () => {
      const values = {
        buttonShown: false,
        buttonText: 'btnComprar',
      };

      render(<ProductViewer values={values} {...rest} />);
      const buttton = screen.getByText('btnComprar');
      expect(buttton.style.display).toEqual('none');
    });

    it('should render buy button with with width 100% when autoWidth is true', async () => {
      const values = {
        buttonShown: true,
        buttonAutoWith: {
          autoWidth: true,
        },
        buttonText: 'Comprar',
      };

      render(<ProductViewer values={values} {...rest} />);
      const button = await screen.findByRole('link');
      expect(button.style.width).toEqual('100%');
    });

    it('should render buy button with text setted by buttonText', async () => {
      const values = {
        buttonShown: true,
        buttonText: 'Comprar',
      };

      render(<ProductViewer values={values} {...rest} />);
      const button = screen.getByText('Comprar');
      expect(button).toBeDefined();
    });

    it('should render buy button with text setted by buttonText', async () => {
      const values = {
        buttonShown: true,
        buttonText: 'Comprar',
      };

      render(<ProductViewer values={values} {...rest} />);
      const button = screen.getByText('Comprar');
      expect(button).toBeDefined();
    });

    it('should render buy button with link dynamic url product', async () => {
      const values = {
        buttonShown: true,
        buttonText: 'Comprar',
      };
      /* NOTE: html add http://localhost/ when the link is a string */
      render(<ProductViewer values={values} {...rest} />);
      const button = screen.getByText('Comprar');
      expect(button.href).toEqual('http://localhost/[[[DC:URL]]]');
      expect(button.target).toEqual('_blank');
    });

    it('should render image with style width 100% when autoWidth is true', async () => {
      const values = {
        imageShown: true,
        imageAutoWith: {
          autoWidth: true,
        },
      };

      render(<ProductViewer values={values} {...rest} />);
      const img = screen.getByRole('img');
      expect(img.style.width).toEqual('100%');
    });

    it('should render cart item 2 times depends structure property', async () => {
      const values = {
        imageShown: true,
        structure: 2,
      };

      render(<ProductViewer values={values} {...rest} />);
      const titles = await screen.findAllByText('[[[DC:TITLE]]]');
      expect(titles).toHaveLength(2);

      const prices = await screen.findAllByText('[[[DC:PRICE]]]');
      expect(prices).toHaveLength(2);
    });

    it('should render cart item 3 times depends structure property', async () => {
      const values = {
        imageShown: true,
        structure: 3,
      };

      render(<ProductViewer values={values} {...rest} />);
      const titles = await screen.findAllByText('[[[DC:TITLE]]]');
      expect(titles).toHaveLength(3);

      const prices = await screen.findAllByText('[[[DC:PRICE]]]');
      expect(prices).toHaveLength(3);
    });

    it('should render 2 containers with inline-block display style for recommended tool type and structure with 2 items', async () => {
      const values = {
        structure: 2,
      };

      const restWithRecommendedType = {
        ...rest,
        toolInfo: {
          name: 'dynamic_recommended',
        },
      };

      render(<ProductViewer values={values} {...restWithRecommendedType} />);
      const containers = await screen.getAllByRole('container');
      expect(containers).toHaveLength(2);
      const container = containers[0];
      expect(container.style.display).toEqual('inline-block');
      expect(container.style.width).toEqual('45%');
    });
  });
});
