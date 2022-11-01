import { uuid } from "../utils/common"

export interface IFogOwner {
  name: string
  description: string
  id: number
  web_url: string
  avatar_url: string
}

export class FogRepository {
  id: number
  name: string
  uuid: string
  full_name?: string
  owner: IFogOwner
  description?: string
  avatar_url?: string
  http_url?: string
  ssh_url?: string
  html_url?: string
  private: boolean = true

  constructor(id: number, name: string, owner: IFogOwner) {
    this.id = id
    this.name = name
    this.owner = owner
    this.uuid = uuid()
  }
}