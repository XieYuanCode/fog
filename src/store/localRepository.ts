import { defineStore } from "pinia"
import { ILocalRepositoryStoreState, ILocalRepositoryStoreAction, ILocalRepositoryStoreGetter } from "src/types/store/localRepository"
import type { _GettersTree } from "pinia";
import { GitRepository } from "../types/GitRepository";
import { sendNotification } from "../utils/notifications";
import electronStore from "../utils/electronStore";
import { createGroupTreeItem, createRepoTreeItem } from "../utils/treeFactory";
import { ILocalRepoGroupViewModel } from "../types/ILocalRepoGroupViewModel";

const parseRepoExplorerLocation = (repo: GitRepository) => {

}
const parseGroupExplorerLocation = (groups: ILocalRepoGroupViewModel[]) => {
  let result = []

  groups.forEach(group => {
    if (group.explorer_location === "/") {
      result.push(createGroupTreeItem(group))
    }
  })

}
export const useLocalRepositoryStore = defineStore<"localRepository", ILocalRepositoryStoreState, _GettersTree<ILocalRepositoryStoreGetter>, ILocalRepositoryStoreAction>('localRepository', {
  state: () => {
    return {
      localRepositories: electronStore.get("localRepository.localRepositories", []),
      groups: electronStore.get("localRepository.groups", []),
      explorerSort: electronStore.get("localRepository.explorerSort", 'name')
    }
  },
  getters: {
    localRepositoriesTreeData: (state: ILocalRepositoryStoreState) => {
      let result: any = []

      state.groups.forEach(group => {
        if (group.explorer_location === "/") {
          const groupItem = createGroupTreeItem(group)
          result.push(groupItem)
        } else {
          const paths = group.explorer_location.split("/")
        }
      })

      state.localRepositories.forEach(localRepository => {
        if (localRepository.explorer_location === "/") {
          const treeItem = createRepoTreeItem(localRepository)
          result.push(treeItem)
        } else {
          const addresses = localRepository.explorer_location.split("/").splice(0, 1)
        }
      })

      return result;
    },
    pined: (state: ILocalRepositoryStoreState) => {
      const result: any = []
      const pinedRepos = state.localRepositories.filter(localRepository => localRepository.pined === true)

      if (!pinedRepos) return
      pinedRepos.forEach(pinedRepo => {
        const treeItem = createRepoTreeItem(pinedRepo)

        result.push(treeItem)
      })

      return result;
    }
  },
  actions: {
    addLocalRepository(location: string, name: string, explorer_location: string) {
      const isExist = this.localRepositories.find(localRepository => location === localRepository.location)

      if (isExist) {
        // TODO: send notification
        sendNotification(`Repository: ${name} Was Already Existing`)
        return
      }

      const localGitRepository = new GitRepository(location, name, explorer_location)

      this.localRepositories.push(localGitRepository)

      electronStore.set("localRepository.localRepositories", JSON.parse(JSON.stringify(this.localRepositories)))
    },
    deleteAllInvalidRepositories() {
      this.localRepositories = this.localRepositories.filter(localRepository => localRepository.available === true)

      electronStore.set("localRepository.localRepositories", JSON.parse(JSON.stringify(this.localRepositories)))
    },
    addGroup(explorer_location: string) {
      this.groups.push({ label: "New Group", explorer_location, type: 'normal' })

      electronStore.set("localRepository.groups", JSON.parse(JSON.stringify(this.groups)))
    },
    addAttachedGroup(explorer_location: string, attachDirectory: string, name: string) {
      this.groups.push({ label: name, explorer_location, type: 'attach', attachDirectory })

      electronStore.set("localRepository.groups", JSON.parse(JSON.stringify(this.groups)))
    },
    sortByName() {
      // TODO: sort
      this.explorerSort = 'name'
      electronStore.set("localRepository.explorerSort", 'name')
    },
    sortByType() {
      // TODO: sort
      this.explorerSort = 'type'
      electronStore.set("localRepository.explorerSort", 'type')
    },
    pinRepo(repoID: string) {
      const target = this.localRepositories.find(repo => repo.id === repoID)

      if (!target) return

      target.pined = true;
      electronStore.set("localRepository.localRepositories", JSON.parse(JSON.stringify(this.localRepositories)))
    },
    unPinRepo(repoID) {
      const target = this.localRepositories.find(repo => repo.id === repoID)

      if (!target) return

      target.pined = false;
      electronStore.set("localRepository.localRepositories", JSON.parse(JSON.stringify(this.localRepositories)))
    },
  }
})