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
      audit: true,
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
      `window["user-data"] = {
        fields : [
            {
                "name": "telefonito",
                "predefined": false,
                "private": true,
                "readonly": false,
                "type": "phone",
                "sample": "",
                "required": false,
                "_links": []
            },
            {
                "name": "mobil",
                "predefined": false,
                "private": true,
                "readonly": false,
                "type": "phone",
                "sample": "",
                "required": false,
                "_links": []
            },
            {
                "name": "interes",
                "predefined": false,
                "private": true,
                "readonly": false,
                "type": "string",
                "sample": "",
                "required": false,
                "_links": []
            },
            {
                "name": "binario",
                "predefined": false,
                "private": true,
                "readonly": false,
                "type": "boolean",
                "sample": "",
                "required": false,
                "_links": []
            },
            {
                "name": "permiso",
                "predefined": false,
                "private": false,
                "readonly": false,
                "type": "permission",
                "sample": "",
                "permissionHTML": "<p>esto es un permiso de algo</p>",
                "required": false,
                "_links": []
            },
            {
                "name": "numero",
                "predefined": false,
                "private": true,
                "readonly": false,
                "type": "number",
                "sample": "",
                "required": false,
                "_links": []
            },
            {
                "name": "aniversario",
                "predefined": false,
                "private": true,
                "readonly": false,
                "type": "date",
                "sample": "",
                "required": false,
                "_links": []
            },
            {
                "name": "FIRSTNAME",
                "predefined": true,
                "private": false,
                "readonly": false,
                "type": "string",
                "sample": "FIRST_NAME",
                "required": false,
                "_links": []
            },
            {
                "name": "LASTNAME",
                "predefined": true,
                "private": false,
                "readonly": false,
                "type": "string",
                "sample": "LAST_NAME",
                "required": false,
                "_links": []
            },
            {
                "name": "EMAIL",
                "predefined": true,
                "private": false,
                "readonly": true,
                "type": "email",
                "sample": "EMAIL",
                "required": true,
                "_links": []
            },
            {
                "name": "GENDER",
                "predefined": true,
                "private": false,
                "readonly": false,
                "type": "gender",
                "sample": "GENDER",
                "required": false,
                "allowedValues": [
                    "M",
                    "F",
                    "N"
                ],
                "_links": []
            },
            {
                "name": "BIRTHDAY",
                "predefined": true,
                "private": false,
                "readonly": false,
                "type": "date",
                "sample": "BIRTHDAY",
                "required": false,
                "_links": []
            },
            {
                "name": "COUNTRY",
                "predefined": true,
                "private": false,
                "readonly": false,
                "type": "country",
                "sample": "COUNTRY",
                "required": false,
                "allowedValues": [
                  "AR|Argentina",
                  "US|United States",
                  "BR|Brazil",
                  "MX|Mexico",
                  "CL|Chile",
                ],
                "_links": []
            }
            ],
            subscriptionList : [
            {
                listId: '1',
                name: 'Lista 1',
            },
            {
                listId: '2',
                name: 'Lista 2',
            },
            {
                listId: '3',
                name: 'Hot Leads',
            },
            {
                listId: '4',
                name: 'Comercial List ',
            },
            {
                listId: '5',
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
