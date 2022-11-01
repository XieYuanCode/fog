export interface IGitlabRepository {
  id: number
  description: string
  name: string
  name_with_namespace: string
  path: string
  path_with_namespace: string
  created_at: string
  default_branch: string
  tag_list: string[]
  ssh_url_to_repo: string
  http_url_to_repo: string
  web_url: string
  readme_url: string
  avatar_url: string
  owner: any
  visibility: string
}
