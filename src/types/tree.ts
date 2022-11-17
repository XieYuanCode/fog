export interface ITreeItem<T> {
  label: string
  source?: T
  type: 'repo' | "group"
}