import { EMPTY_SELECTION } from '../constants';
import { setLocale } from '../localization';
import {
  alignmentProperty,
  mappedDropdownProperty,
  storesDropdownProperty,
} from './helpers';

// Required to initialize intl
setLocale('es-ES');

const emptyOption = { value: EMPTY_SELECTION, label: 'Seleccione una opción' };

describe(mappedDropdownProperty.name, () => {
  const demoMap = (x: any) => ({ value: `value-${x}`, label: `label-${x}` });

  it('should create a dropdownProperty with the empty value and empty selection when there are more than an item', () => {
    // Arrange
    const label = 'label';
    const items = [5, 8];
    const expectedOptions = [
      emptyOption,
      { value: 'value-5', label: 'label-5' },
      { value: 'value-8', label: 'label-8' },
    ];

    // Act
    const result = mappedDropdownProperty({
      label,
      items,
      map: demoMap,
    });

    // Assert
    expect(result).toEqual({
      defaultValue: EMPTY_SELECTION,
      label,
      widget: 'dropdown',
      data: {
        options: expectedOptions,
      },
    });
  });

  it('should create a dropdownProperty with the empty value and selected item when there is only one item', () => {
    // Arrange
    const label = 'label';
    const items = [5];
    const expectedDefaultValue = 'value-5';
    const expectedOptions = [
      emptyOption,
      { value: expectedDefaultValue, label: 'label-5' },
    ];

    // Act
    const result = mappedDropdownProperty({
      label,
      items,
      map: demoMap,
    });

    // Assert
    expect(result).toEqual({
      defaultValue: expectedDefaultValue,
      label,
      widget: 'dropdown',
      data: {
        options: expectedOptions,
      },
    });
  });

  it('should create a dropdownProperty with only empty value and empty selection when there are no items', () => {
    // Arrange
    const label = 'label';
    const items = [] as const;
    const expectedOptions = [emptyOption];

    // Act
    const result = mappedDropdownProperty({
      label,
      items,
      map: demoMap,
    });

    // Assert
    expect(result).toEqual({
      defaultValue: EMPTY_SELECTION,
      label,
      widget: 'dropdown',
      data: {
        options: expectedOptions,
      },
    });
  });
});

describe(alignmentProperty.name, () => {
  it('should create the alignmentProperty', () => {
    // Act
    const result = alignmentProperty();

    // Assert
    expect(result).toEqual({
      defaultValue: 'center',
      label: 'Alineación',
      widget: 'alignment',
      hidden: false,
    });
  });
});

describe(storesDropdownProperty.name, () => {
  it('should create the dropdown property with stores related values', () => {
    // Act
    const stores = [
      {
        name: 'store1',
        promotionCodeEnabled: true,
        promotionCodeDynamicEnabled: false,
      },
      {
        name: 'store2',
        promotionCodeEnabled: false,
        promotionCodeDynamicEnabled: false,
      },
    ];
    const expectedOptions = [
      emptyOption,
      { value: 'store1', label: 'store1' },
      { value: 'store2', label: 'store2' },
    ];
    const result = storesDropdownProperty({ stores });

    // Assert
    expect(result).toEqual({
      defaultValue: EMPTY_SELECTION,
      label: 'Integración',
      widget: 'dropdown',
      data: {
        options: expectedOptions,
      },
    });
  });
});
