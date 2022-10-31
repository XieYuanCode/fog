import { defineStore } from "pinia";
import type { _GettersTree } from "pinia";
import { IServiceAccountsAction, IServiceAccountsGetter, IServiceAccountsState } from "src/types/store/serviceAccounts";
import { uuid } from "src/utils/common";
import electronStore from "../utils/electronStore";

export const useServiceAccounts = defineStore<"serviceAccounts", IServiceAccountsState, _GettersTree<IServiceAccountsGetter>, IServiceAccountsAction>("serviceAccounts", {
  state: () => {
    return {
      accounts: []
    }
  },
  actions: {
    addServiceAccount(serviceAccount) {
      // 默认值配置
      serviceAccount.uuid = uuid();
      serviceAccount.defaultCloneProtocol = "http";
      serviceAccount.isAvailable = true;

      this.accounts.push(serviceAccount)
      electronStore.set('serviceAccounts', this.accounts)
    },
    deleteServiceAccount(id) {
      const index = this.accounts.findIndex((account) => account.uuid === id)
      if (index > -1) {
        this.accounts.splice(index, 1)
        electronStore.set("serviceAccounts", this.accounts)
      }
    },
    updateServiceAccount(serviceAccount) {
      if (!serviceAccount.uuid) return
      const index = this.accounts.findIndex(account => account.uuid === serviceAccount.uuid)
      if (index === -1) return
      this.accounts.splice(index, 1, serviceAccount)
      electronStore.set("serviceAccounts", this.accounts)
    },
    refreshServiceAccount(id) {

    },
    setPrivateKey(id, key) {
      const index = this.accounts.findIndex((account) => account.uuid === id)
      if (index > -1) {
        this.accounts[index].sshKey = key;
        electronStore.set("serviceAccounts", this.accounts)
      }
    },
    setDefaultCloneProtocol(id, defaultCloneProtocol) {
      const index = this.accounts.findIndex((account) => account.uuid === id)
      if (index > -1) {
        this.accounts[index].defaultCloneProtocol = defaultCloneProtocol;
        electronStore.set("serviceAccounts", this.accounts)
      }
    },
  }
})