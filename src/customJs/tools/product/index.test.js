import { getProductToolDefinition } from '.';
import { setLocale } from '../../localization';

const productGalleryValueMock = {
  productGallery: {
    productUrl: 'https://www.google.com',
    imageUrl: 'https://webappint.fromdoppler.net/images/login-en.png',
    title: 'Product!',
    defaultPriceText: '$ 50.00',
    discountPriceText: '$ 1.00',
    discountText: '20%',
    descriptionHtml: '<p>The <b>best</b> product!<p>',
  },
  layout: '00_horizontal',
  imageShown: true,
  titleShown: true,
  titleText: 'Escribe un titulo',
  titleFontWeight: 700,
  titleFontSize: '24px',
  pricesShown: true,
  pricesDefaultPriceShown: true,
  pricesDefaultPriceText: '$10.000',
  pricesDefaultPriceFontSize: '24px',
  pricesDefaultPriceColor: '#64BF91',
  pricesDiscountPriceShown: false,
  pricesDiscountPriceText: '$8.000',
  pricesDiscountPriceFontSize: '24px',
  pricesDiscountPriceColor: '#64BF91',
  discountShown: false,
  discountText: '20% OFF',
  discountFontSize: '16px',
  descriptionShown: false,
  descriptionHtml: '',
  descriptionFontSize: '12px',
  buttonShown: true,
  buttonText: 'Comprar',
  buttonFontWeight: 700,
  buttonFontSize: '15px',
  buttonColors: {
    color: '#FFFFFF',
    backgroundColor: 'rgb(109, 196, 151)',
  },
  buttonAutoWith: {
    autoWidth: true,
    width: '100%',
  },
  buttonBorder: {
    borderTopWidth: '0px',
    borderTopStyle: 'solid',
    borderTopColor: '#CCCCCC',
    borderLeftWidth: '0px',
    borderLeftStyle: 'solid',
    borderLeftColor: '#CCCCCC',
    borderRightWidth: '0px',
    borderRightStyle: 'solid',
    borderRightColor: '#CCCCCC',
    borderBottomWidth: '0px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#CCCCCC',
  },
  buttonBorderRadius: '4px',
};

