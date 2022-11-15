import axios from "axios";
import { IGitHubRepository } from "../../types/githubRepo";
import { FogUserInfo } from "../../types/IUserInfo";
import { FogRepository } from "../../types/CloudRepository";
import { AxiosInstanceWrapper } from "..";
import modelFormatter from "../../utils/modelFormatter";

export interface IGitHubUserInfo {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string
  company: string
  blog: string
  location: string
  email: string
  hireable: unknown
  bio: unknown
  twitter_username: unknown
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
  private_gists: number
  total_private_repos: number
  owned_private_repos: number
  disk_usage: number
  collaborators: number
  two_factor_authentication: boolean
}


export class GitHubAxiosInstanceWrapper extends AxiosInstanceWrapper {
  private _repositories: FogRepository[] = [];
  private _userId: number = 0;
  // private _events: IFogEvent[] = [];

  // async listEvents(): Promise<IFogEvent[]> {
  //     return this._events
  // }

  // async listGroups(): Promise<FogGroup[]> {
  //   let result: FogGroup[] = [];
  //   this._repositories.forEach(repo => {
  //     if (repo.owner.id !== this._userId) {
  //       if (!result.find(group => group.id === repo.owner.id)) {
  //         let fogGroup = new FogGroup(repo.owner.id, repo.owner.name, repo.owner.web_url);
  //         fogGroup.avatar_url = repo.owner.avatar_url;
  //         fogGroup.repositories.push(repo)
  //         result.push(fogGroup)
  //       } else {
  //         const group = result.find(group => group.id === repo.owner.id)
  //         group?.repositories.push(repo)
  //       }
  //     }
  //   })
  //   return result;
  // }
  async listCurrentUser(): Promise<FogUserInfo> {
    try {
      const userinfoResponse = await this.instance.get<IGitHubUserInfo>("/user");
      if (userinfoResponse.status !== 200) {
        throw new Error("listCurrentUser error");
      } else {
        const repositoriesResponse = await this.instance.get<IGitHubRepository[]>('user/repos')
        if (repositoriesResponse.status !== 200) {
          throw new Error("listCurrentUser error");
        } else {
          this._repositories = modelFormatter.formatRepositoryFromGithubModel(repositoriesResponse.data);
          this._userId = userinfoResponse.data.id
          return modelFormatter.formatUserInfoFromGitHubModel(userinfoResponse.data);
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async listRepositories(): Promise<FogRepository[]> {
    return this._repositories.filter(repo => repo.owner.id === this._userId);
  }

}

class GitHubAxiosInstanceFactory {
  private _instance: Map<[string, string], GitHubAxiosInstanceWrapper> = new Map();
  private _basicUrl: string = "https://api.github.com";

  getInstance(userName: string, pat: string): GitHubAxiosInstanceWrapper {
    if (!!this._instance.has([userName, pat])) {
      return this._instance.get([userName, pat]) as GitHubAxiosInstanceWrapper;
    } else {
      const instance = axios.create({
        baseURL: this._basicUrl,
        auth: {
          username: userName,
          password: pat,
        }
      });
      const instanceWrapper = new GitHubAxiosInstanceWrapper(instance);
      this._instance.set([userName, pat], instanceWrapper);
      return instanceWrapper;
    }
  }
}

export default new GitHubAxiosInstanceFactory();