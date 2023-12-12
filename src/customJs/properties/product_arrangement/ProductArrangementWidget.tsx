import { React } from '../../unlayer-react';
import { WidgetComponent } from '../../types';
import { ProductArrangement } from '../../tools/product/types';
import { ASSETS_BASE_URL } from '../../constants';

export const ProductArrangementWidget: WidgetComponent<ProductArrangement> = ({
  updateValue,
}) => {
  const layouts: readonly ProductArrangement[] = [
    '01_layout',
    '02_layout',
    '03_layout',
    '04_layout',
    '05_layout',
  ];
  const btnStyle = {
    backgroundColor: '#FFF',
    border: 'none',
    width: '100px',
    height: '100px',
    margin: '5px',
  };

  const containerStyle = {
    height: '150px',
    overflowX: 'auto',
    display: 'flex',
  } as const;

  return (
    <div className="blockbuilder-widget row">
      <div className="col-12">
        <div className="blockbuilder-widget-label" style={containerStyle}>
          <div style={{ display: 'flex' }} role="container">
            {layouts.map((x) => (
              <button
                key={x}
                type="button"
                style={btnStyle}
                onClick={() => updateValue(x)}
              >
                <img
                  src={`${ASSETS_BASE_URL}/product_layout/${x}.svg`}
                  alt={x}
                  width="100"
                  height="100"
                ></img>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
