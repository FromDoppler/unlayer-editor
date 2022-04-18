import subscribeTool from './subscribeTool';
import { getTwitterPropertyConfig } from './socialTool/TwitterProperty';
import { getLinkedInPropertyConfig } from './socialTool/LinkedInProperty';
import { getFacebookPropertyConfig } from './socialTool/FacebookProperty';
import { getSocialToolConfig } from './socialTool/SocialTool';
import { getSocialShareToolConfig } from './socialShareTool';
import { setCompanyTitle } from './sharedSingletonModule';
import { getCompanyTitleDemoConfig } from './companyTitleDemo';

const unlayer = window.unlayer;

window.initUnlayerExtensions = ({ companyTitle }) => {
  setCompanyTitle(companyTitle);
  unlayer.registerPropertyEditor(getTwitterPropertyConfig());
  unlayer.registerPropertyEditor(getLinkedInPropertyConfig());
  unlayer.registerPropertyEditor(getFacebookPropertyConfig());
  unlayer.registerTool(getSocialToolConfig());
  unlayer.registerTool(getCompanyTitleDemoConfig());
  // Register Properties and tool Social Share Tool
  unlayer.registerTool(getSocialShareToolConfig());
};

// TODO: Verify to delete this
export default { subscribeTool };
