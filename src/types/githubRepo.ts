export interface IGitHubRepository { 
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: any
  html_url: string
  description: string
  fork: boolean
  url: string
  git_url: string
  ssh_url: string
  clone_url: string
}
