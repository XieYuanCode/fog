import axios from "axios";
import { FogRepository } from "../../types/CloudRepository";
import { AxiosInstanceWrapper } from "..";
import { IGitlabRepository } from "../../types/gitlabRepo";
import { FogUserInfo } from "../../types/IUserInfo";
import modelFormatter from "../../utils/modelFormatter";

export interface IGitlabUserInfo {
  id: number,
  name: string,
  username: string,
  state: string,
  avatar_url: string,
  web_url: string,
  created_at: string,
  bio: "",
  location: string,
  public_email: string,
  skype: string,
  linkedin: string,
  twitter: string,
  website_url: string,
  organization: string,
  last_sign_in_at: string,
  confirmed_at: string,
  last_activity_on: string,
  email: string,
  theme_id: number,
  color_scheme_id: number,
  projects_limit: number,
  current_sign_in_at: string,
  identities: Array<any>,
  can_create_group: true,
  can_create_project: true,
  two_factor_enabled: false,
  external: false,
  private_profile: false,
  is_admin: true,
  shared_runners_minutes_limit: unknown
}

export interface IGitlabGroup {
  id: number,
  web_url: string,
  name: string,
  path: string,
  description: string,
  visibility: string,
  lfs_enabled: boolean,
  avatar_url: string,
  request_access_enabled: boolean,
  full_name: string,
  full_path: string,
  parent_id: number,
}

export interface IGitlabTodo {
  id: number,
  project: any,
  target_type: string,
  target: any,
  target_url: string,
  body: string,
  state: string,
  created_at: string,
}

export interface IGitlabEvent {
  project_id: number,
  action_name: string,
  target_id: number,
  target_iid: number,
  target_type: string,
  author_id: number,
  target_title: string,
  created_at: string,
  author: any,
  push_data: any,
  author_username: string,
}

export class GitlabCeeeAxiosInstanceWrapper extends AxiosInstanceWrapper {
  private _repositories: FogRepository[] = [];
  private _todo: IGitlabTodo[] = []
  private _userId: number = 0;

  // async listEvents(): Promise<IFogEvent[]> {
  //   try {
  //     const response = await this.instance.get<IGitlabEvent[]>(`api/v4/events`)
  //     if (response.status !== 200) {
  //       throw new Error('listEvents error')
  //     } else {
  //       return modelFormatter.formatEventFromGitlabModel<IGitlabEvent>(response.data)
  //     }
  //   } catch (error) {
  //     throw error
  //   }
  // }

  async getRepositoryById(id: number): Promise<IGitlabRepository> {
    try {
      const response = await this.instance.get<IGitlabRepository>('api/v4/projects/' + id)
      if (response.status !== 200) {
        throw new Error('listEvents error')
      } else {
        return response.data
      }
    } catch (error) {
      throw error
    }
  }

  async listTodo(): Promise<IGitlabTodo[]> {
    return this._todo
  }

  async listCurrentUser(): Promise<FogUserInfo> {
    try {
      const userInfoResponse = await this.instance.get<IGitlabUserInfo>('api/v4/user')
      if (userInfoResponse.status !== 200) {
        throw new Error('listCurrentUser error')
      } else {
        const allPendingTodosResponse = await this.instance.get<IGitlabTodo[]>('api/v4/todos')
        if (allPendingTodosResponse.status !== 200) {
          throw new Error('listCurrentUser error')
        } else {
          this._userId = userInfoResponse.data.id
          allPendingTodosResponse.data.forEach(todo => {
            if (todo.target.assignee.id === this._userId) {
              this._todo.push(todo)
            }
          })
          return modelFormatter.formatUserInfoFromGitlabCeeeModel(userInfoResponse.data)
        }

      }
    } catch (error) {
      throw error
    }
  }
  // async listGroups(): Promise<FogGroup[]> {
  //   try {
  //     const response = await this.instance.get<IGitlabGroup[]>('api/v4/groups')
  //     if (response.status !== 200) {
  //       throw new Error('listGroups error')
  //     } else {
  //       const groups = modelFormatter.formatGroupFromGitlabCeeeModel(response.data)
  //       // TODO:
  //     }
  //   } catch (error) {
  //     throw error
  //   }
  // }
  async listRepositories(): Promise<FogRepository[]> {
    try {
      const response = await this.instance.get<IGitlabRepository[]>(`api/v4/users/${this._userId}/projects`)
      if (response.status !== 200) {
        throw new Error('listCurrentUser error')
      } else {
        return modelFormatter.formatRepositoryFromGitlabModel(response.data)
      }
    } catch (error) {
      throw error
    }
  }

}

class GitlabCEEEAxiosInstanceFactory {
  private _instance: Map<[string, string, string], GitlabCeeeAxiosInstanceWrapper> = new Map();

  getInstance(baseUrl: string, userName: string, pat: string): GitlabCeeeAxiosInstanceWrapper {
    if (!!this._instance.has([baseUrl, userName, pat])) {
      return this._instance.get([baseUrl, userName, pat]) as GitlabCeeeAxiosInstanceWrapper;
    } else {
      const instance = axios.create({
        baseURL: baseUrl,
        headers: {
          'Private-Token': pat,
        },
      });
      const instanceWrapper = new GitlabCeeeAxiosInstanceWrapper(instance);
      this._instance.set([baseUrl, userName, pat], instanceWrapper);
      return instanceWrapper;
    }

  }
}

export default new GitlabCEEEAxiosInstanceFactory();