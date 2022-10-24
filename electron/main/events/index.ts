import initElectronStoreEvents from "./electron-store-events";
import initWindowEvents from "./window-events"

const initAllEvents = () => { 
  initWindowEvents()
  initElectronStoreEvents()
}

export default initAllEvents;
 