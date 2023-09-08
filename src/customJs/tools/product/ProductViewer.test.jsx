import { React } from '../../unlayer-react';
import { render, screen } from '@testing-library/react';
import { ProductViewer } from './ProductViewer';

describe(ProductViewer.name, () => {
  it('should render the main container with horizontal layout', async () => {
    const values = {
      backgroundColor: 'rgb(255, 255, 255)',
      layout: '00_horizontal',
    };

    render(<ProductViewer values={values} />);
    const container = await screen.findByRole('container');
    expect(container.style.backgroundColor).toEqual(values.backgroundColor);
    expect(container.style.display).toEqual('flex');
    expect(container.style.flexDirection).toEqual('row');
  });

  it('should render the main container with vertical layout', async () => {
    const values = {
      backgroundColor: 'rgb(255, 255, 255)',
      layout: '01_vertical',
    };

    render(<ProductViewer values={values} />);
    const container = await screen.findByRole('container');
    expect(container.style.flexDirection).toEqual('column');
  });

  describe('image container', () => {
    it('should render image container with style display none when imageShown is false', async () => {
      const values = {
        imageShown: false,
      };

      render(<ProductViewer values={values} />);
      const imageContainer = screen.getByTestId('image-container');
      expect(imageContainer.style.display).toEqual('none');
    });

    it('should render image container when imageShown is true with full width', async () => {
      const values = {
        imageShown: true,
      };

      render(<ProductViewer values={values} />);
      const imageContainer = screen.getByTestId('image-container');
      expect(imageContainer.style.display).toEqual('flex');
      expect(imageContainer.style.justifyContent).toEqual('center');
      expect(imageContainer.style.width).toEqual('100%');
    });

    it('should render image container with width to 40% with horizontal layout ', async () => {
      const values = {
        imageShown: true,
        layout: '00_horizontal',
      };

      render(<ProductViewer values={values} />);
      const imageContainer = screen.getByTestId('image-container');
      expect(imageContainer.style.width).toEqual('40%');
    });

    it('should render image with full width and default url', async () => {
      const values = {
        imageShown: true,
      };

      render(<ProductViewer values={values} />);
      const image = screen.getByAltText('product image');
      expect(image.style.objectFit).toEqual('contain');
      expect(image.style.height).toEqual('auto');
      expect(image.style.width).toEqual('100%');

      expect(image.src).toEqual(
        'https://cdn.fromdoppler.com/unlayer-editor/assets/product_transparent.svg',
      );
    });

    it('should render image with 80% width', async () => {
      const values = {
        imageShown: true,
        image: {
          maxWidth: '80%',
        },
      };

      render(<ProductViewer values={values} />);
      const image = screen.getByAltText('product image');
      expect(image.style.width).toEqual('80%');
    });

    it('should render image with a specific src', async () => {
      const values = {
        imageShown: true,
        image: {
          url: 'https://my_image.png',
        },
      };

      render(<ProductViewer values={values} />);
      const image = screen.getByAltText('product image');
      expect(image.src).toEqual('https://my_image.png/');
    });
  });

  describe('description container', () => {
    it('should render description container full width for vertical layout ', async () => {
      const values = {
        layout: '01_vertical',
      };

      render(<ProductViewer values={values} />);
      const descriptionContainer = screen.getByTestId('description-container');
      expect(descriptionContainer.style.width).toEqual('100%');
    });

    it('should render description container with width 60% for horizontal layout ', async () => {
      const values = {
        layout: '00_horizontal',
        imageShown: true,
      };

      render(<ProductViewer values={values} />);
      const descriptionContainer = screen.getByTestId('description-container');
      expect(descriptionContainer.style.width).toEqual('60%');
    });

    it('should render description container full width for horizontal layout when imageShown is false', async () => {
      const values = {
        layout: '00_horizontal',
      };

      render(<ProductViewer values={values} />);
      const descriptionContainer = screen.getByTestId('description-container');
      expect(descriptionContainer.style.width).toEqual('100%');
    });

    it('should render title with specific style', async () => {
      const values = {
        titleText: 'titulo del producto',
        titleColor: 'rgb(51, 51, 51)',
        titleFontWeight: '700',
        titleFontSize: '22px',
        titleFont: {
          value: 'arial',
        },
      };

      render(<ProductViewer values={values} />);
      const titleSpan = screen.getByText(values.titleText);
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

      render(<ProductViewer values={values} />);
      const titleSpan = screen.getByText(values.titleText);
      expect(titleSpan.style.display).toEqual('none');
    });

    it('should render description with specific style', async () => {
      const values = {
        descriptionShown: true,
        descriptionHtml: 'product description',
        descriptionFont: {
          value: 'arial',
        },
        descriptionFontSize: '12px',
      };

      render(<ProductViewer values={values} />);
      const descriptionSpan = screen.getByText(values.descriptionHtml);
      expect(descriptionSpan.style.fontSize).toEqual('12px');
      expect(descriptionSpan.style.fontFamily).toEqual('arial');
      expect(descriptionSpan.style.display).toEqual('block');
    });

    it('should render description with style display none when descriptionShown is false', async () => {
      const values = {
        descriptionShown: false,
        descriptionHtml: 'product description',
      };

      render(<ProductViewer values={values} />);
      const descriptionSpan = screen.getByText(values.descriptionHtml);
      expect(descriptionSpan.style.display).toEqual('none');
    });

    it('should render prices container with specific style', async () => {
      const values = {
        pricesShown: true,
        pricesFontWeight: '700',
        pricesFont: {
          value: 'arial',
        },
      };

      render(<ProductViewer values={values} />);
      const pricesContainer = screen.getByTestId('prices-container');

      expect(pricesContainer.style.fontWeight).toEqual('700');
      expect(pricesContainer.style.fontFamily).toEqual('arial');
    });

    it('should render prices container with style display none when pricesShown is false', async () => {
      const values = {
        pricesShown: false,
      };

      render(<ProductViewer values={values} />);
      const pricesContainer = screen.getByTestId('prices-container');

      expect(pricesContainer.style.display).toEqual('none');
    });

    it('should render prices default with specific style', async () => {
      const values = {
        pricesDefaultPriceShown: true,
        pricesDefaultPriceText: '$10,000',
        pricesDefaultPriceFontSize: '14px',
        pricesDefaultPriceColor: 'rgb(51, 51, 51)',
      };

      render(<ProductViewer values={values} />);
      const pricesDefault = screen.getByText(values.pricesDefaultPriceText);

      expect(pricesDefault.style.fontSize).toEqual('14px');
      expect(pricesDefault.style.color).toEqual('rgb(51, 51, 51)');
    });

    it('should render prices default with line-through when prices discount is showed', async () => {
      const values = {
        pricesDefaultPriceShown: true,
        pricesDiscountPriceShown: true,
        pricesDefaultPriceText: '$10,000',
      };

      render(<ProductViewer values={values} />);
      const pricesDefault = screen.getByText(values.pricesDefaultPriceText);
      expect(pricesDefault.style.textDecoration).toEqual('line-through');
    });

    it('should render prices default with style display none when pricesDefaultPriceShown is false', async () => {
      const values = {
        pricesDefaultPriceShown: false,
        pricesDefaultPriceText: '$10,000',
      };

      render(<ProductViewer values={values} />);
      const pricesDefault = screen.getByText(values.pricesDefaultPriceText);
      expect(pricesDefault.style.display).toEqual('none');
    });

    it('should render prices discount with specific style', async () => {
      const values = {
        pricesDiscountPriceShown: true,
        pricesDiscountPriceText: '$8,000',
        pricesDiscountPriceFontSize: '14px',
        pricesDiscountPriceColor: 'rgb(51, 51, 51)',
      };

      render(<ProductViewer values={values} />);
      const pricesDiscount = screen.getByText(values.pricesDiscountPriceText);

      expect(pricesDiscount.style.fontSize).toEqual('14px');
      expect(pricesDiscount.style.color).toEqual('rgb(51, 51, 51)');
    });

    it('should render prices discount with style display none when pricesDiscountPriceShown is false', async () => {
      const values = {
        pricesDiscountPriceShown: false,
        pricesDiscountPriceText: '$8,000',
      };

      render(<ProductViewer values={values} />);
      const pricesDiscount = screen.getByText(values.pricesDiscountPriceText);
      expect(pricesDiscount.style.display).toEqual('none');
    });

    it('should render discount with specific style', async () => {
      const values = {
        discountShown: true,
        discountText: '10%',
        discountFontWeight: 700,
        discountFontSize: '14px',
        discountColor: 'rgb(51, 51, 51)',
        discountFont: {
          value: 'arial',
        },
      };

      render(<ProductViewer values={values} />);
      const discount = screen.getByText(values.discountText);
      expect(discount.style.display).toEqual('flex');
      expect(discount.style.fontSize).toEqual('14px');
      expect(discount.style.color).toEqual('rgb(51, 51, 51)');
      expect(discount.style.fontWeight).toEqual('700');
      expect(discount.style.fontFamily).toEqual('arial');
    });

    it('should render discount with display none when discountShown is false', async () => {
      const values = {
        discountShown: false,
        discountText: '10%',
      };

      render(<ProductViewer values={values} />);
      const discount = screen.getByText(values.discountText);
      expect(discount.style.display).toEqual('none');
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

      render(<ProductViewer values={values} />);
      const buttton = await screen.findByRole('link');
      expect(buttton.style.display).toEqual('flex');
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
      expect(buttton.style.justifyContent).toEqual('center');
      expect(buttton.style.minHeight).toEqual('47px');
      expect(buttton.style.padding).toEqual('13px 20px');
      expect(buttton.style.lineHeight).toEqual('20px');
      expect(buttton.style.textDecoration).toEqual('none');
    });

    it('should render buy button with display none when buttonShown is false', async () => {
      const values = {
        buttonShown: false,
        buttonText: 'btnComprar',
      };

      render(<ProductViewer values={values} />);
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

      render(<ProductViewer values={values} />);
      const button = await screen.findByRole('link');
      expect(button.style.width).toEqual('100%');
    });

    it('should render buy button with text setted by buttonText', async () => {
      const values = {
        buttonShown: true,
        buttonText: 'Comprar',
      };

      render(<ProductViewer values={values} />);
      const button = screen.getByText('Comprar');
      expect(button).toBeDefined();
    });

    it('should render buy button with text setted by buttonText', async () => {
      const values = {
        buttonShown: true,
        buttonText: 'Comprar',
      };

      render(<ProductViewer values={values} />);
      const button = screen.getByText('Comprar');
      expect(button).toBeDefined();
    });

    it('should render buy button with link setted by url product', async () => {
      const values = {
        buttonShown: true,
        productUrl: 'http://myproduct.com',
      };

      render(<ProductViewer values={values} />);
      const button = await screen.findByRole('link');
      expect(button.href).toEqual('http://myproduct.com/');
      expect(button.target).toEqual('_blank');
    });

    it('should render buy button with link # when url product is undefined', async () => {
      const values = {
        buttonShown: true,
      };

      render(<ProductViewer values={values} />);
      const button = await screen.findByRole('link');
      expect(button.href).toEqual('http://localhost/#');
    });

    it('should render image default', async () => {
      const values = {
        imageShown: true,
      };

      render(<ProductViewer values={values} />);
      const img = screen.getByRole('img');
      expect(img).toBeDefined();
      expect(img.src).toEqual(
        'https://cdn.fromdoppler.com/unlayer-editor/assets/product_transparent.svg',
      );
      expect(img.alt).toEqual('product image');
    });

    it('should render image with specific style', async () => {
      const values = {
        imageShown: true,
        image: {
          maxWidth: '50%',
        },
      };

      render(<ProductViewer values={values} />);
      const img = screen.getByRole('img');
      expect(img.style.width).toEqual('50%');
      // default styles values
      expect(img.style.objectFit).toEqual('contain');
      expect(img.style.height).toEqual('auto');
      expect(img.style.padding).toEqual('5px');
    });

    it('should render image with style width 100% when autoWidth is true', async () => {
      const values = {
        imageShown: true,
        image: {
          autoWidth: true,
        },
      };

      render(<ProductViewer values={values} />);
      const img = screen.getByRole('img');
      expect(img.style.width).toEqual('100%');
    });
  });
});
