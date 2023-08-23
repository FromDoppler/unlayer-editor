import { React } from '../../unlayer-react';
import { WidgetComponent } from '../../types';
import { ProductGalleryValue } from './ProductGalleryValue';
import { $t } from '../../localization';
import { getConfiguration } from '../../configuration';
import { requestDopplerApp } from '../../utils/dopplerAppBridge';

export const ProductGalleryWidget: WidgetComponent<ProductGalleryValue> = ({
  label,
  updateValue,
}) => {
  const searchProduct = () =>
    requestDopplerApp({
      action: 'searchProduct',
      callback: updateValue,
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
