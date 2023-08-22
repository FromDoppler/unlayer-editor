import { React } from '../../unlayer-react';
import { WidgetComponent } from '../../types';
import { ProductGalleryValue } from './ProductGalleryValue';
import { $t } from '../../localization';
import { getConfiguration } from '../../configuration';

export const ProductGalleryWidget: WidgetComponent<ProductGalleryValue> = ({
  label,
  // TODO: use these values
  // value,
  // updateValue,
}) => {
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
