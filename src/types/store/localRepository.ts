import type { BranchSummary, StatusResult, TagResult } from "simple-git";
import { GitRepository } from "../GitRepository";
import { ILocalRepoGroupViewModel } from "../ILocalRepoGroupViewModel";
import { GitSubmodule } from "../submodule";

export interface ILocalRepositoryStoreState {
  localRepositories: Array<GitRepository>
  groups: Array<ILocalRepoGroupViewModel>
  explorerSort: 'name' | "type"
}
export interface ILocalRepositoryStoreGetter {
  localRepositoriesTreeData: () => Array<any>
  pined: () => Array<any>
}
export interface ILocalRepositoryStoreAction {
  addLocalRepository: (location: string, name: string, explorer_location: string) => void
  deleteAllInvalidRepositories: () => void
  sortByName: () => void
  sortByType: () => void
  addGroup: (explorer_location: string) => void
  addAttachedGroup: (explorer_location: string, attachDirectory: string, name: string) => void
  pinRepo: (repoID: string) => void
  unPinRepo: (repoID: string) => void
  updateRepoBranches: (repoID: string, branches: BranchSummary) => void
  updateRepoStatus: (repoID: string, status: StatusResult) => void
  updateRepoTags: (repoID: string, tags: TagResult) => void
  updateRepoSubmodules: (repoID: string, submodulesString: string) => void
}