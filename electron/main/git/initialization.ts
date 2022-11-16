import { simpleGit } from "simple-git"

export const init = async (location: string) => (await simpleGit(location).init())