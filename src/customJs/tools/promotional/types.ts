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
import { UnlayerField } from '../smartforms/types';

export type PromotionalBase = {
  layout: {
    cardWidth: AutoWidth;
    cardAlign: Alignment;
    cardBackgroundColor: Color;
    cardBorder: Border;
    cardBorderRadius: BorderRadius;
    cardPadding: Padding;
  };
  messages: {
    viewPanel: string;
    descriptionHtml: string;
    list: string;
    fields: UnlayerField[];
    buttonText: string;
    buttonBackgroundColor: Color;
    buttonColor: Color;
    fieldBackgroundColor: Color;
    fieldColor: Color;
    buttonFontWeight: FontWeight;
    buttonAlign: Alignment;
    buttonWidth: AutoWidth;
    buttonFontSize: PixelSize;
    buttonBorder: Border;
    buttonBorderRadius: BorderRadius;
    buttonPadding: Padding;
    buttonMargin: Margin;
    congratsHtml: string;
    discountCode: string;
    congratsButtonText: string;
    congratsButtonBackgroundColor: Color;
    congratsButtonColor: Color;
    congratsButtonFontWeight: FontWeight;
    congratsButtonAlign: Alignment;
    congratsButtonWidth: AutoWidth;
    congratsButtonFontSize: PixelSize;
    congratsButtonBorder: Border;
    congratsButtonBorderRadius: BorderRadius;
    congratsButtonPadding: Padding;
    congratsButtonMargin: Margin;
  };
};

export type PromotionalPropertyGroups = PropertyGroupsFrom<PromotionalBase>;

export type PromotionalValues = ToolValuesFrom<PromotionalBase>;
