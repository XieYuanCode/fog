export interface ILocalRepoGroupViewModel {
  label: string
  explorer_location: string
  type: 'normal' | 'attach'
  attachDirectory?: string
}