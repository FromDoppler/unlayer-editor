import {
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
    wheelBackgroudColor: Color;
    wheelBorderColor: Color;
    wheelBorderWidth: PixelSize;
    wheelList: WheelSlide[];
    wheelFontColor: Color;
    wheelFontFamily: FontFamily;
  };
  description: {
    viewPanel: 'init' | 'end';
    descriptionWidth: PixelSize;
    descriptionHtml: string;
  };
};

export type WheelFortuneFormBase = WheelFortuneBase & SmartFormBase;

export type WheelFortunePropertyGroups =
  PropertyGroupsFrom<WheelFortuneFormBase>;

export type WheelFortuneValues = ToolValuesFrom<WheelFortuneFormBase>;
