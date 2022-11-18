import { simpleGit } from "simple-git"

export const getTags = async (repoLocation: string) => await simpleGit(repoLocation).tags()