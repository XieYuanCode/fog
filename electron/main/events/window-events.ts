import { ipcMain, nativeTheme } from "electron"
import windowManager from "../windowManager"
import store from "../store"

const initWindowEvents = () => {
  ipcMain.on("Window:GoToHome", () => {  //欢迎页面关闭 跳转主页面
    windowManager.welcomeWindow.hide()
    windowManager.mainWindow.show()

    store.set("isFirstLoad", false)
  })
  ipcMain.on("ChangeTheme", (_, theme: 'System' | 'Light' | 'Dark') => {
    console.log("ChangeTheme", theme);
    nativeTheme.themeSource = theme.toLowerCase() as 'system' | 'light' | 'dark'
  })
}

export default initWindowEvents