import subscribeTool from './subscribeTool';
import { twitterPropertyConfig } from './socialTool/TwitterProperty';
import { linkedInPropertyConfig } from './socialTool/LinkedInProperty';
import { facebookPropertyConfig } from './socialTool/FacebookProperty';
import { socialToolConfig } from './socialTool/SocialTool';
import { socialShareToolConfig } from './socialShareTool';

const unlayer = window.unlayer;

// Register Properties and tool Social Tool
unlayer.registerPropertyEditor(twitterPropertyConfig);
unlayer.registerPropertyEditor(linkedInPropertyConfig);
unlayer.registerPropertyEditor(facebookPropertyConfig);
unlayer.registerTool(socialToolConfig);

// Register Properties and tool Social Share Tool
unlayer.registerTool(socialShareToolConfig);
export default { subscribeTool };
