import { contextBridge, ipcRenderer } from "electron";
import type { OpenDialogSyncOptions } from "electron"
import { ServiceAccountType } from "../main/types/ServiceAccountType";

contextBridge.exposeInMainWorld('window_bridge', {
  goToHome: () => ipcRenderer.send('Window:GoToHome'),
  openAddServiceAccountWindow: (type: ServiceAccountType, parent: 'welcome' | "main") => ipcRenderer.invoke("Window:OpenAddServiceAccountWindow", type, parent),
  closeAddServiceAccountWindow: () => ipcRenderer.invoke("Window:closeAddServiceAccountWindow")
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
  deleteLocalBranches: (repoID: string, branchNames: string[], forceDelete = false) => ipcRenderer.send('Git:Branch:DeleteLocalBranches', repoID, branchNames, forceDelete),
  //#endregion
  //#region  config
  getGitVersion: () => ipcRenderer.invoke('Git:GetGitVersion'),
  getGlobalUsername: () => ipcRenderer.invoke('Git:GetGlobalUsername'),
  getGlobalEmailAddress: () => ipcRenderer.invoke('Git:GetGlobalEmailAddress'),
  setGlobalUsername: (name: string) => ipcRenderer.invoke('Git:SetGlobalUsername', [name]),
  setGlobalEmailAddress: (email: string) => ipcRenderer.invoke('Git:SetGlobalEmailAddress', [email]),
  //#endregion
})

contextBridge.exposeInMainWorld("common_bridge", {
  getPath: (key: string) => ipcRenderer.sendSync("Common:GetPath", key),
  showOpenDialogSync: (options: OpenDialogSyncOptions) => ipcRenderer.sendSync("Common:showOpenDialogSync", options),
  openExternal: (address: string) => ipcRenderer.send("Common:OpenExternal", address),
  showContextMenu: (...args) => ipcRenderer.send("Common:ShowContextMenu", ...args),
  onContextMenuClicked: (callback) => ipcRenderer.on('Common:ContextMenuClicked', callback),
  confirm: (title: string, message: string, detail: string) => ipcRenderer.invoke("Common:Confirm", title, message, detail)
})