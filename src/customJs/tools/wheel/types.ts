import {
  // Alignment,
  // AutoWidth,
  // Border,
  // BorderRadius,
  FontWeight,
  Margin,
  Padding,
  Color,
  FontFamily,
  Percentage,
  PixelSize,
  PropertyGroupsFrom,
  ToolValuesFrom,
} from '../../types';
import { SmartFormBase } from '../smartforms/types';

export type WheelSlide = {
  label: string;
  color: Color;
  chance: number;
  percent: Percentage;
  gift: string;
};

export type WheelFortuneBase = {
  wheel: {
    wheelSize: PixelSize;
    wheelBackgroudColor: Color;
    wheelBorderColor: Color;
    wheelBorderWidth: PixelSize;
    wheelList: WheelSlide[];
    wheelFontColor: Color;
    wheelFontSize: PixelSize;
    wheelFontFamily: FontFamily;
    wheelFontWeight: FontWeight;
    wheelMargin: Margin;
    wheelPadding: Padding;
    wheelBorderShadow: string;
  };
  description: {
    descriptionWidth: PixelSize;
    descriptionHtml: string;
    descriptionBackgroudColor: Color;
    descriptionMargin: Margin;
    descriptionPadding: Padding;
  };
  //form: SmartFormBase['formAction']
};

export type WheelFortuneFormBase = WheelFortuneBase & SmartFormBase;

export type WheelFortunePropertyGroups =
  PropertyGroupsFrom<WheelFortuneFormBase>;

export type WheelFortuneValues = ToolValuesFrom<WheelFortuneFormBase>;
