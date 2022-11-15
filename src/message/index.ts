import { AxiosInstance } from "axios";
import { FogRepository } from "../types/CloudRepository";
import { FogUserInfo } from "../types/IUserInfo";
// import { FogGroup } from "../model/FogGroup";
// import { IFogEvent } from "../model/IFogEvent";

export abstract class AxiosInstanceWrapper {
  instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  /**
   * 获取用户信息
   */
  abstract listCurrentUser(): Promise<FogUserInfo> 

  /**
   * 获取用户下仓库
   */
  abstract listRepositories(): Promise<FogRepository[]>

  /**
   * 获取用户下组
   */
  // abstract listGroups(): Promise<FogGroup[]>

  // abstract listEvents(): Promise<IFogEvent[]>
}