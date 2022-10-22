import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('fog_bridge', {
  goToHome: () => ipcRenderer.send('GoToHome')
})