import { app, BrowserWindow } from "electron";
import { join } from "path";
import windowStateKeeper from "electron-window-state";
import type { BrowserWindowConstructorOptions } from "electron"
import { ServiceAccountType } from "./types/ServiceAccountType";

class WindowManager {
  public mainWindow: BrowserWindow | null = null //主窗口
  public welcomeWindow: BrowserWindow | null = null //欢迎窗口
  public addServiceAccountWindow: BrowserWindow | null = null //添加服务账号窗口
  public settingWindow: BrowserWindow | null = null //设置窗口
  public quickOpenWindow: BrowserWindow | null = null //快速启动窗口
  public cloneGitWindow: BrowserWindow | null = null //克隆窗口

  public get currentActiveWindow(): BrowserWindow {
    return BrowserWindow.getFocusedWindow()
  }

  private _distDir = join(__dirname, '..', "../dist")
  private _publicDir = app.isPackaged ? this._distDir : join(__dirname, '..', '../public')

  private _preloadFileAddress: string = join(__dirname, '../preload/index.js'); //preload文件路径
  private _baseDevelopUrl: string = process.env.VITE_DEV_SERVER_URL; //基础dev地址
  private _baseIndexHtmlAddress: string = join(this._distDir, "index.html"); //基础html地址

  private _mainWindowState: windowStateKeeper.State;

  private _basicWindowOption: BrowserWindowConstructorOptions = {
    title: app.getName(),
    movable: true,
    icon: join(this._publicDir, "application-icon", "icon.png"),
    frame: process.platform === "win32",
    titleBarStyle: "hidden",
    titleBarOverlay: process.platform === "win32",
    vibrancy: 'popover',
    visualEffectState: "active",
    show: false,
    webPreferences: {
      preload: this._preloadFileAddress,
      spellcheck: false,
      devTools: true
    }
  }

  private _preventWindowClose(window: BrowserWindow) {
    window.on("close", e => {
      e.preventDefault()
      window.hide()
    })
  }

  /**
   * 创建主窗口
   */
  public createMainWindow(): BrowserWindow {
    if (this.mainWindow) {
      this.mainWindow.show()
      return;
    }
    this._mainWindowState = windowStateKeeper({ defaultWidth: 1920, defaultHeight: 1080 })

    this.mainWindow = new BrowserWindow({
      x: this._mainWindowState.x,
      y: this._mainWindowState.y,
      width: this._mainWindowState.width,
      height: this._mainWindowState.height,
      resizable: true,
      ...this._basicWindowOption
    })

    this._mainWindowState.manage(this.mainWindow);

    if (app.isPackaged) {
      this.mainWindow.loadFile(this._baseIndexHtmlAddress)
    } else {
      this.mainWindow.loadURL(this._baseDevelopUrl)
    }

    this._preventWindowClose(this.mainWindow)

    this.mainWindow.webContents.openDevTools()

    return this.mainWindow;
  }

  public createWelcomeWindow(): BrowserWindow {
    if (this.welcomeWindow) {
      this.welcomeWindow.show()
      return;
    }
    this.welcomeWindow = new BrowserWindow({
      width: 1000,
      height: 600,
      resizable: false,
      fullscreenable: false,
      center: true,
      ...this._basicWindowOption
    })

    if (app.isPackaged) {
      this.welcomeWindow.loadFile(this._baseIndexHtmlAddress + "/#/welcome")
    } else {
      this.welcomeWindow.loadURL(`${this._baseDevelopUrl}#/welcome`)
    }

    this._preventWindowClose(this.welcomeWindow)

    return this.welcomeWindow;
  }

  public createAddServiceAccountWindow(type: ServiceAccountType, parent: "welcome" | 'main'): BrowserWindow {
    if (this.addServiceAccountWindow) {
      return
    }

    this.addServiceAccountWindow = new BrowserWindow({
      width: 640,
      height: 480,
      movable: true,
      resizable: false,
      ...this._basicWindowOption
    })

    if (app.isPackaged) {
      this.addServiceAccountWindow.loadFile(this._baseIndexHtmlAddress + `/#/addServiceAccount/${type}`)
    } else {
      this.addServiceAccountWindow.loadURL(`${this._baseDevelopUrl}#/addServiceAccount/${type}`)
    }

    this.addServiceAccountWindow.once('ready-to-show', () => this.addServiceAccountWindow.show())

    return this.addServiceAccountWindow;
  }

  public createSettingWindow(): BrowserWindow {
    if (this.settingWindow) {
      this.settingWindow.show()
      return;
    }

    this.settingWindow = new BrowserWindow({
      width: 1000,
      height: 600,
      resizable: false,
      fullscreenable: false,
      center: true,
      ...this._basicWindowOption
    })

    if (app.isPackaged) {
      this.settingWindow.loadFile(this._baseIndexHtmlAddress + "/#/setting")
    } else {
      this.settingWindow.loadURL(`${this._baseDevelopUrl}#/setting`)
    }

    this._preventWindowClose(this.settingWindow)

    // this.settingWindow.webContents.openDevTools()

    return this.settingWindow
  }

  public createCloneGitWindow(): BrowserWindow {
    if (this.cloneGitWindow) {
      this.cloneGitWindow.show()
      return;
    }

    this.cloneGitWindow = new BrowserWindow({
      width: 640,
      height: 480,
      resizable: false,
      roundedCorners: true,
      ...this._basicWindowOption
    })

    if (app.isPackaged) {
      this.cloneGitWindow.loadFile(this._baseIndexHtmlAddress + `/#/clone`)
    } else {
      this.cloneGitWindow.loadURL(`${this._baseDevelopUrl}#/clone`)
    }

    this.cloneGitWindow.once('ready-to-show', () => this.cloneGitWindow.show())
    this.cloneGitWindow.on('close', () => this.cloneGitWindow = null)

    this.cloneGitWindow.webContents.openDevTools()

    return this.cloneGitWindow
  }

  public killAllWindows() {
    this._mainWindowState.unmanage()
    this.mainWindow && this.mainWindow.close()
    this.mainWindow && (this.mainWindow = null)

    this.welcomeWindow && this.welcomeWindow.close()
    this.welcomeWindow && (this.welcomeWindow = null)

    this.settingWindow && this.settingWindow.close()
    this.settingWindow && (this.settingWindow = null)

    this.addServiceAccountWindow && this.addServiceAccountWindow.close()
    this.addServiceAccountWindow && (this.addServiceAccountWindow = null)

    this.quickOpenWindow && this.quickOpenWindow.close()
    this.quickOpenWindow && (this.quickOpenWindow = null)

    this.cloneGitWindow && this.cloneGitWindow.close()
    this.cloneGitWindow && (this.cloneGitWindow = null)
  }
}

const windowManager = new WindowManager()
export default windowManager;