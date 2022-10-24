import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('window_bridge', {
  goToHome: () => ipcRenderer.send('Window:GoToHome')
})

contextBridge.exposeInMainWorld('git_bridge', {
  //#region branch
  getBranches: (repoID: string) => ipcRenderer.send('Git:Branch:GetBranches', repoID),
  getLocalBranches: (repoID: string) => ipcRenderer.send('Git:Branch:GetLocalBranches', repoID),
  deleteLocalBranch: (repoID: string, branchName: string, forceDelete = false) => ipcRenderer.send('Git:Branch:DeleteLocalBranch', repoID, branchName, forceDelete),
  deleteLocalBranches: (repoID: string, branchNames: string[], forceDelete = false) => ipcRenderer.send('Git:Branch:DeleteLocalBranches', repoID, branchNames, forceDelete)
  //#endregion
})