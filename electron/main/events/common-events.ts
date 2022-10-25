import { app, ipcMain, dialog } from "electron";
import type { OpenDialogSyncOptions } from "electron"

const initCommonEvents = () => {
  ipcMain.on("Common:GetPath", (event, key: 'home' | 'appData' | 'userData' | 'sessionData' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps') => {
    event.returnValue = app.getPath(key)
  })
  ipcMain.on("Common:showOpenDialogSync", (event, options) => {
    const selected = dialog.showOpenDialogSync(options)
    event.returnValue = selected;
  })
}

export default initCommonEvents;