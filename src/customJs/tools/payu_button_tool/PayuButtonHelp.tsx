import { React } from '../../unlayer-react';
import { $t } from '../../localization';

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
    {$t('_dp.payu_help')}{' '}
    <a
      target="_blank"
      style={{ color: '#33AC72', textDecoration: 'none' }}
      rel="noreferrer"
      href={$t('_dp.payu_help_link')}
    >
      {$t('_dp.help')}
    </a>
  </div>
);
