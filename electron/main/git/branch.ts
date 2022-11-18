import { simpleGit } from "simple-git"

/**
 * 获取仓库所有分支
 * @param repo 仓库
 */
export const getBranches = async (repoLocation: string) => await simpleGit(repoLocation).branch();
/**
 * 获取仓库所有本地分支
 * @param repo 仓库
 */
export const getLocalBranches = async (repoLocation: string) => await simpleGit(repoLocation).branchLocal();

/**
 * 删除单个本地分支
 * @param repo 仓库
 * @param branchName 分支名
 * @param forceDelete 强制删除
 */
export const deleteLocalBranch = async (repoLocation: string, branchName: string, forceDelete = false) => await simpleGit(repoLocation).deleteLocalBranch(branchName, forceDelete)

/**
 * 删除多个本地分支
 * @param repo 仓库
 * @param branchNames 分支名集合
 * @param forceDelete 强制删除
 */
export const deleteLocalBranches = async (repoLocation: string, branchNames: string[], forceDelete = false) => await simpleGit(repoLocation).deleteLocalBranches(branchNames, forceDelete)