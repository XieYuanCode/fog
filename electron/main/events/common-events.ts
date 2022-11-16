import { app, ipcMain, dialog, shell, Menu, Notification } from "electron";
import type { OpenDialogSyncOptions } from "electron"
import windowManager from "../windowManager";


const initCommonEvents = () => {
  ipcMain.on("Common:GetPath", (event, key: 'home' | 'appData' | 'userData' | 'sessionData' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps') => {
    event.returnValue = app.getPath(key)
  })
  ipcMain.on("Common:showOpenDialogSync", (event, options: OpenDialogSyncOptions) => {
    const selected = dialog.showOpenDialogSync(options)
    event.returnValue = selected;
  })
  ipcMain.on("Common:OpenExternal", (_, address: string) => {
    shell.openExternal(address)
  })
  ipcMain.on("Common:ShowContextMenu", (_, template, x, y) => {
    const contentMenu = Menu.buildFromTemplate(template)
    const activeWindow = windowManager.currentActiveWindow || windowManager.mainWindow;

    const setClick = (menuItems) => {
      menuItems.forEach(menuItem => {
        if (menuItem.submenu && menuItem.submenu.items.length > 0) {
          setClick(menuItem.submenu.items)
        } else {
          menuItem.click = () => {
            activeWindow && activeWindow.webContents.send('Common:ContextMenuClicked', menuItem.id)
          }
        }
      })
    }

    setClick(contentMenu.items)


    contentMenu.popup({
      window: activeWindow,
      x, y
    })
  })
  ipcMain.handle("Common:Confirm", async (_, title: string, message: string, detail: string) => {
    const result = await dialog.showMessageBox(windowManager.currentActiveWindow || windowManager.mainWindow, {
      title,
      message,
      detail,
      buttons: ["OK", "Cancel"]
    })

    return result;
  })
  ipcMain.on("Common:SetOpenOnLogin", (_, openOnLogin: boolean) => {
    app.setLoginItemSettings({
      openAtLogin: openOnLogin
    })
  })
}

export default initCommonEvents;