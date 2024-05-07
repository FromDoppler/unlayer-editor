import { React } from '../../unlayer-react';
import { ViewerComponent } from '../../types';
import { RssValues } from './types';

export const RssViewer: ViewerComponent<RssValues> = ({ values }) => {
  const containerStyle = {
    display: 'block',
    backgroundColor: values.backgroundColor,
    padding: '5px',
    width: '100%',
  } as const;

  const headTitleStyle = {
    display: values.headTitleShown ? 'inline-block' : 'none',
    fontSize: values.headTitleFontSize || '24px',
    fontFamily: values.headTitleFont?.value || 'inherit',
    fontWeight: values.headTitleFontWeight,
    color: values.headTitleColor,
  };

  const headDescriptionStyle = {
    display: values.headDescriptionShown ? 'block' : 'none',
    fontSize: values.headDescriptionFontSize || '24px',
    fontFamily: values.headDescriptionFont?.value || 'inherit',
    fontWeight: values.headDescriptionFontWeight,
    color: values.headDescriptionColor,
  };

  const headDateStyle = {
    display: values.headDateShown ? 'inline-block' : 'none',
    fontSize: values.headDateFontSize || '24px',
    fontFamily: values.headDateFont?.value || 'inherit',
    fontWeight: values.headDateFontWeight,
    color: values.headDateColor,
    paddingLeft: '5px',
  };

  const headLinkStyle = {
    display: values.headButtonShown ? 'block' : 'none',
    fontSize: values.headButtonFontSize || '14px',
    fontFamily: values.headButtonFont?.value || 'inherit',
    fontWeight: values.headButtonFontWeight,
    color: values.headButtonColor || 'inherit',
    minHeight: '20px',
    padding: '13px 0px',
    lineHeight: '20px',
    textAlign: values.headButtonAlign,
  } as const;

  const itemDatetyle = {
    display: values.itemDateShown ? 'inline-block' : 'none',
    fontSize: values.itemDateFontSize || '24px',
    fontFamily: values.itemDateFont?.value || 'inherit',
    fontWeight: values.itemDateFontWeight,
    color: values.itemDateColor,
    paddingLeft: '5px',
  };

  const itemButtonStyle = {
    display: values.itemButtonShown ? 'block' : 'none',
    fontSize: values.itemButtonFontSize || '14px',
    fontFamily: values.itemButtonFont?.value || 'inherit',
    fontWeight: values.itemButtonFontWeight,
    color: values.itemButtonColor || 'inherit',
    minHeight: '20px',
    padding: '13px 0px',
    lineHeight: '20px',
    textAlign: values.itemButtonAlign,
  } as const;

  const itemTitleStyle = {
    display: values.itemTitleShown ? 'inline-block' : 'none',
    fontSize: values.itemTitleFontSize || '24px',
    fontFamily: values.itemTitleFont?.value || 'inherit',
    fontWeight: values.itemTitleFontWeight,
    color: values.itemTitleColor,
  };

  const itemImageStyle = {
    display: values.itemImageShown ? 'inline-block' : 'none',
    fontSize: '16px',
  };

  const itemDescriptionStyle = {
    display: values.itemDescriptionShown ? 'block' : 'none',
    fontSize: values.itemDescriptionFontSize || '24px',
    fontFamily: values.itemDescriptionFont?.value || 'inherit',
    fontWeight: values.itemDescriptionFontWeight,
    color: values.itemDescriptionColor,
  };

  const itemTypeDescription = values.itemDescriptionFull
    ? 'FULLCONTENT'
    : 'CONTENT';

  const rssToolElement = {
    headTitle: {
      value: '[[[RSSFEED:TITLE]]]',
      style: headTitleStyle,
    },
    headDate: {
      value: `- [[[RSSFEED:DATE:${values.headDateFormat}]]]`,
      style: headDateStyle,
    },
    headDescription: {
      value: '[[[RSSFEED:DESCRIPTION]]]',
      style: headDescriptionStyle,
    },
    headLink: {
      value: values.headButtonText,
      href: '[[[RSSFEED:URL]]]',
      style: headLinkStyle,
    },
    itemTitle: {
      value: '[[[RSSITEM:TITLE]]]',
      style: itemTitleStyle,
    },
    itemDate: {
      value: `- [[[RSSITEM:DATE:${values.itemDateFormat}]]]`,
      style: itemDatetyle,
    },
    itemImage: {
      value: '[[[RSSITEM:IMAGE]]]',
      style: itemImageStyle,
    },
    itemDescription: {
      value: `[[[RSSITEM:${itemTypeDescription}]]]`,
      style: itemDescriptionStyle,
    },
    itemLink: {
      value: values.itemButtonText,
      href: '[[[RSSITEM:URL]]]',
      style: itemButtonStyle,
    },
  };

  return (
    <div>
      <div role="container" style={containerStyle}>
        <section data-testid="feed-container">
          <div>
            <span style={rssToolElement.headTitle.style}>
              {rssToolElement.headTitle.value}
            </span>
            <span style={rssToolElement.headDate.style}>
              {rssToolElement.headDate.value}
            </span>
          </div>

          <span style={rssToolElement.headDescription.style}>
            {rssToolElement.headDescription.value}
          </span>

          <a
            style={rssToolElement.headLink.style}
            role="link"
            href={rssToolElement.headLink.href}
            target="_blank"
            rel="noreferrer"
          >
            {rssToolElement.headLink.value}
          </a>
        </section>
        <section style={{ marginTop: '25px' }} data-testid="item-container">
          <span style={{ display: 'none' }}>[[[RSSFEED:ITEMS]]]</span>

          <div>
            <span style={rssToolElement.itemTitle.style}>
              {rssToolElement.itemTitle.value}
            </span>
            <span style={rssToolElement.itemDate.style}>
              {rssToolElement.itemDate.value}
            </span>
          </div>

          <span style={rssToolElement.itemImage.style}>
            {rssToolElement.itemImage.value}
          </span>

          <span style={rssToolElement.itemDescription.style}>
            {rssToolElement.itemDescription.value}
          </span>
          <a
            style={rssToolElement.itemLink.style}
            role="link"
            href={rssToolElement.itemLink.href}
            target="_blank"
            rel="noreferrer"
          >
            {rssToolElement.itemLink.value}
          </a>

          <span style={{ display: 'none' }}>[[[RSSFEED:ENDITEMS]]]</span>
        </section>
      </div>
    </div>
  );
};
