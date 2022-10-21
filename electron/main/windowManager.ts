import { app, BrowserWindow } from "electron";
import { join } from "path";
import windowStateKeeper from "electron-window-state";

class WindowManager {
  public mainWindow: BrowserWindow | null = null //主窗口
  public welcomeWindow: BrowserWindow | null = null //欢迎窗口
  public addServiceAccountWindow: BrowserWindow | null = null //添加服务账号窗口
  public settingWindow: BrowserWindow | null = null //设置窗口
  public quickOpenWin: BrowserWindow | null = null //快速启动窗口

  private _preloadFileAddress: string = join(__dirname, '../preload/index.js'); //preload文件路径
  private _baseDevelopUrl: string = process.env.VITE_DEV_SERVER_URL; //基础dev地址
  private _baseIndexHtmlAddress: string = process.env.DIST; //基础html地址

  private _mainWindowState: windowStateKeeper.State;

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
      title: app.getName(),
      resizable: true,
      movable: true,
      icon: join(process.env.PUBLIC, "application-icon", "icon.png"),
      frame: process.platform === "win32",
      titleBarStyle: "hidden",
      titleBarOverlay: process.platform === "win32",
      vibrancy: 'light',
      visualEffectState: "active",
      show: true,
      transparent: true,
      webPreferences: {
        spellcheck: false,
        devTools: true
      }
    })

    this._mainWindowState.manage(this.mainWindow);

    if (app.isPackaged) {
      this.mainWindow.loadFile(join(this._baseIndexHtmlAddress, "index.html"))
    } else {
      this.mainWindow.loadURL(this._baseDevelopUrl)
      this.mainWindow.webContents.openDevTools()
    }

    return this.mainWindow;
  }

  public killMainWindow() {
    if (!this.mainWindow) return;
    this._mainWindowState.unmanage()
    this.mainWindow = null;
  }
}

const windowManager = new WindowManager()
export default windowManager;