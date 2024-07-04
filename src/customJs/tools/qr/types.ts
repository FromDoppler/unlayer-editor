import { QRProperty } from '../../properties/qr/types';
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
    qr: QRProperty;
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
