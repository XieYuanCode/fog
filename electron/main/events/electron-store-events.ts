import { ipcMain } from "electron"
import store from "../store"

const initElectronStoreEvents = () => {
  ipcMain.on("GetStoreData", (_, key: string, defaultValue: unknown) => {
    _.returnValue = store.get(key, defaultValue)
  })

  ipcMain.on("SetStoreData", (_, key: string, value: unknown) => {
    store.set(key, value)
  })
}

export default initElectronStoreEvents