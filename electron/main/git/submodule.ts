import { simpleGit } from "simple-git"

export const getSubModules = async (repoLocation: string) => await simpleGit(repoLocation).subModule();