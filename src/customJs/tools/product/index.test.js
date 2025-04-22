import { getProductToolDefinition } from '.';
import { setLocale } from '../../localization';

const dynamicValueMock = {
  structure: 2,
  layout: '00_horizontal',
  imageShown: true,
  titleShown: true,
  titleFontWeight: 700,
  titleFontSize: '24px',
  priceShown: true,

  priceFontSize: '24px',
  priceColor: '#64BF91',
  priceFontWeight: 700,

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
  reference: 'VT-118558',
};

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
    productUrl: 'https://bici.com/test',
    imageUrl: 'https://bici.com/test.jpg',
    title: 'Bici montain bike 29 cambios',
    defaultPriceText: '$ 5,000.00',
    discountText: '10% OFF!!!',
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
        ...defaultProductGalleryValue,
        discountPriceText: '$ 3,000.00',
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

  it('should transform html description to text from product gallery item selected', () => {
    setLocale('es-ES');

    prepareUnlayerGlobalObject();
    const result = getProductToolDefinition();

    const transform = result.transformer(productGalleryValueMock, {
      name: 'productGallery',
      value: {
        ...defaultProductGalleryValue,
        descriptionHtml:
          '<p>Una <strong>bici</strong> de montaña</p><img src="img.jpg" alt="a test">',
      },
    });
    // Assert
    expect(transform).toBeDefined();
    expect(transform.descriptionHtml).toEqual('Una bici de montaña');
  });

  it('should include all info options when productType is dynamic', () => {
    const definition = getProductToolDefinition('dynamic');

    expect(definition?.options.info).toBeDefined();

    const infoOptions = definition?.options.info.options;

    expect(infoOptions.infoShown).toBeDefined();
    expect(infoOptions.infoIsDynamic).toBeDefined();
    expect(infoOptions.infoHtml).toBeDefined();
    expect(infoOptions.infoFont).toBeDefined();
    expect(infoOptions.infoFontWeight).toBeDefined();
    expect(infoOptions.infoFontSize).toBeDefined();
    expect(infoOptions.infoColor).toBeDefined();
    expect(infoOptions.reference).toBeDefined();
  });

  it('should NOT include info options when productType is undefined (defaults to static)', () => {
    const definition = getProductToolDefinition();
    expect(definition?.options.info).toBeUndefined();
  });

  it('should transform a product into a dynamic one by adding action, items, and reference', () => {
    setLocale('es-ES');

    prepareUnlayerGlobalObject();
    const result = getProductToolDefinition('dynamic');
    const dynamicValueMock2 = {
      ...dynamicValueMock,
    };

    const htmlRecommended =
      '<div style="display:block;padding:5px;margin:10px" role="container"><div><section style="width:100%;display:block;margin-right:0%;vertical-align:top" data-testid="image-container"><img style="width:100%;object-fit:contain;height:auto;padding:5px" src="https://s3.amazonaws.com/unroll-images-production/projects%2F6553%2F1604576441796-339575" alt="product image" data-dc-type="DC:IMAGE"/></section><section style="display:block;width:100%;vertical-align:top" data-testid="description-container"><span style="display:block;font-size:20px;font-family:inherit;font-weight:700" data-dc-type="DC:TITLE">Product!</span><span style="display:block;font-family:inherit;font-size:12px" data-dc-type="DC:DESCRIPTION"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span><span style="display:block;font-size:12px;font-family:inherit" data-dc-type="DC:INFO">Rating: 4.6 | Para 1 o 2 personas</span><span style="display:block;font-family:inherit;margin-top:15px;flex-direction:column" data-testid="prices-container"><span style="display:block;text-decoration:line-through;margin-right:20px;font-size:20px;color:#999" data-dc-type="DC:PRICE">$ 50.00</span><span style="display:block;font-size:20px;color:#64BF91" data-dc-type="DC:PRICE_DISCOUNT">$ 1.00</span></span><span style="display:block;font-family:inherit;font-size:16px" data-dc-type="DC:DISCOUNT">20%</span><a style="display:block;font-size:15px;font-family:inherit;font-weight:700;color:#FFFFFF;background-color:rgb(109, 196, 151);text-decoration:none;border-style:solid solid solid solid;border-color:#CCCCCC #CCCCCC #CCCCCC #CCCCCC;border-width:0px 0px 0px 0px;border-radius:4px;width:100%;padding:13px 0px 13px;margin:15px 0px 0px;min-height:20px;line-height:20px;text-align:center" role="link" href="https://www.google.com" target="_blank" rel="noreferrer">Comprar</a></section></div></div>';
    const htmlRecommendedTransformed =
      '<DynamicContent action="refresh_product" items="1" reference="VT-118558" style="display:block;padding:5px;margin:10px" role="container"><div><section style="width:100%;display:block;margin-right:0%;vertical-align:top" data-testid="image-container"><img style="width:100%;object-fit:contain;height:auto;padding:5px" src="https://s3.amazonaws.com/unroll-images-production/projects%2F6553%2F1604576441796-339575" alt="product image" data-dc-type="DC:IMAGE"/></section><section style="display:block;width:100%;vertical-align:top" data-testid="description-container"><span style="display:block;font-size:20px;font-family:inherit;font-weight:700" data-dc-type="DC:TITLE">Product!</span><span style="display:block;font-family:inherit;font-size:12px" data-dc-type="DC:DESCRIPTION"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span><span style="display:block;font-size:12px;font-family:inherit" data-dc-type="DC:INFO">Rating: 4.6 | Para 1 o 2 personas</span><span style="display:block;font-family:inherit;margin-top:15px;flex-direction:column" data-testid="prices-container"><span style="display:block;text-decoration:line-through;margin-right:20px;font-size:20px;color:#999" data-dc-type="DC:PRICE">$ 50.00</span><span style="display:block;font-size:20px;color:#64BF91" data-dc-type="DC:PRICE_DISCOUNT">$ 1.00</span></span><span style="display:block;font-family:inherit;font-size:16px" data-dc-type="DC:DISCOUNT">20%</span><a style="display:block;font-size:15px;font-family:inherit;font-weight:700;color:#FFFFFF;background-color:rgb(109, 196, 151);text-decoration:none;border-style:solid solid solid solid;border-color:#CCCCCC #CCCCCC #CCCCCC #CCCCCC;border-width:0px 0px 0px 0px;border-radius:4px;width:100%;padding:13px 0px 13px;margin:15px 0px 0px;min-height:20px;line-height:20px;text-align:center" role="link" href="https://www.google.com" target="_blank" rel="noreferrer">Comprar</a></section></div></DynamicContent>';

    const transform = result.createDynamicContet(
      htmlRecommended,
      dynamicValueMock2,
    );

    //Assert
    expect(transform).toBeDefined();
    expect(transform).toEqual(htmlRecommendedTransformed);
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