describe(getProductToolDefinition.name, () => {
  const defaultProductGalleryValue = {
    roductUrl: 'https://bici.com/test',
    imageUrl: 'https://bici.com/test.jpg',
    title: 'Bici montain bike 29 cambios',
    defaultPriceText: '$ 5,000.00',
    discountText: '10%',
    descriptionHtml: 'Una bici de montaña',
  };

  const GREYCOLOR = '#999';
  const GREENCOLOR = '#64BF91';

  it('should set productGalleryValue from product gallery item selected', () => {
    setLocale('es-ES');

    prepareUnlayerGlobalObject();
    const result = getProductToolDefinition();

    const transform = result.transformer(productGalleryValueMock, {
      name: 'productGallery',
      value: {
        productUrl: 'https://bici.com/test',
        imageUrl: 'https://bici.com/test.jpg',
        title: 'Bici montain bike 29 cambios',
        defaultPriceText: '$ 5,000.00',
        discountPriceText: '$ 3,000.00',
        discountText: '10% OFF!!!',
        descriptionHtml: 'Una bici de montaña',
      },
    });
    // Assert
    expect(transform).toBeDefined();
    expect(transform.titleText).toEqual('Bici montain bike 29 cambios');
    expect(transform.pricesDefaultPriceText).toEqual('$ 5,000.00');
    expect(transform.pricesDefaultPriceColor).toEqual(GREYCOLOR);
    expect(transform.pricesDiscountPriceShown).toEqual(true);
    expect(transform.pricesDiscountPriceText).toEqual('$ 3,000.00');
    expect(transform.pricesDiscountPriceColor).toEqual(GREENCOLOR);
    expect(transform.descriptionShown).toEqual(true);
    expect(transform.descriptionHtml).toEqual('Una bici de montaña');
    expect(transform.discountShown).toEqual(true);
    expect(transform.discountText).toEqual('10% OFF!!!');
    expect(transform.productUrl).toEqual('https://bici.com/test');
    expect(transform.image.url).toEqual('https://bici.com/test.jpg');
  });

  it.each([
    {
      discountPriceText: '$ 1.00',
      expectValue: {
        pricesDiscountPriceShown: true,
        pricesDefaultPriceColor: GREYCOLOR,
      },
    },
    {
      discountPriceText: '$ 1',
      expectValue: {
        pricesDiscountPriceShown: true,
        pricesDefaultPriceColor: GREYCOLOR,
      },
    },
    {
      discountPriceText: 'U$ 1.00',
      expectValue: {
        pricesDiscountPriceShown: true,
        pricesDefaultPriceColor: GREYCOLOR,
      },
    },
    {
      discountPriceText: '$ 0.50',
      expectValue: {
        pricesDiscountPriceShown: true,
        pricesDefaultPriceColor: GREYCOLOR,
      },
    },
    {
      discountPriceText: '$ 0.001',
      expectValue: {
        pricesDiscountPriceShown: true,
        pricesDefaultPriceColor: GREYCOLOR,
      },
    },
    {
      discountPriceText: '$ 0.00',
      expectValue: {
        pricesDiscountPriceShown: false,
        pricesDefaultPriceColor: GREENCOLOR,
      },
    },
    {
      discountPriceText: '$ 0',
      expectValue: {
        pricesDiscountPriceShown: false,
        pricesDefaultPriceColor: GREENCOLOR,
      },
    },
    {
      discountPriceText: '0',
      expectValue: {
        pricesDiscountPriceShown: false,
        pricesDefaultPriceColor: GREENCOLOR,
      },
    },
    {
      discountPriceText: '',
      expectValue: {
        pricesDiscountPriceShown: false,
        pricesDefaultPriceColor: GREENCOLOR,
      },
    },
    {
      discountPriceText: '$50.00',
      expectValue: {
        pricesDiscountPriceShown: false,
        pricesDefaultPriceColor: GREENCOLOR,
      },
    },
    {
      discountPriceText: '$',
      expectValue: {
        pricesDiscountPriceShown: false,
        pricesDefaultPriceColor: GREENCOLOR,
      },
    },
    {
      discountPriceText: 'money 1',
      expectValue: {
        pricesDiscountPriceShown: true,
        pricesDefaultPriceColor: GREYCOLOR,
      },
    },
    {
      discountPriceText: 'money money',
      expectValue: {
        pricesDiscountPriceShown: false,
        pricesDefaultPriceColor: GREENCOLOR,
      },
    },
    {
      discountPriceText: 'U $ 5.00',
      expectValue: {
        pricesDiscountPriceShown: false,
        pricesDefaultPriceColor: GREENCOLOR,
      },
    },
    {
      discountPriceText: '  ',
      expectValue: {
        pricesDiscountPriceShown: false,
        pricesDefaultPriceColor: GREENCOLOR,
      },
    },
  ])(
    `should transform discountPriceText the "$discountPriceText" and the "pricesDiscountPriceShown" to be "$expectValue.pricesDiscountPriceShown"`,
    ({ discountPriceText, expectValue }) => {
      // Arrange
      const result = getProductToolDefinition();
      const transform = result.transformer(productGalleryValueMock, {
        name: 'productGallery',
        value: {
          ...defaultProductGalleryValue,
          discountPriceText: discountPriceText,
        },
      });

      // Assert
      expect(transform).toBeDefined();
      expect(transform.pricesDiscountPriceShown).toEqual(
        expectValue.pricesDiscountPriceShown,
      );
      expect(transform.pricesDefaultPriceColor).toEqual(
        expectValue.pricesDefaultPriceColor,
      );
    },
  );
});

function prepareUnlayerGlobalObject() {
  window.unlayer = {
    setLocale: jest.fn(),
    setTranslations: jest.fn(),
  };
  return window.unlayer;
}
