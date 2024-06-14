import {
  Alignment,
  Color,
  PropertyGroupsFrom,
  ReactToolDefinitionFrom,
  ToolValuesFrom,
} from '../../types';

export type QrBase = Readonly<{
  layout: {
    backgroundColor: Color;
  };
  content: {
    qrValue: string;
  };
  format: {
    qrSize: number;
    qrColor: Color;
    qrAlignment: Alignment;
  };
}>;

export type QrPropertyGroups = PropertyGroupsFrom<QrBase>;

export type QrValues = ToolValuesFrom<QrBase>;

export type QrToolDefinition = ReactToolDefinitionFrom<QrBase>;
