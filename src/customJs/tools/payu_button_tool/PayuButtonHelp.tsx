import { React } from '../../unlayer-react';
import { intl } from '../../localization';

export const PayuButtonHelp = () => (
  <div
    style={{
      fontStyle: 'italic',
      fontSize: '13px',
      lineHeight: '1.6',
      color: '#525252',
      fontFamily: 'Roboto,sans-serif',
    }}
  >
    {intl.formatMessage({ id: '_dp.payu_help' })}{' '}
    <a
      target="_blank"
      style={{ color: '#33AC72', textDecoration: 'none' }}
      rel="noreferrer"
      href={intl.formatMessage({ id: '_dp.payu_help_link' })}
    >
      {intl.formatMessage({ id: '_dp.help' })}
    </a>
  </div>
);
