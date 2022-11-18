import { dialog, ipcMain, Notification } from "electron"
import { fork } from "child_process"
import { GitExecutorMessageDescriptor } from "../git/GitExecutorMessageDescriptor"
import { join, basename, dirname } from "path"
import { GitExecuteResult } from "../git/GitExtcuteResult";
import { uuid } from "../common";
import { gitExecutorAction } from "../types/gitExecutorAction";
import windowManager from "../windowManager";
import globby from "globby";

const git_child_process = fork(join(__dirname, '../', 'git', 'index'))

const exec = async (method: gitExecutorAction, args: Array<any> = []): Promise<GitExecuteResult> => {
  return new Promise((resolve, reject) => {
    const requestID = uuid()
    git_child_process.send(new GitExecutorMessageDescriptor(requestID, method, args))

    git_child_process.on('message', (message: GitExecuteResult) => {
      if (message.requestID === requestID) {
        if (message.error) {
          reject(message.error)
        } else {
          resolve(message)
        }
      }
    })
  })
}

const initGitEvents = () => {
  ipcMain.handle("Git:GetGitVersion", async (_) => {
    return await exec('getGitVersion', [])
  })

  ipcMain.handle("Git:GetGlobalEmailAddress", async (_) => {
    return await exec('getGlobalEmailAddress')
  })

  ipcMain.handle("Git:GetGlobalUsername", async (_) => {
    return await exec('getGlobalUsername')
  })

  ipcMain.handle("Git:SetGlobalUsername", async (_, args) => {
    return await exec('setGlobalUsername', args)
  })

  ipcMain.handle("Git:SetGlobalEmailAddress", async (_, args) => {
    return await exec('setGlobalEmailAddress', args)
  })

  ipcMain.handle("Git:Status:GetStatus", async (_, args) => {
    return await exec('getStatus', args)
  })

  ipcMain.handle("Git:Common:CheckIsRepo", async (_, args) => {
    return await exec('checkIsRepo', args)
  })

  ipcMain.handle("Git:Integration:ImportLocalGitRepo", async (_) => {
    const selectDirectoryResult = await dialog.showOpenDialog(windowManager.currentActiveWindow || windowManager.mainWindow, {
      title: "Select A Git Directory",
      properties: ['openDirectory']
    })

    if (selectDirectoryResult.canceled) {
      return {
        type: "canceled"
      }
    }

    const selectedFilePath = selectDirectoryResult.filePaths[0]

    try {
      const isGitRepo = await exec('checkIsRepo', [selectedFilePath])
      if (!isGitRepo.isSuccess) {
        throw isGitRepo.error
      }

      if (isGitRepo.result !== true) {
        const { response } = await dialog.showMessageBox(windowManager.currentActiveWindow || windowManager.mainWindow, {
          title: "Add Git Repository",
          message: "No Git Repository Found",
          detail: "The specified directory does not contain a .git directory. Do you need to initialize a Git repository for this directory",
          buttons: ["OK", "Cancel"]
        })

        if (response === 1) {
          return {
            type: "canceled"
          }
        } else if (response === 0) {
          await exec('init', [selectedFilePath])

          return {
            type: "success",
            location: selectedFilePath,
            name: basename(selectedFilePath)
          }
        }
      } else {
        return {
          type: "success",
          location: selectedFilePath,
          name: basename(selectedFilePath)
        }
      }
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle("Git:Integration:AttachFolder", async (_) => {
    const selectDirectoryResult = await dialog.showOpenDialog(windowManager.currentActiveWindow || windowManager.mainWindow, {
      title: "Select A Git Directory",
      properties: ['openDirectory']
    })

    if (selectDirectoryResult.canceled) {
      return {
        type: "canceled"
      }
    }

    const selectedDirectoryPath = selectDirectoryResult.filePaths[0]

    const isSelectedDirectoryGitRepo = await exec('checkIsRepo', [selectDirectoryResult.filePaths[0]])

    if (isSelectedDirectoryGitRepo) {
      new Notification({
        title: 'Attach Directory Failed!',
        body: `The directory you selected is a git repository, can not attach it`
      }).show()
      return {
        type: "canceled"
      }
    }

    try {
      const patterns = [join(selectedDirectoryPath, "**", ".git"), `!${join(selectedDirectoryPath, "**", "node_modules", "**")}`];

      const gitRepos = await globby(patterns, { onlyDirectories: true, deep: 4 })

      const { response } = await dialog.showMessageBox(windowManager.currentActiveWindow || windowManager.mainWindow, {
        title: "Attach Directory",
        message: `Find ${gitRepos.length} Git Repositories`,
        detail: `Find ${gitRepos.length} git repositories, do you need to import them?`,
        buttons: ["OK", "Cancel"]
      })

      if (response === 1) {
        return {
          type: "canceled"
        }
      } else if (response === 0) {
        return {
          type: "success",
          location: selectedDirectoryPath,
          name: basename(selectedDirectoryPath),
          repos: gitRepos.map(gitRepo => ({
            location: gitRepo,
            name: basename(dirname(gitRepo))
          }))
        }
      }
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle("Git:Integration:GetRepoBasicGitInfo", async (_, args) => {
    const getStatusTask = exec('getStatus', args)
    const getBranchesTask = exec('getBranches', args)
    const getTagsTask = exec('getTags', args)
    const getSubmodules = exec('getSubModules', args)

    const result = await Promise.all([getStatusTask, getBranchesTask, getTagsTask, getSubmodules])

    return {
      status: result[0],
      branches: result[1],
      tags: result[2],
      submodules: result[3]
    }
  })
}
export default initGitEvents;