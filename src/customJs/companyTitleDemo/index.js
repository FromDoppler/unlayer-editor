import { CompanyTitle } from './CompanyTitle';

export const companyTitleDemoConfig = {
  name: 'company_title_demo_tool',
  label: 'Company title',
  icon: 'fa-share-alt',
  category: 'contents',
  type: 'whatever',
  renderer: {
    Viewer: CompanyTitle,
  },
};
