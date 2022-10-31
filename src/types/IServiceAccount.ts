import { FogUserInfo } from "./IUserInfo"
import { ServiceAccountAuthenticationType } from "./ServiceAccountAuthenticationType"
import { ServiceAccountType } from "./ServiceAccountType"

export interface IServiceAccount {
  uuid: string
  /**
   * 账户类型
   */
  accountType: ServiceAccountType

  /**
   * 认证方式
   */
  authType: ServiceAccountAuthenticationType

  /**
   * 地址
   */
  host?: string
  /**
   * token
   */
  token: string

  /**
   * 用户信息
   */
  userInfo: FogUserInfo

  /**
   * 默认克隆协议
   */
  defaultCloneProtocol?: 'http' | 'ssh'

  /**
   * 是否可用
   */
  isAvailable: boolean

  /**
   * ssh key
   */
  sshKey?: string

}
