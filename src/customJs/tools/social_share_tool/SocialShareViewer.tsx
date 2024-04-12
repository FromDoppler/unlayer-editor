import { React } from '../../unlayer-react';
import { $t } from '../../localization';
import { SocialNetworkId, ViewerComponent } from '../../types';
import { SocialShareValues } from './types';
import { EmptyViewer } from '../../components/EmptyViewer';

export const SocialShareViewer: ViewerComponent<SocialShareValues> = ({
  values,
  ...rest
}) => {
  type SOCIAL_NETWORKS_ARRAY = {
    id: SocialNetworkId;
    name: string;
    link: string;
    showed: boolean;
  };

  const selectedNetworks: SOCIAL_NETWORKS_ARRAY[] = [
    {
      link: '[[shareInFacebookLink]]',
      name: 'Facebook',
      id: 'facebook_shared_property' as SocialNetworkId,
      showed: values['facebook_shared_property'],
    },
    {
      link: '[[shareInLinkedinLink]]',
      name: 'Linkedin',
      id: 'linkedin_shared_property' as SocialNetworkId,
      showed: values['linkedin_shared_property'],
    },
    {
      link: '[[shareInTwitterLink]]',
      name: 'Twitter',
      id: 'twitter_shared_property' as SocialNetworkId,
      showed: values['twitter_shared_property'],
    },
    {
      link: '[[shareInPinterestLink]]',
      name: 'Pinterest',
      id: 'pinterest_shared_property' as SocialNetworkId,
      showed: values['pinterest_shared_property'],
    },
    {
      link: '[[shareInWhatsappLink]]',
      name: 'Whatsapp',
      id: 'whatsapp_shared_property' as SocialNetworkId,
      showed: values['whatsapp_shared_property'],
    },
  ].filter(({ showed }) => !!showed);

  const size = values.social_share_size;

  return selectedNetworks.length === 0 ? (
    <EmptyViewer {...rest} />
  ) : (
    <table cellPadding="0" cellSpacing="0" border={0} width="100%">
      <tr>
        <td style={{ textAlign: values.social_share_align_option }}>
          <table cellPadding="0" cellSpacing="0" border={0} width="100%">
            <tr>
              <td
                style={{
                  paddingRight: '5px',
                  paddingTop: '5px',
                  textAlign: values.social_share_align_option,
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
