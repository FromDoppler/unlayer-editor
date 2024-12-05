import React, { useRef } from 'react';
import mergeTags from './external/merge.tags';
import styled from 'styled-components';
import { ASSETS_BASE_URL } from './customJs/constants';
import { JSONTemplate, User, AppearanceConfig } from 'state/types/index';
import { ExportHtmlResult } from 'embed/Config';
import EmailEditor, { UnlayerOptions, EditorRef } from 'react-email-editor';

const Bar = styled.div`
  flex: 1;
  background-color: #fcc338;
  color: #000;
  padding: 10px;
  display: flex;
  max-height: 40px;
  h1 {
    flex: 1;
    font-size: 16px;
    text-align: left;
  }
  button {
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    background-color: #000;
    color: #fff;
    border: 0;
    max-width: 150px;
    cursor: pointer;
  }
`;

const App: React.FC = () => {
  const emailEditorRef = useRef<EditorRef>(null);
  const projectId: number = parseInt(
    process.env.REACT_APP_PROJECT_ID as string,
    10,
  );
  const userId: number = parseInt(process.env.REACT_APP_USER_ID as string, 10);
  const userSignature: string = process.env.REACT_APP_USER_SIGNATURE as string;
  const userExtend = {
    id: userId,
    signature: userSignature,
  } as User;
  const UnlayerOptionsExtended = {
    projectId,
    displayMode: 'popup',
    tools: {
      button: {
        icon: `${ASSETS_BASE_URL}/button.svg`,
      },
    },
    version: 'latest',
    features: {
      preheaderText: false,
      textEditor: {
        inlineFontControls: true, // enabled for see rich_text compoenent full style
      },
    },
    appearance: {
      panels: {
        tools: {
          dock: 'left',
        },
      },
    } as AppearanceConfig,
    mergeTagsConfig: {
      sort: false,
    },
    mergeTags,
    user: userExtend,
    customCSS: [`${process.env.PUBLIC_URL}/customJs/main.css`],
    customJS: [
      `window["smartFormData"] = {
    subscritionsList : [
        {
            id: '1',
            name: 'Lista 1',
        },
        {
            id: '2',
            name: 'Lista 2',
        },
        {
            id: '3',
            name: 'Hot Leads',
        },
        {
            id: '4',
            name: 'Comercial List ',
        },
        {
            id: '5',
            name: 'Meli List',
        }
    ],
    }`,
      `window["unlayer-extensions-configuration"] = {
        locale: "es",
        previewMode: true,
        abandonedCartCampaign: true,
        visitedProductsCampaign: true,
        confirmationOrderCampaign: true,
        productCompletedEnabled: false,
        recommendedProductsEnabled: false,
        pendingOrderCampaign: true,
        bestSellingEnabled: true,
        newProductsEnabled: false,
        crossSellingEnabled: false,
        rssCampaign: true,
        rssShowPreview: true,
        smartForm: true,
        stores: [
        { name: "MercadoShops", promotionCodeEnabled: true },
        { name: "Magento", promotionCodeEnabled: false },
        { name: "Tiendanube", promotionCodeEnabled: true, promotionCodeDynamicEnabled: true }
        ],
        customFields : [
        {
            "id": "Descuento",
            "label": "Descuento",
            "type": "checkbox",
            "custom": true,
            "required": false,
            "value": "Descuento"
        },
        {
            "id": "BirthdayClient",
            "label": "BirthdayClient",
            "type": "date",
            "custom": true,
            "required": false,
            "value": "BirthdayClient"
        },
        {
            "id": "RFM_Frequency",
            "label": "RFM_Frequency",
            "type": "number",
            "custom": true,
            "required": false,
            "value": "RFM_Frequency"
        },
        {
            "id": "Lista",
            "label": "Lista",
            "type": "text",
            "custom": true,
            "required": false,
            "value": "Lista"
        },
        {
            "id": "PrimeraCompra",
            "label": "PrimeraCompra",
            "type": "date",
            "custom": true,
            "required": false,
            "value": "PrimeraCompra"
        },
        {
            "id": "BIRTHDAY",
            "label": "BIRTHDAY",
            "type": "date",
            "custom": true,
            "required": false,
            "value": "BIRTHDAY"
        },
        {
            "id": "COUNTRY",
            "label": "COUNTRY",
            "type": "select",
            "custom": true,
            "required": false,
            "value": "COUNTRY",
            "options": [
                {
                    "id": "Afghanistan",
                    "label": "Afghanistan",
                    "value": "AF"
                },
                {
                    "id": "Albania",
                    "label": "Albania",
                    "value": "AL"
                },
                {
                    "id": "Algeria",
                    "label": "Algeria",
                    "value": "DZ"
                },
                {
                    "id": "Andorra",
                    "label": "Andorra",
                    "value": "AD"
                },
                {
                    "id": "Angola",
                    "label": "Angola",
                    "value": "AO"
                },
                {
                    "id": "Antigua and Barbuda",
                    "label": "Antigua and Barbuda",
                    "value": "AG"
                },
                {
                    "id": "Argentina",
                    "label": "Argentina",
                    "value": "AR"
                },
            ]
        },
        {
            "id": "EMAIL",
            "label": "EMAIL",
            "type": "email",
            "custom": true,
            "required": true,
            "value": "EMAIL"
        },
        {
            "id": "FIRSTNAME",
            "label": "FIRSTNAME",
            "type": "text",
            "custom": true,
            "required": false,
            "value": "FIRSTNAME"
        },
        {
            "id": "GENDER",
            "label": "GENDER",
            "type": "radio",
            "custom": true,
            "required": false,
            "value": "GENDER",
            "options": [
                {
                    "id": "M",
                    "label": "M",
                    "value": "M"
                },
                {
                    "id": "F",
                    "label": "F",
                    "value": "F"
                },
                {
                    "id": "N",
                    "label": "N",
                    "value": "N"
                }
            ]
        },
        {
            "id": "LASTNAME",
            "label": "LASTNAME",
            "type": "text",
            "custom": true,
            "required": false,
            "value": "LASTNAME"
        }
        ],
        subscritionsList : [
        {
            id: '1',
            name: 'Lista 1',
        },
        {
            id: '2',
            name: 'Lista 2',
        },
        {
            id: '3',
            name: 'Hot Leads',
        },
        {
            id: '4',
            name: 'Comercial List ',
        },
        {
            id: '5',
            name: 'Meli List',
        }
        ],
        dopplerExternalUrls: {
        home: "https://webappqa.fromdoppler.net/dashboard",
        campaigns: "https://appqa.fromdoppler.net/Campaigns/Draft/",
        lists: "https://appqa.fromdoppler.net/Lists/SubscribersList",
        controlPanel: "https://webappqa.fromdoppler.net/control-panel",
        automation: "https://appqa.fromdoppler.net/Automation/Automation/AutomationApp",
        templates: "https://appqa.fromdoppler.net/Templates/Main",
        integrations: "https://webappqa.fromdoppler.net/integrations"
        },
    };`,
      `${process.env.PUBLIC_URL}/customJs/index.js`,
    ],
  } as UnlayerOptions;

  const saveDesign = () => {
    emailEditorRef.current?.editor?.saveDesign((design: JSONTemplate) => {
      console.log('Template data', '\n', design);
    });
  };

  const exportHtml = () => {
    emailEditorRef.current?.editor?.exportHtml((data: ExportHtmlResult) => {
      const { html } = data;
      console.log('HTML Email data', '\n', html);
    });
  };

  return (
    <div className="App" data-testid="email-editor-test">
      <Bar>
        <h1>Doppler Unlayer Editor POC</h1>
        <button onClick={saveDesign}>Save Design</button>
        <button onClick={exportHtml}>Export HTML</button>
      </Bar>
      <EmailEditor
        key="email-editor-test"
        ref={emailEditorRef}
        options={UnlayerOptionsExtended}
      />
    </div>
  );
};

export default App;
