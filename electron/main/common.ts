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

export const setAsDefaultProtocolClient = () => {
  app.setAsDefaultProtocolClient('fog', process.execPath, [`${__dirname}`])
}

export const uuid = () => {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}