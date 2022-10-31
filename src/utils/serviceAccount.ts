import { AvailableServiceAccountType } from "../types/AvailableServiceAccountType"
import { ServiceAccountType } from "../types/ServiceAccountType"

export const getAvailableServiceAccountTypes: () => AvailableServiceAccountType[] = () => {
  return [{
    type: ServiceAccountType.Github,
    available: true
  }, {
    type: ServiceAccountType.GithubEnterprise,
    available: false
  }, {
    type: ServiceAccountType.GitLab,
    available: false
  }, {
    type: ServiceAccountType.GitlabCEEE,
    available: true
  }, {
    type: ServiceAccountType.Coding,
    available: false
  }, {
    type: ServiceAccountType.Gitee,
    available: false
  }, {
    type: ServiceAccountType.Bitbucket,
    available: false
  }, {
    type: ServiceAccountType.Bitbucket,
    available: false
  }]
}