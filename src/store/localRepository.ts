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
        sendNotification(`Add Git Repository Failed`, {
          body: `Repository: ${name} Was Already Existing`,
        })
        return
      }

      const localGitRepository = new GitRepository(location, name, explorer_location)

      this.localRepositories.push(localGitRepository)

      electronStore.set("localRepository.localRepositories", JSON.parse(JSON.stringify(this.localRepositories)))

      git_bridge.getRepoGitInfo(location).then(result => {
        result.branches.isSuccess === true && this.updateRepoBranches(localGitRepository.id, result.branches.result)
        result.status.isSuccess === true && this.updateRepoStatus(localGitRepository.id, result.status.result)
        result.tags.isSuccess === true && this.updateRepoTags(localGitRepository.id, result.tags.result)
        result.submodules.isSuccess === true && this.updateRepoSubmodules(localGitRepository.id, result.submodules.result)
      })
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
      const isExist = this.groups.find(group => (group.type === 'attach' && group.attachDirectory === attachDirectory))

      if (isExist) {
        sendNotification(`Attach Local Directory Failed`, {
          body: `The directory you selected is already attached, please do not reattach`
        })

        return
      }

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
    updateRepoBranches(repoID, branches) {
      const target = this.localRepositories.find(repo => repo.id === repoID)
      if (!target) return

      target.branches = branches;
      electronStore.set("localRepository.localRepositories", JSON.parse(JSON.stringify(this.localRepositories)))
    },

    updateRepoStatus(repoID, status) {
      const target = this.localRepositories.find(repo => repo.id === repoID)
      if (!target) return

      target.status = status;
      electronStore.set("localRepository.localRepositories", JSON.parse(JSON.stringify(this.localRepositories)))
    },

    updateRepoTags(repoID, tags) {
      const target = this.localRepositories.find(repo => repo.id === repoID)
      if (!target) return

      target.tags = tags;
      electronStore.set("localRepository.localRepositories", JSON.parse(JSON.stringify(this.localRepositories)))
    },

    updateRepoSubmodules(repoID, submodulesString) {
      const target = this.localRepositories.find(repo => repo.id === repoID)
      if (!target) return

      target.setSubmodulesByString(submodulesString)
      electronStore.set("localRepository.localRepositories", JSON.parse(JSON.stringify(this.localRepositories)))
    },
  }
})