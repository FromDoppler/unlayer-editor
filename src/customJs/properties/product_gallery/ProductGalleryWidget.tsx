import { React } from '../../unlayer-react';
import { WidgetComponent } from '../../types';
import { ProductGalleryValue } from './ProductGalleryValue';
import { $t } from '../../localization';
import { getConfiguration } from '../../configuration';
import { requestDopplerApp } from '../../utils/dopplerAppBridge';
import { closePropertyEditorBar } from '../../utils/unlayer';

export const ProductGalleryWidget: WidgetComponent<ProductGalleryValue> = ({
  label,
  updateValue,
}) => {
  const searchProduct = () =>
    requestDopplerApp({
      action: 'searchProduct',
      callback: (result: ProductGalleryValue) => {
        updateValue(result);
        // Closing property editor right bar on selecting an item from products list is important
        // because otherwise the description HTML is not updated.
        closePropertyEditorBar();
      },
    });

  const {
    stores,
    dopplerExternalUrls: { integrations },
  } = getConfiguration();

  const noStores = !stores.length;

  return (
    <div className="blockbuilder-widget row">
      <div className="col-12">
        <div className="blockbuilder-widget-label">
          <label className="blockbuilder-label-primary">{label}</label>
          <div>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              disabled={noStores}
              onClick={searchProduct}
            >
              {$t('_dp.product_gallery_search_product')}
            </button>
          </div>
        </div>
        {noStores ? (
          <div className="blockbuilder-widget-hint">
            {$t('_dp.product_gallery_no_stores', {
              link: (chunk) => <a href={integrations}>{chunk}</a>,
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};
