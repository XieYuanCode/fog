import { defineStore } from "pinia"
import { ILocalRepositoryStoreState, ILocalRepositoryStoreAction, ILocalRepositoryStoreGetter } from "src/types/store/localRepository"
import type { _GettersTree } from "pinia";
import { GitRepository } from "../types/GitRepository";
import { sendNotification } from "../utils/notifications";
import electronStore from "../utils/electronStore";

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

      state.localRepositories.forEach(localRepository => {
        const treeItem = {
          label: localRepository.name,
          id: localRepository.id
        }

        result.push(treeItem)
      })

      return result;
    },
    pined: (state: ILocalRepositoryStoreState) => {
      const result: any = []
      const pinedRepos = state.localRepositories.filter(localRepository => localRepository.pined === true)

      if (!pinedRepos) return
      pinedRepos.forEach(pinedRepo => {
        const treeItem = {
          label: pinedRepo.name,
          id: pinedRepo.id
        }

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
      this.groups.push({ label: "New Group", explorer_location })

      electronStore.set("localRepository.groups", this.groups)
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