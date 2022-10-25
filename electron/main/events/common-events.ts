import { app, ipcMain } from "electron";

const initCommonEvents = () => {
  ipcMain.on("Common:GetPath", (event, key: 'home' | 'appData' | 'userData' | 'sessionData' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps') => {
    event.returnValue = app.getPath(key)
  })
}

export default initCommonEvents;