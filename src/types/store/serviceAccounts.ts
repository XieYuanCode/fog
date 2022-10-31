import { IServiceAccount } from "../IServiceAccount"

export interface IServiceAccountsState {
  accounts: Array<IServiceAccount>
}

export interface IServiceAccountsGetter { }
export interface IServiceAccountsAction {
  addServiceAccount: (serviceAccount: IServiceAccount) => void
  deleteServiceAccount: (id: string) => void
  updateServiceAccount: (serviceAccount: IServiceAccount) => void
  refreshServiceAccount: (id: string) => void
  setPrivateKey: (id: string, key: string) => void
  setDefaultCloneProtocol: (id: string, defaultCloneProtocol: 'http' | 'ssh') => void
}