import Store from "electron-store";

export const initRendererStore = () => { 
  Store.initRenderer();
}

const store = new Store()

export default store 