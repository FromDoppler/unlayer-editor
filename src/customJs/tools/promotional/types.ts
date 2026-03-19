import { UrlValue } from '../../properties/url/UrlValue';
import {
  Alignment,
  AutoWidth,
  Border,
  BorderRadius,
  Color,
  FontWeight,
  Margin,
  Padding,
  PixelSize,
  PropertyGroupsFrom,
  ToolValuesFrom,
} from '../../types';

export type PromotionalBase = {
  content: {
    badgeText: string;
    titleText: string;
    descriptionHtml: string;
  };
  layout: {
    cardWidth: AutoWidth;
    cardAlign: Alignment;
    cardBackgroundColor: Color;
    cardBorder: Border;
    cardBorderRadius: BorderRadius;
    cardPadding: Padding;
  };
  title: {
    titleColor: Color;
    titleFontSize: PixelSize;
    titleFontWeight: FontWeight;
  };
  description: {
    descriptionColor: Color;
    descriptionFontSize: PixelSize;
  };
  button: {
    buttonText: string;
    buttonUrl: UrlValue;
    buttonBackgroundColor: Color;
    buttonColor: Color;
    buttonFontWeight: FontWeight;
    buttonAlign: Alignment;
    buttonWidth: AutoWidth;
    buttonFontSize: PixelSize;
    buttonBorder: Border;
    buttonBorderRadius: BorderRadius;
    buttonPadding: Padding;
    buttonMargin: Margin;
  };
};

export type PromotionalPropertyGroups = PropertyGroupsFrom<PromotionalBase>;

export type PromotionalValues = ToolValuesFrom<PromotionalBase>;
