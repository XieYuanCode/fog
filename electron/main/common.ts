import { release } from "os";
import { app } from "electron";
import { join } from "path";
import { COPYRIGHY } from "./const"

/**
 * 各个平台的适配工作
 */
export const prePrepareForPlatform = () => {
  // Disable GPU Acceleration for Windows 7
  if (release().startsWith('6.1')) {
    app.disableHardwareAcceleration()
  }

  // Set application name for Windows 10+ notifications
  if (process.platform === 'win32') {
    app.setAppUserModelId(app.getName())
  }
}

/**
 * 准备环境变量
 */
export const prePrepareForEnvironment = () => {
  process.env.DIST_ELECTRON = join(__dirname, '..')
  process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
  process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST_ELECTRON, '../public')
}

/**
 * 设置应用程序的"关于"面板选项
 */
export const setAboutPanelOptions = () => {
  app.setAboutPanelOptions({
    applicationName: app.getName(),
    applicationVersion: app.getVersion(),
    copyright: COPYRIGHY
  })
}