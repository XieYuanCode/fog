import initCommonEvents from "./common-events";
import initElectronStoreEvents from "./electron-store-events";
import initWindowEvents from "./window-events"

const initAllEvents = () => { 
  initWindowEvents()
  initElectronStoreEvents()
  initElectronStoreEvents()
  initCommonEvents()
}

export default initAllEvents;
 