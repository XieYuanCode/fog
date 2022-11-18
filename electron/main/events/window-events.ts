import { ipcMain } from "electron"
import windowManager from "../windowManager"
import store from "../store"
import { ServiceAccountType } from "../types/ServiceAccountType"

const initWindowEvents = () => {
  ipcMain.on("Window:GoToHome", () => {  //欢迎页面关闭 跳转主页面
    windowManager.welcomeWindow.hide()
    windowManager.mainWindow.reload()
    windowManager.mainWindow.show()

    store.set("isFirstLoad", false)
  })

  ipcMain.on("Window:OpenAddServiceAccountWindow", (event, type: ServiceAccountType, parent: 'welcome' | 'main') => {
    windowManager.createAddServiceAccountWindow(type, parent)
  })

  ipcMain.on("Window:closeAddServiceAccountWindow", (event) => {
    windowManager.addServiceAccountWindow.close()
    windowManager.addServiceAccountWindow = null;
  })

  ipcMain.on("Window:OpenSetting", () => {
    if (windowManager.settingWindow) {
      windowManager.settingWindow.show()
    } else {
      windowManager.createSettingWindow()
    }
  })

  ipcMain.on("Window:OpenGitCloneWindow", (_) => windowManager.createCloneGitWindow())
  ipcMain.on("Window:CloseGitCloneWindow", (_) => {
    windowManager.cloneGitWindow.close()
    windowManager.cloneGitWindow = null;
  })

}
export default initWindowEvents