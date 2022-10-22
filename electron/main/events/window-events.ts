import { ipcMain } from "electron"
import windowManager from "../windowManager"
import store from "../store"

const initWindowEvents = () => {
  ipcMain.on("GoToHome", () => {  //欢迎页面关闭 跳转主页面
    windowManager.welcomeWindow.hide()
    windowManager.mainWindow.show()

    store.set("isFirstLoad", false)
  })
}

export default initWindowEvents