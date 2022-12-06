import { app, BrowserWindow, systemPreferences } from 'electron'
import { prePrepareForEnvironment, prePrepareForPlatform, setAboutPanelOptions, setAsDefaultProtocolClient, uuid } from './common'
import store, { initRendererStore } from "./store";
import windowManager from "./windowManager";
import initAllEvents from "./events"
import fogDatabase from './database';

prePrepareForPlatform(); //各个平台的适配工作
prePrepareForEnvironment(); //准备环境变量
setAboutPanelOptions() //设置应用程序的"关于"面板选项
fogDatabase.prePrepareForDatabase() //初始化数据库

initRendererStore(); // 初始化渲染进程Store

initAllEvents(); //初始化所有进程间事件

// store.set("appearance.color", `#${systemPreferences.getAccentColor().substring(0, 6)}`) // 存储系统色彩主题

app.whenReady().then(() => {
  setAsDefaultProtocolClient()

  windowManager.createMainWindow(); //创建主窗口
  windowManager.createSettingWindow()
  const isFirstLoad = store.get('isFirstLoad', true) //是否第一次加载应用

  if (isFirstLoad) {
    windowManager.createWelcomeWindow();
    windowManager.welcomeWindow.show();
  } else {
    windowManager.mainWindow.show();
    windowManager.manageMainWindowState()
  }
})

app.on('window-all-closed', () => {
  windowManager.killAllWindows();
  console.log("window-all-closed");
  if (process.platform !== 'darwin') app.quit()
})

app.on('quit', () => {
  console.log("quite");
  windowManager.killAllWindows()
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    windowManager.createMainWindow(); //创建主窗口
  }
})