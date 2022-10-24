class ElectronStore {
  get<T = unknown>(key: string, defaultValue: T): T {
    return store_bridge.getElectronStoreData(key, defaultValue)
  }

  set(key: string, value: unknown) {
    store_bridge.setElectronStoreData(key, value)
  }
}
const electronStore = new ElectronStore()

export default electronStore