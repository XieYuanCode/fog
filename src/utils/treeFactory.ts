import { ITreeItem } from "../types/tree";
import { GitRepository } from "../types/GitRepository";
import { ILocalRepoGroupViewModel } from "../types/ILocalRepoGroupViewModel";

export const createRepoTreeItem = (repo: GitRepository): ITreeItem<GitRepository> => {
  return {
    label: repo.name,
    source: repo,
    type: 'repo'
  }
}

export const createGroupTreeItem = (group: ILocalRepoGroupViewModel): ITreeItem<ILocalRepoGroupViewModel> => {
  return {
    label: group.label,
    type: 'group',
    source: group
  }
}