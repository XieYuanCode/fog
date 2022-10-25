import { contextBridge, ipcRenderer } from "electron";
import type { OpenDialogSyncOptions } from "electron"

contextBridge.exposeInMainWorld('window_bridge', {
  goToHome: () => ipcRenderer.send('Window:GoToHome')
})

contextBridge.exposeInMainWorld("store_bridge", {
  getElectronStoreData: (key: string, defaultValue: unknown) => ipcRenderer.sendSync("GetStoreData", key, defaultValue),
  setElectronStoreData: (key: string, value: unknown) => ipcRenderer.send("SetStoreData", key, value),
})

contextBridge.exposeInMainWorld('git_bridge', {
  //#region branch
  getBranches: (repoID: string) => ipcRenderer.sendSync('Git:Branch:GetBranches', repoID),
  getLocalBranches: (repoID: string) => ipcRenderer.sendSync('Git:Branch:GetLocalBranches', repoID),
  deleteLocalBranch: (repoID: string, branchName: string, forceDelete = false) => ipcRenderer.send('Git:Branch:DeleteLocalBranch', repoID, branchName, forceDelete),
  deleteLocalBranches: (repoID: string, branchNames: string[], forceDelete = false) => ipcRenderer.send('Git:Branch:DeleteLocalBranches', repoID, branchNames, forceDelete)
  //#endregion
})

contextBridge.exposeInMainWorld("common_bridge", {
  getPath: (key: string) => ipcRenderer.sendSync("Common:GetPath", key),
  showOpenDialogSync: (options: OpenDialogSyncOptions) => ipcRenderer.sendSync("Common:showOpenDialogSync", options)
})