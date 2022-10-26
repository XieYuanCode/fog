import { ipcMain } from "electron"
import { fork } from "child_process"
import { GitExecutorMessageDescriptor } from "../git/GitExecutorMessageDescriptor"
import { join } from "path"
import { GitExecuteResult } from "../git/GitExtcuteResult";
import { uuid } from "../common";

const git_child_process = fork(join(__dirname, '../', 'git', 'index'))

const exec = async (method: 'getBranches' | 'getLocalBranches' | 'deleteLocalBranch' | 'deleteLocalBranches' | 'getGlobalUsername' | 'getGlobalEmailAddress' | 'getGitVersion' | 'setGlobalUsername' | 'setGlobalEmailAddress', args: [] = []) => {
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
  ipcMain.handle("Git:GetGitVersion", async (e) => {
    return await exec('getGitVersion', [])
  })

  ipcMain.handle("Git:GetGlobalEmailAddress", async (e) => {
    return await exec('getGlobalEmailAddress')
  })

  ipcMain.handle("Git:GetGlobalUsername", async (e) => {
    return await exec('getGlobalUsername')
  })
}
export default initGitEvents;