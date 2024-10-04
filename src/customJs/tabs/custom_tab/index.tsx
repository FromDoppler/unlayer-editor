import { ReactTabDefinition } from "../../types";
import CustomTabViewer from "./CustomTabViewer";

export const  getCustomTabDefinition: () => ReactTabDefinition = () => ({
  name: 'my_tab',
  label: 'My Tab',
  icon: 'fa-smile',
  supportedDisplayModes: ['popup'],
  renderer: {Panel: CustomTabViewer}
  })