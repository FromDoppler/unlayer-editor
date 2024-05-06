import { React } from '../../unlayer-react';
import { render, screen } from '@testing-library/react';
import { RssViewer } from './RssViewer';

describe(RssViewer.name, () => {
  it('should render the main container with default styles', async () => {
    const values = {
      backgroundColor: 'rgb(255, 255, 255)',
    };
    render(<RssViewer values={values} />);
    const container = await screen.findByRole('container');
    expect(container.style.backgroundColor).toEqual(values.backgroundColor);
    expect(container.style.display).toEqual('block');
    expect(container.style.width).toEqual('100%');
  });

  it('should render head title with custom styles', async () => {
    const values = {
      headTitleShown: true,
      headTitleFont: {
        value: 'arial',
      },
      headTitleFontWeight: '700',
      headTitleFontSize: '15px',
      headTitleColor: 'rgb(9, 9, 9)',
    };
    render(<RssViewer values={values} />);
    const headTitle = screen.getByText('[[[RSSFEED:TITLE]]]');
    expect(headTitle.style.display).toEqual('inline-block');
    expect(headTitle.style.fontWeight).toEqual('700');
    expect(headTitle.style.fontFamily).toEqual('arial');
    expect(headTitle.style.fontSize).toEqual('15px');
    expect(headTitle.style.color).toEqual('rgb(9, 9, 9)');
  });

  it('should not render head title', async () => {
    const values = {
      headTitleShown: false,
    };
    render(<RssViewer values={values} />);
    const headTitle = screen.getByText('[[[RSSFEED:TITLE]]]');
    expect(headTitle.style.display).toEqual('none');
  });

  it('should render head date with custom styles', async () => {
    const values = {
      headDateShown: true,
      headDateFormat: 'D/M/Y H:M:S',
      headDateFont: {
        value: 'arial',
      },
      headDateFontWeight: '700',
      headDateFontSize: '15px',
      headDateColor: 'rgb(9, 9, 9)',
    };
    render(<RssViewer values={values} />);
    const headDate = screen.getByText('- [[[RSSFEED:DATE:D/M/Y H:M:S]]]');
    expect(headDate.style.display).toEqual('inline-block');
    expect(headDate.style.fontWeight).toEqual('700');
    expect(headDate.style.fontFamily).toEqual('arial');
    expect(headDate.style.fontSize).toEqual('15px');
    expect(headDate.style.color).toEqual('rgb(9, 9, 9)');
  });

  it('should not render head date', async () => {
    const values = {
      headDateShown: false,
      headDateFormat: 'D/M/Y',
    };
    render(<RssViewer values={values} />);
    const headDate = screen.getByText('- [[[RSSFEED:DATE:D/M/Y]]]');
    expect(headDate.style.display).toEqual('none');
  });

  it('should render head description with custom styles', async () => {
    const values = {
      headDescriptionShown: true,
      headDescriptionFont: {
        value: 'arial',
      },
      headDescriptionFontWeight: '700',
      headDescriptionFontSize: '15px',
      headDescriptionColor: 'rgb(9, 9, 9)',
    };
    render(<RssViewer values={values} />);
    const headDescription = screen.getByText('[[[RSSFEED:DESCRIPTION]]]');
    expect(headDescription.style.display).toEqual('block');
    expect(headDescription.style.fontWeight).toEqual('700');
    expect(headDescription.style.fontFamily).toEqual('arial');
    expect(headDescription.style.fontSize).toEqual('15px');
    expect(headDescription.style.color).toEqual('rgb(9, 9, 9)');
  });

  it('should not render head description', async () => {
    const values = {
      headDescriptionShown: false,
    };
    render(<RssViewer values={values} />);
    const headDescription = screen.getByText('[[[RSSFEED:DESCRIPTION]]]');
    expect(headDescription.style.display).toEqual('none');
  });

  it('should render head button with custom styles', async () => {
    const values = {
      headButtonShown: true,
      headButtonText: 'Head Button',
      headButtonAlign: 'center',
      headButtonFont: {
        value: 'arial',
      },
      headButtonFontWeight: '700',
      headButtonFontSize: '15px',
      headButtonColor: 'rgb(9, 9, 9)',
    };
    render(<RssViewer values={values} />);
    const headButton = screen.getByText('Head Button');
    expect(headButton.href).toEqual('http://localhost/[[[RSSFEED:URL]]]');
    expect(headButton.role).toEqual('link');
    expect(headButton.style.display).toEqual('block');
    expect(headButton.style.textAlign).toEqual('center');
    expect(headButton.style.fontWeight).toEqual('700');
    expect(headButton.style.fontFamily).toEqual('arial');
    expect(headButton.style.fontSize).toEqual('15px');
    expect(headButton.style.color).toEqual('rgb(9, 9, 9)');
  });

  it('should not render head button', async () => {
    const values = {
      headButtonShown: false,
      headButtonText: 'Head Button',
    };
    render(<RssViewer values={values} />);
    const headButton = screen.getByText('Head Button');
    expect(headButton.style.display).toEqual('none');
  });

  it('should have start and end rss item marks', async () => {
    const values = {};
    render(<RssViewer values={values} />);
    const startMark = screen.getByText('[[[RSSFEED:ITEMS]]]');
    expect(startMark).toBeDefined;
    const endMark = screen.getByText('[[[RSSFEED:ENDITEMS]]]');
    expect(endMark).toBeDefined;
  });

  it('should render item title with custom styles', async () => {
    const values = {
      itemTitleShown: true,
      itemTitleFont: {
        value: 'arial',
      },
      itemTitleFontWeight: '700',
      itemTitleFontSize: '15px',
      itemTitleColor: 'rgb(9, 9, 9)',
    };
    render(<RssViewer values={values} />);
    const itemTitle = screen.getByText('[[[RSSITEM:TITLE]]]');
    expect(itemTitle.style.display).toEqual('inline-block');
    expect(itemTitle.style.fontWeight).toEqual('700');
    expect(itemTitle.style.fontFamily).toEqual('arial');
    expect(itemTitle.style.fontSize).toEqual('15px');
    expect(itemTitle.style.color).toEqual('rgb(9, 9, 9)');
  });

  it('should not render item title', async () => {
    const values = {
      itemTitleShown: false,
    };
    render(<RssViewer values={values} />);
    const itemTitle = screen.getByText('[[[RSSITEM:TITLE]]]');
    expect(itemTitle.style.display).toEqual('none');
  });

  it('should render item date with custom styles', async () => {
    const values = {
      itemDateShown: true,
      itemDateFormat: 'D/M/Y H:M:S',
      itemDateFont: {
        value: 'arial',
      },
      itemDateFontWeight: '700',
      itemDateFontSize: '15px',
      itemDateColor: 'rgb(9, 9, 9)',
    };
    render(<RssViewer values={values} />);
    const itemDate = screen.getByText('- [[[RSSITEM:DATE:D/M/Y H:M:S]]]');
    expect(itemDate.style.display).toEqual('inline-block');
    expect(itemDate.style.fontWeight).toEqual('700');
    expect(itemDate.style.fontFamily).toEqual('arial');
    expect(itemDate.style.fontSize).toEqual('15px');
    expect(itemDate.style.color).toEqual('rgb(9, 9, 9)');
  });

  it('should not render item date', async () => {
    const values = {
      itemDateShown: false,
      itemDateFormat: 'D/M/Y',
    };
    render(<RssViewer values={values} />);
    const itemDate = screen.getByText('- [[[RSSITEM:DATE:D/M/Y]]]');
    expect(itemDate.style.display).toEqual('none');
  });

  it('should render item description with custom styles', async () => {
    const values = {
      itemDescriptionShown: true,
      itemDescriptionFull: false,
      itemDescriptionFont: {
        value: 'arial',
      },
      itemDescriptionFontWeight: '700',
      itemDescriptionFontSize: '15px',
      itemDescriptionColor: 'rgb(9, 9, 9)',
    };
    render(<RssViewer values={values} />);
    const itemDescription = screen.getByText('[[[RSSITEM:CONTENT]]]');
    expect(itemDescription.style.display).toEqual('block');
    expect(itemDescription.style.fontWeight).toEqual('700');
    expect(itemDescription.style.fontFamily).toEqual('arial');
    expect(itemDescription.style.fontSize).toEqual('15px');
    expect(itemDescription.style.color).toEqual('rgb(9, 9, 9)');
  });

  it('should render item description with full content', async () => {
    const values = {
      itemDescriptionShown: true,
      itemDescriptionFull: true,
    };
    render(<RssViewer values={values} />);
    const itemDescription = screen.getByText('[[[RSSITEM:FULLCONTENT]]]');
    expect(itemDescription).toBeDefined;
  });

  it('should not render item description', async () => {
    const values = {
      itemDescriptionShown: false,
      itemDescriptionFull: false,
    };
    render(<RssViewer values={values} />);
    const itemDescription = screen.getByText('[[[RSSITEM:CONTENT]]]');
    expect(itemDescription.style.display).toEqual('none');
  });

  it('should render item image', async () => {
    const values = {
      itemImageShown: true,
    };
    render(<RssViewer values={values} />);
    const itemDescription = screen.getByText('[[[RSSITEM:IMAGE]]]');
    expect(itemDescription).toBeDefined;
  });

  it('should not render item image', async () => {
    const values = {
      itemImageShown: false,
    };
    render(<RssViewer values={values} />);
    const itemDescription = screen.getByText('[[[RSSITEM:IMAGE]]]');
    expect(itemDescription.style.display).toEqual('none');
  });

  it('should render item button with custom styles', async () => {
    const values = {
      itemButtonShown: true,
      itemButtonText: 'Item Link',
      itemButtonAlign: 'center',
      itemButtonFont: {
        value: 'arial',
      },
      itemButtonFontWeight: '700',
      itemButtonFontSize: '15px',
      itemButtonColor: 'rgb(9, 9, 9)',
    };
    render(<RssViewer values={values} />);
    const itemButton = screen.getByText('Item Link');
    expect(itemButton.href).toEqual('http://localhost/[[[RSSITEM:URL]]]');
    expect(itemButton.role).toEqual('link');
    expect(itemButton.style.display).toEqual('block');
    expect(itemButton.style.textAlign).toEqual('center');
    expect(itemButton.style.fontWeight).toEqual('700');
    expect(itemButton.style.fontFamily).toEqual('arial');
    expect(itemButton.style.fontSize).toEqual('15px');
    expect(itemButton.style.color).toEqual('rgb(9, 9, 9)');
  });

  it('should not render item button', async () => {
    const values = {
      itemButtonShown: false,
      itemButtonText: 'Item Button',
    };
    render(<RssViewer values={values} />);
    const itemButton = screen.getByText('Item Button');
    expect(itemButton.style.display).toEqual('none');
  });
});
