import { getAbandonedCartToolDefinition } from '.';
import { setLocale } from '../../localization';

const abandonedCartValueMock = {
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
};

describe(getAbandonedCartToolDefinition.name, () => {
  it('should set productGalleryValue from product gallery item selected', () => {
    setLocale('es-ES');

    prepareUnlayerGlobalObject();
    const result = getAbandonedCartToolDefinition();
    const htmlCart =
      '<div><div style="display:block;" role="container"><section style="width:40%;display:inline-block;margin-right:5%;vertical-align:top" data-testid="image-container"><a role="link" href="[[[DC:URL]]]" target="_blank" rel="noreferrer"><img style="width:100%;object-fit:contain;height:auto;padding:5px" src="https://cdn.fromdoppler.com/unlayer-editor/assets/cart_v2.svg" alt="product image"/></a></section><section style="display:inline-block;width:55%;vertical-align:top" data-testid="description-container"><span style="display:block;font-size:20px;font-family:inherit;font-weight:700">[[[DC:TITLE]]]</span><span style="display:block;font-family:inherit;font-size:20px;margin-top:15px;color:#64BF91">[[[DC:PRICE]]]</span><a style="display:block;font-size:15px;font-family:inherit;font-weight:700;color:#FFFFFF;background-color:rgb(109, 196, 151);text-decoration:none;border-style:solid solid solid solid;border-color:#CCCCCC #CCCCCC #CCCCCC #CCCCCC;border-width:0px 0px 0px 0px;border-radius:4px;width:100%;margin-top:15px;min-height:20px;padding:13px 0px;line-height:20px;text-align:center" role="link" href="[[[DC:URL]]]" target="_blank" rel="noreferrer">Comprar</a></section></div><div style="display:block;padding:5px;margin:10px" role="container"><section style="width:40%;display:inline-block;margin-right:5%;vertical-align:top" data-testid="image-container"><a role="link" href="[[[DC:URL]]]" target="_blank" rel="noreferrer"><img style="width:100%;object-fit:contain;height:auto;padding:5px" src="https://cdn.fromdoppler.com/unlayer-editor/assets/cart_v2.svg" alt="product image"/></a></section><section style="display:inline-block;width:55%;vertical-align:top" data-testid="description-container"><span style="display:block;font-size:20px;font-family:inherit;font-weight:700">[[[DC:TITLE]]]</span><span style="display:block;font-family:inherit;font-size:20px;margin-top:15px;color:#64BF91">[[[DC:PRICE]]]</span><a style="display:block;font-size:15px;font-family:inherit;font-weight:700;color:#FFFFFF;background-color:rgb(109, 196, 151);text-decoration:none;border-style:solid solid solid solid;border-color:#CCCCCC #CCCCCC #CCCCCC #CCCCCC;border-width:0px 0px 0px 0px;border-radius:4px;width:100%;margin-top:15px;min-height:20px;padding:13px 0px;line-height:20px;text-align:center" role="link" href="[[[DC:URL]]]" target="_blank" rel="noreferrer">Comprar</a></section></div></div>';
    const htmlCartTransformed =
      '<DynamicContent action="abandoned_cart" items="2"><div style="display:block;" role="container"><section style="width:40%;display:inline-block;margin-right:5%;vertical-align:top" data-testid="image-container"><a role="link" href="[[[DC:URL]]]" target="_blank" rel="noreferrer"><img style="width:100%;object-fit:contain;height:auto;padding:5px" src="https://cdn.fromdoppler.com/unlayer-editor/assets/cart_v2.svg" alt="product image"/></a></section><section style="display:inline-block;width:55%;vertical-align:top" data-testid="description-container"><span style="display:block;font-size:20px;font-family:inherit;font-weight:700">[[[DC:TITLE]]]</span><span style="display:block;font-family:inherit;font-size:20px;margin-top:15px;color:#64BF91">[[[DC:PRICE]]]</span><a style="display:block;font-size:15px;font-family:inherit;font-weight:700;color:#FFFFFF;background-color:rgb(109, 196, 151);text-decoration:none;border-style:solid solid solid solid;border-color:#CCCCCC #CCCCCC #CCCCCC #CCCCCC;border-width:0px 0px 0px 0px;border-radius:4px;width:100%;margin-top:15px;min-height:20px;padding:13px 0px;line-height:20px;text-align:center" role="link" href="[[[DC:URL]]]" target="_blank" rel="noreferrer">Comprar</a></section></div><div style="display:block;padding:5px;margin:10px" role="container"><section style="width:40%;display:inline-block;margin-right:5%;vertical-align:top" data-testid="image-container"><a role="link" href="[[[DC:URL]]]" target="_blank" rel="noreferrer"><img style="width:100%;object-fit:contain;height:auto;padding:5px" src="https://cdn.fromdoppler.com/unlayer-editor/assets/cart_v2.svg" alt="product image"/></a></section><section style="display:inline-block;width:55%;vertical-align:top" data-testid="description-container"><span style="display:block;font-size:20px;font-family:inherit;font-weight:700">[[[DC:TITLE]]]</span><span style="display:block;font-family:inherit;font-size:20px;margin-top:15px;color:#64BF91">[[[DC:PRICE]]]</span><a style="display:block;font-size:15px;font-family:inherit;font-weight:700;color:#FFFFFF;background-color:rgb(109, 196, 151);text-decoration:none;border-style:solid solid solid solid;border-color:#CCCCCC #CCCCCC #CCCCCC #CCCCCC;border-width:0px 0px 0px 0px;border-radius:4px;width:100%;margin-top:15px;min-height:20px;padding:13px 0px;line-height:20px;text-align:center" role="link" href="[[[DC:URL]]]" target="_blank" rel="noreferrer">Comprar</a></section></div></DynamicContent>';
    const transform = result.createDynamicContet(
      htmlCart,
      abandonedCartValueMock,
    );

    //console.log(transform)

    //Assert
    expect(transform).toBeDefined();
    expect(transform).toEqual(htmlCartTransformed);
  });
});

function prepareUnlayerGlobalObject() {
  window.unlayer = {
    setLocale: jest.fn(),
    setTranslations: jest.fn(),
  };
  return window.unlayer;
}
