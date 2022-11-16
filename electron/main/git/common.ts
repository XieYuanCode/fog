import { simpleGit, CheckRepoActions } from "simple-git"

export const checkIsRepo = async (location: string) => (await simpleGit(location).checkIsRepo(CheckRepoActions.IS_REPO_ROOT));