import { socialSettings } from './configuration';
import PropTypes from 'prop-types';

const React = window.unlayer.React;

export const SocialShareTool = (props) => {
  const { social_share_align_option, social_share_available } = props.values;

  return (
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
                {socialSettings
                  .filter((config) =>
                    social_share_available.includes(config.id),
                  )
                  .map((config, id) => (
                    <a
                      href={config.link}
                      target="_blank"
                      rel="noreferrer"
                      key={`social_button_${id}`}
                    >
                      <img
                        src={config.socialImg}
                        alt={config.name}
                        style={{
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

SocialShareTool.propTypes = {
  values: {
    social_share_align_option: PropTypes.string,
    social_share_size: PropTypes.string,
    social_share_available: PropTypes.array,
  },
};
