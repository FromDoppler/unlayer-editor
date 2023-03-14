import { intl } from '../localization';

const React = window.unlayer.React;
import PropTypes from 'prop-types';

export const PayuButtonTool = (props) => {
  const { size, paymentURL, alignment } = props.values;
  const buttonImgWidth = size === 'small' ? 116 : size === 'medium' ? 145 : 182;

  return (
    <div align={alignment} role="container">
      <a role="link" href={paymentURL ? paymentURL : '#'} target="_blank">
        <img
          style={{ width: buttonImgWidth }}
          src={`${intl.formatMessage({ id: `_dp.payu_${size}_button` })}`}
          alt="payu_button"
        />
      </a>
    </div>
  );
};

PayuButtonTool.propTypes = {
  values: PropTypes.shape({
    size: PropTypes.string,
    alignment: PropTypes.string,
    payu_url: PropTypes.string,
  }),
};
