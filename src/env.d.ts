/// <reference types="vite/client" />

import { ThemeType } from './types/theme'
import type { BranchSummary } from "simple-git"

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

