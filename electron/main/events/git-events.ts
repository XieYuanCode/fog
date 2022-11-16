import { dialog, ipcMain } from "electron"
import { fork } from "child_process"
import { GitExecutorMessageDescriptor } from "../git/GitExecutorMessageDescriptor"
import { join, basename } from "path"
import { GitExecuteResult } from "../git/GitExtcuteResult";
import { uuid } from "../common";
import { gitExecutorAction } from "../types/gitExecutorAction";
import windowManager from "../windowManager";

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

  ipcMain.handle("Git:Common:CheckIsRepo", async (_, args) => {
    return await exec('checkIsRepo', args)
  })

  ipcMain.handle("Git:Integration:importLocalGitRepo", async (_) => {
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
}
export default initGitEvents;