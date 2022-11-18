import { simpleGit } from "simple-git"

export const getStatus = async (repoLocation: string) => await simpleGit(repoLocation).status();