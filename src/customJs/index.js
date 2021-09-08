import subscribeTool from './subscribeTool';
import socialShareTool from './socialShareTool';
import { twitterPropertyConfig } from './socialTool/TwitterProperty';
import { linkedInPropertyConfig } from './socialTool/LinkedInProperty';
import { facebookPropertyConfig } from './socialTool/FacebookProperty';
import { socialToolConfig } from './socialTool/SocialTool';

const unlayer = window.unlayer;

unlayer.registerPropertyEditor(twitterPropertyConfig);
unlayer.registerPropertyEditor(linkedInPropertyConfig);
unlayer.registerPropertyEditor(facebookPropertyConfig);
unlayer.registerTool(socialToolConfig);
export default { subscribeTool, socialShareTool };
