import { app, BrowserWindow, systemPreferences } from 'electron'
import { prePrepareForEnvironment, prePrepareForPlatform, setAboutPanelOptions, setAsDefaultProtocolClient } from './common'
import store, { initRendererStore } from "./store";
import windowManager from "./windowManager";
import initAllEvents from "./events"

prePrepareForPlatform(); //各个平台的适配工作
prePrepareForEnvironment(); //准备环境变量
setAboutPanelOptions() //设置应用程序的"关于"面板选项

initRendererStore(); // 初始化渲染进程Store

initAllEvents(); //初始化所有进程间事件

// store.set("appearance.color", `#${systemPreferences.getAccentColor().substring(0, 6)}`) // 存储系统色彩主题

app.whenReady().then(() => {
  setAsDefaultProtocolClient()

  windowManager.createMainWindow(); //创建主窗口
  const isFirstLoad = store.get('isFirstLoad', true) //是否第一次加载应用

  console.log(isFirstLoad);

  if (isFirstLoad) {
    windowManager.createWelcomeWindow();
    windowManager.welcomeWindow.show();
  } else {
    windowManager.mainWindow.show();
  }
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
    windowManager.createMainWindow(); //创建主窗口
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
