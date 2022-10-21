import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { join } from 'path'
import { prePrepareForEnvironment, prePrepareForPlatform, setAboutPanelOptions } from './common'
import store, { initRendererStore } from "./store";
import windowManager from "./windowManager";

prePrepareForPlatform(); //各个平台的适配工作
prePrepareForEnvironment(); //准备环境变量
setAboutPanelOptions() //设置应用程序的"关于"面板选项

initRendererStore(); // 初始化渲染进程Store

let mainWindow: BrowserWindow | null = null //主窗口
let welcomeWindow: BrowserWindow | null = null //欢迎窗口
let addServiceAccountWindow: BrowserWindow | null = null //添加服务账号窗口
let settingWindow: BrowserWindow | null = null //设置窗口
let quickOpenWin: BrowserWindow | null = null //快速启动窗口


app.on("ready", () => {
  mainWindow = windowManager.createMainWindow(); //创建主窗口
})

app.on('window-all-closed', () => {
  windowManager.killAllWindows();
  if (process.platform !== 'darwin') app.quit()
})

// app.on('second-instance', () => {
//   if (win) {
//     // Focus on the main window if the user tried to open another
//     if (win.isMinimized()) win.restore()
//     win.focus()
//   }
// })

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    mainWindow = windowManager.createMainWindow(); //创建主窗口
  }
})

// new window example arg: new windows url
// ipcMain.handle('open-win', (event, arg) => {
//   const childWindow = new BrowserWindow({
//     webPreferences: {
//       preload,
//       nodeIntegration: true,
//       contextIsolation: false,
//     },
//   })

//   if (app.isPackaged) {
//     childWindow.loadFile(indexHtml, { hash: arg })
//   } else {
//     childWindow.loadURL(`${url}#${arg}`)
//     // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
//   }
// })
