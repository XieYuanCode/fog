import initCommonEvents from "./common-events";
import initElectronStoreEvents from "./electron-store-events";
import initGitEvents from "./git-events";
import initWindowEvents from "./window-events"

const initAllEvents = () => { 
  initWindowEvents()
  initElectronStoreEvents()
  initCommonEvents()
  initGitEvents()
}

export default initAllEvents;
 