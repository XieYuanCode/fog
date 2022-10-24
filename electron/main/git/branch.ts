import type { SimpleGit } from "simple-git"

/**
 * 获取仓库所有分支
 * @param repo 仓库
 */
export const getBranches = async (repo: SimpleGit) => await repo.branch();
/**
 * 获取仓库所有本地分支
 * @param repo 仓库
 */
export const getLocalBranches = async (repo: SimpleGit) => await repo.branchLocal();

/**
 * 删除单个本地分支
 * @param repo 仓库
 * @param branchName 分支名
 * @param forceDelete 强制删除
 */
export const deleteLocalBranch = async (repo: SimpleGit, branchName: string, forceDelete = false) => await repo.deleteLocalBranch(branchName, forceDelete)

/**
 * 删除多个本地分支
 * @param repo 仓库
 * @param branchNames 分支名集合
 * @param forceDelete 强制删除
 */
export const deleteLocalBranches = async (repo: SimpleGit, branchNames: string[], forceDelete = false) => await repo.deleteLocalBranches(branchNames, forceDelete)