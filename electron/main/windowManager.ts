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
      ...this._basicWindowOption
    })

    if (app.isPackaged) {
      this.welcomeWindow.loadFile(this._baseIndexHtmlAddress + "/#/welcome")
    } else {
      this.welcomeWindow.loadURL(`${this._baseDevelopUrl}#/welcome`)
    }

    // this.welcomeWindow.webContents.openDevTools()

    return this.welcomeWindow;
  }

  public createAddServiceAccountWindow(type: ServiceAccountType, parent: "welcome" | 'main'): BrowserWindow {
    if (this.addServiceAccountWindow) {
      return
    }

    this.addServiceAccountWindow = new BrowserWindow({
      width: 600,
      height: 280,
      parent: parent === 'main' ? this.mainWindow : this.welcomeWindow,
      modal: true,
      movable: false,
      resizable: false,
      ...this._basicWindowOption
    })

    if (app.isPackaged) {
      this.addServiceAccountWindow.loadFile(this._baseIndexHtmlAddress + `/#/addServiceAccount/${type}`)
    } else {
      this.addServiceAccountWindow.loadURL(`${this._baseDevelopUrl}#/addServiceAccount/${type}`)
    }

    this.addServiceAccountWindow.show()

    return this.addServiceAccountWindow;
  }

  public killAllWindows() {
    this._mainWindowState.unmanage()
    this.mainWindow = null;
  }
}

const windowManager = new WindowManager()
export default windowManager;