import { FogUserInfo } from "../types/IUserInfo";
import { IGitHubUserInfo } from "../message/github";
import { IGitlabEvent, IGitlabGroup, IGitlabUserInfo } from "../message/GitLab";
import { IGitHubRepository } from "../types/githubRepo";
import { FogRepository } from "../types/CloudRepository";
import { IGitlabRepository } from "../types/gitlabRepo";

class ModelFormatter {
  formatUserInfoFromGitlabCeeeModel(gitlabUserInfo: IGitlabUserInfo): FogUserInfo<IGitlabUserInfo> {
    const fogUserInfo = new FogUserInfo<IGitlabUserInfo>(gitlabUserInfo.id, gitlabUserInfo.username);
    fogUserInfo.fullName = gitlabUserInfo.name;
    fogUserInfo.avatar_url = gitlabUserInfo.avatar_url
    fogUserInfo.email = gitlabUserInfo.email;
    fogUserInfo.web_url = gitlabUserInfo.web_url;

    fogUserInfo.$original = gitlabUserInfo

    return fogUserInfo
  }

  formatUserInfoFromGitHubModel(gitHubUserInfo: IGitHubUserInfo): FogUserInfo<IGitHubUserInfo> {
    const fogUserInfo = new FogUserInfo<IGitHubUserInfo>(gitHubUserInfo.id, gitHubUserInfo.login);
    fogUserInfo.fullName = gitHubUserInfo.name;
    fogUserInfo.avatar_url = gitHubUserInfo.avatar_url
    fogUserInfo.email = gitHubUserInfo.email;
    fogUserInfo.web_url = gitHubUserInfo.html_url;

    fogUserInfo.$original = gitHubUserInfo

    return fogUserInfo
  }

  // formatGroupFromGitlabCeeeModel(gitlabGroups: IGitlabGroup[]): FogGroup[] {
  //   const groups: FogGroup[] = [];
  //   gitlabGroups.forEach(gitlabGroup => {
  //     if (gitlabGroup.parent_id === null) {
  //       const fogGroup = new FogGroup(gitlabGroup.id, gitlabGroup.name, gitlabGroup.web_url)
  //       fogGroup.avatar_url = gitlabGroup.avatar_url
  //       fogGroup.description = gitlabGroup.description
  //       fogGroup.private = gitlabGroup.visibility === 'private'
  //       groups.push()
  //     } else {
  //     }
  //   })

  //   return groups
  // }

  formatRepositoryFromGithubModel(gitHubRepositories: IGitHubRepository[]): FogRepository[] {
    const result: FogRepository[] = []
    gitHubRepositories.forEach(gitHubRepository => {
      const fogRepository = new FogRepository(gitHubRepository.id, gitHubRepository.name, {
        name: gitHubRepository.owner.login,
        description: gitHubRepository.owner.login,
        id: gitHubRepository.owner.id,
        web_url: gitHubRepository.owner.html_url,
        avatar_url: gitHubRepository.owner.avatar_url
      })
      fogRepository.full_name = gitHubRepository.full_name
      fogRepository.description = gitHubRepository.description
      fogRepository.html_url = gitHubRepository.html_url
      fogRepository.private = gitHubRepository.private
      fogRepository.http_url = gitHubRepository.clone_url
      fogRepository.ssh_url = gitHubRepository.ssh_url

      result.push(fogRepository)
    })
    return result
  }

  formatRepositoryFromGitlabModel(gitlabRepositories: IGitlabRepository[]): FogRepository[] {
    const result: FogRepository[] = []
    gitlabRepositories.forEach(gitlabRepository => {
      const fogRepository = new FogRepository(gitlabRepository.id, gitlabRepository.name, {
        name: gitlabRepository.owner.name,
        id: gitlabRepository.owner.id,
        web_url: gitlabRepository.owner.web_url,
        description: "",
        avatar_url: gitlabRepository.owner.avatar_url
      })

      fogRepository.full_name = gitlabRepository.name_with_namespace
      fogRepository.description = gitlabRepository.description
      fogRepository.avatar_url = gitlabRepository.avatar_url
      fogRepository.http_url = gitlabRepository.http_url_to_repo
      fogRepository.ssh_url = gitlabRepository.ssh_url_to_repo
      fogRepository.html_url = gitlabRepository.web_url
      fogRepository.private = gitlabRepository.visibility === "private"

      result.push(fogRepository)
    })
    return result
  }

  // formatEventFromGitlabModel<T>(gitlabEvent: IGitlabEvent[]): IFogEvent[] {
  //   const fogEvents: IFogEvent[] = []

  //   gitlabEvent.forEach(gitlabEvent => {
  //     const fogEvent: IFogEvent = {
  //       id: uuid(),
  //       project_id: gitlabEvent.project_id,
  //       action_name: gitlabEvent.action_name,
  //       author: gitlabEvent.author,
  //       data: gitlabEvent.push_data,
  //       original_id: gitlabEvent.project_id,
  //       targetType: gitlabEvent.target_type,
  //       targetTitle: gitlabEvent.target_title,
  //     }

  //     fogEvents.push(fogEvent)
  //   })

  //   return fogEvents
  // }
}

export default new ModelFormatter();