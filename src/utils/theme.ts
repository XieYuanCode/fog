import { ThemeType } from "../types/theme"

export const switchTheme = (theme: ThemeType) => {
  if (theme === ThemeType.Dark) {
    document.getElementsByTagName('html')[0]?.classList.add("dark")
    removeSystemThemeChangedEventListener()
  } else if (theme === ThemeType.Light) {
    document.getElementsByTagName('html')[0]?.classList.remove("dark")
    removeSystemThemeChangedEventListener()
  } else if (theme === ThemeType.System) {
    const isDark = window.matchMedia('(prefers-color-scheme: Dark)').matches

    if (isDark) {
      document.getElementsByTagName('html')[0]?.classList.add("dark")
    } else {
      document.getElementsByTagName('html')[0]?.classList.remove("dark")
    }

    addSystemThemeChangedEventListener()
  }
}

export const changeColor = (color: string) => {
  const el = document.documentElement;
  el.style.setProperty('--el-color-primary', color)
}

const handler = () => {
  switchTheme(ThemeType.System)
}

const eventTarget = window.matchMedia('(prefers-color-scheme: Dark)')

export const addSystemThemeChangedEventListener = () => {
  eventTarget.addEventListener('change', handler)
}
export const removeSystemThemeChangedEventListener = () => {
  eventTarget.removeEventListener('change', handler)
}