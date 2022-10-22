import { app, BrowserWindow } from "electron";
import { join } from "path";
import windowStateKeeper from "electron-window-state";
import type { BrowserWindowConstructorOptions } from "electron"

class WindowManager {
  public mainWindow: BrowserWindow | null = null //主窗口
  public welcomeWindow: BrowserWindow | null = null //欢迎窗口
  public addServiceAccountWindow: BrowserWindow | null = null //添加服务账号窗口
  public settingWindow: BrowserWindow | null = null //设置窗口
  public quickOpenWin: BrowserWindow | null = null //快速启动窗口

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

    return this.mainWindow;
  }

  public createWelcomeWindow(): BrowserWindow {
    console.log(this._preloadFileAddress);
    this.welcomeWindow = new BrowserWindow({
      width: 400,
      height: 600,
      resizable: false,
      ...this._basicWindowOption
    })

    if (app.isPackaged) {
      this.welcomeWindow.loadFile(this._baseIndexHtmlAddress + "/#/welcome")
    } else {
      this.welcomeWindow.loadURL(`${this._baseDevelopUrl}#/welcome`)
    }

    return this.welcomeWindow;
  }

  public killAllWindows() {
    this._mainWindowState.unmanage()
    this.mainWindow = null;
  }
}

const windowManager = new WindowManager()
export default windowManager;