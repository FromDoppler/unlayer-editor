import {
  Alignment,
  Color,
  FontFamily,
  FontWeight,
  PixelSize,
  PropertyGroupsFrom,
  ReactToolDefinitionFrom,
  ToolValuesFrom,
} from '../../types';

export type DateFormat = 'D/M/Y H:M:S' | 'M/D/Y H:M:S' | 'D/M/Y' | 'M/D/Y';
export type RssBase = Readonly<{
  layout: {
    backgroundColor: Color;
  };
  headTitle: {
    headTitleShown: boolean;
    headTitleFont: FontFamily;
    headTitleFontWeight: FontWeight;
    headTitleFontSize: PixelSize;
    headTitleColor: Color;
  };

  headDate: {
    headDateShown: boolean;
    headDateFormat: DateFormat;
    headDateFont: FontFamily;
    headDateFontWeight: FontWeight;
    headDateFontSize: PixelSize;
    headDateColor: Color;
  };
  headDescription: {
    headDescriptionShown: boolean;
    headDescriptionFontWeight: FontWeight;
    headDescriptionFont: FontFamily;
    headDescriptionFontSize: PixelSize;
    headDescriptionColor: Color;
  };
  headButton: {
    headButtonShown: boolean;
    headButtonAlign: Alignment;
    headButtonText: string;
    headButtonFont: FontFamily;
    headButtonFontWeight: FontWeight;
    headButtonFontSize: PixelSize;
    headButtonColor: Color;
  };
  itemTitle: {
    itemTitleShown: boolean;
    itemTitleFont: FontFamily;
    itemTitleFontWeight: FontWeight;
    itemTitleFontSize: PixelSize;
    itemTitleColor: Color;
  };
  itemDate: {
    itemDateShown: boolean;
    itemDateFormat: DateFormat;
    itemDateFont: FontFamily;
    itemDateFontWeight: FontWeight;
    itemDateFontSize: PixelSize;
    itemDateColor: Color;
  };
  itemDescription: {
    itemDescriptionShown: boolean;
    itemDescriptionFull: boolean;
    itemDescriptionFontWeight: FontWeight;
    itemDescriptionFont: FontFamily;
    itemDescriptionFontSize: PixelSize;
    itemDescriptionColor: Color;
  };
  itemImage: {
    itemImageShown: boolean;
  };
  itemButton: {
    itemButtonShown: boolean;
    itemButtonAlign: Alignment;
    itemButtonText: string;
    itemButtonFont: FontFamily;
    itemButtonFontWeight: FontWeight;
    itemButtonFontSize: PixelSize;
    itemButtonColor: Color;
  };
}>;

export type RssPropertyGroups = PropertyGroupsFrom<RssBase>;

export type RssValues = ToolValuesFrom<RssBase>;

export type RssToolDefinition = ReactToolDefinitionFrom<RssBase>;
