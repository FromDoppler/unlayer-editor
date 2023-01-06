import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { LinkPropertyWidget } from './linkProperty';
import { setLocale } from '../localization';
import userEvent from '@testing-library/user-event';

// TODO: this is a shared code, make it a common helper
function prepareUnlayerGlobalObject() {
  window.unlayer = {
    setLocale: jest.fn(),
    setTranslations: jest.fn(),
  };
  return window.unlayer;
}

describe(LinkPropertyWidget.name, () => {
  it('must be render input link by default', async () => {
    prepareUnlayerGlobalObject();
    setLocale('en-US');

    const unlayerPropertyProps = {
      data: {},
      value: 'this is a input value',
    };
    const updateValueFn = jest.fn();
    render(
      <LinkPropertyWidget
        {...unlayerPropertyProps}
        updateValue={updateValueFn}
      />,
    );

    const input = await screen.findByLabelText('link-property-input');
    const prefixLabel = await screen.findByText('URL');

    expect(input.value).toBe(unlayerPropertyProps.value);
    expect(prefixLabel).toBeDefined();
  });

  it.each([
    {
      label: 'this is a label string',
      labelTextExpected: 'this is a label string',
      help: 'this is a help string',
      helpTextExpected: 'this is a help string',
    },
    {
      label: <div>this is a label component</div>,
      labelTextExpected: 'this is a label component',
      help: <div>this is a help component</div>,
      helpTextExpected: 'this is a help component',
    },
  ])(
    'must be render input link with label and help',
    async ({ label, labelTextExpected, help, helpTextExpected }) => {
      prepareUnlayerGlobalObject();
      setLocale('en-US');

      const unlayerPropertyProps = {
        data: {
          label,
          help,
        },
        value: 'this is a input value',
      };
      const updateValueFn = jest.fn();
      render(
        <LinkPropertyWidget
          {...unlayerPropertyProps}
          updateValue={updateValueFn}
        />,
      );

      const input = await screen.findByLabelText('link-property-input');
      const prefixLabel = await screen.findByText('URL');

      expect(input.value).toBe(unlayerPropertyProps.value);
      expect(prefixLabel).toBeDefined();
      expect(await screen.findByText(labelTextExpected)).toBeDefined();
      expect(await screen.findByText(helpTextExpected)).toBeDefined();
    },
  );

  it('must be allow write into input link', async () => {
    prepareUnlayerGlobalObject();
    setLocale('en-US');

    const unlayerPropertyProps = {
      data: {},
      value: '',
    };
    const updateValueFn = jest.fn();
    const typedUrlTextValue = 'https://writing.url';

    render(
      <LinkPropertyWidget
        {...unlayerPropertyProps}
        updateValue={updateValueFn}
      />,
    );

    const input = await screen.findByLabelText('link-property-input');
    await userEvent.type(input, typedUrlTextValue);

    expect(input.value).toBe(typedUrlTextValue);
    expect(updateValueFn).toHaveBeenCalled();
  });
});
