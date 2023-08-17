import { React } from '../../unlayer-react';
import { $t } from '../../localization';
import { SOCIAL_NETWORKS } from '../../constants';
import { ViewerComponent } from '../../types';
import { SocialShareValues } from './types';
import { EmptyViewer } from '../../components/EmptyViewer';

export const SocialShareViewer: ViewerComponent<SocialShareValues> = ({
  values: {
    social_share_align_option,
    social_share_available,
    social_share_size: size,
  },
  ...rest
}) => {
  const selectedNetworks = SOCIAL_NETWORKS.filter(({ id }) =>
    social_share_available.includes(id),
  );
  return selectedNetworks.length === 0 ? (
    <EmptyViewer {...rest} />
  ) : (
    <table cellPadding="0" cellSpacing="0" border={0} width="100%">
      <tr>
        <td style={{ textAlign: social_share_align_option }}>
          <table cellPadding="0" cellSpacing="0" border={0} width="100%">
            <tr>
              <td
                style={{
                  paddingRight: '5px',
                  paddingTop: '5px',
                  textAlign: social_share_align_option,
                }}
                valign="middle"
              >
                {selectedNetworks.map(({ link, id, name }) => (
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    key={`social_button_${id}`}
                  >
                    <img
                      src={$t(`_dp.social_share_url_${size}_${id}`)}
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
};
