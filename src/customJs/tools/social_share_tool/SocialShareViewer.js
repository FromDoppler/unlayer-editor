const React = window.unlayer.React;
import PropTypes from 'prop-types';
import { intl } from '../../localization';
import { SOCIAL_NETWORKS } from '../../constants';

export const SocialShareViewer = ({
  values: {
    social_share_align_option,
    social_share_available,
    social_share_size: size,
  },
}) => (
  <table cellPadding="0" cellSpacing="0" border="0" width="100%">
    <tr>
      <td style={{ textAlign: social_share_align_option }}>
        <table cellPadding="0" cellSpacing="0" border="0" width="100%">
          <tr>
            <td
              style={{
                paddingRight: '5px',
                paddingTop: '5px',
                textAlign: social_share_align_option,
              }}
              valign="middle"
            >
              {SOCIAL_NETWORKS.filter(({ id }) =>
                social_share_available.includes(id),
              ).map(({ link, id, name }) => (
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  key={`social_button_${id}`}
                >
                  <img
                    src={intl.formatMessage({
                      id: `_dp.social_share_url_${size}_${id}`,
                    })}
                    alt={name}
                    width={size === 'big' ? '94' : '40'}
                    style={{
                      width: size === 'big' ? '94px' : '40px',
                      margin: '0px 2px',
                      display: 'inline-block',
                    }}
                  />
                </a>
              ))}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
);

SocialShareViewer.propTypes = {
  values: PropTypes.shape({
    social_share_align_option: PropTypes.string,
    social_share_size: PropTypes.string,
    social_share_available: PropTypes.array,
  }),
};
