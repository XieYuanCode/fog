import { simpleGit } from "simple-git"

const configGit = simpleGit()

export const getGlobalUsername = async () => (await configGit.getConfig("user.name", "global")).value;
export const getGlobalEmailAddress = async () => (await configGit.getConfig("user.email", "global")).value;
export const getGitVersion = async () => await configGit.version();
export const setGlobalUsername = async (username: string) => await configGit.addConfig("user.name", username, false, 'global');
export const setGlobalEmailAddress = async (emailAddress: string) => await configGit.addConfig("user.email", emailAddress, false, 'global');