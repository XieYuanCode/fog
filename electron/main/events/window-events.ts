import { ipcMain } from "electron"
import windowManager from "../windowManager"
import store from "../store"
import { ServiceAccountType } from "../types/ServiceAccountType"

const initWindowEvents = () => {
  ipcMain.on("Window:GoToHome", () => {  //欢迎页面关闭 跳转主页面
    windowManager.welcomeWindow.hide()
    windowManager.mainWindow.show()

    store.set("isFirstLoad", false)
  })

  ipcMain.handle("Window:OpenAddServiceAccountWindow", async (event, type: ServiceAccountType, parent: 'welcome' | 'main') => {
    return new Promise((resolve, reject) => {
      windowManager.createAddServiceAccountWindow(type, parent)
      resolve(null)
    })
  })

  ipcMain.handle("Window:closeAddServiceAccountWindow", async (event) => {
    return new Promise((resolve, reject) => {
      windowManager.addServiceAccountWindow.close()
      windowManager.addServiceAccountWindow = null;
      resolve(null)
    })
  })
}
export default initWindowEvents