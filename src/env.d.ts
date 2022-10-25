/// <reference types="vite/client" />

import { ThemeType } from './types/theme'
import type { BranchSummary } from "simple-git"

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare var window_bridge: {
  goToHome: () => void,
}

declare var store_bridge: {
  getElectronStoreData: <T = unknown>(key: string, defaultValue: unknown) => T,
  setElectronStoreData: (key: string, value: unknown) => void
}

declare var git_bridge: {
  getBranches: (repoID: string) => void
  getLocalBranches: (repoID: string) => void
  deleteLocalBranch: (repoID: string, branchName: string, forceDelete = false) => Promise<BranchSummary>
  deleteLocalBranches: (repoID: string, branchNames: string[], forceDelete = false) => Promise<BranchSummary>
}

declare var common_bridge: {
  getPath: (key: 'home' | 'appData' | 'userData' | 'sessionData' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps') => string
}
