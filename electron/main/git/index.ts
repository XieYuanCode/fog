import { GitExecutorMessageDescriptor } from "./GitExecutorMessageDescriptor";
import { getGitVersion, getGlobalEmailAddress, getGlobalUsername, setGlobalEmailAddress, setGlobalUsername } from "./config"
import { GitExecuteResult } from "./GitExtcuteResult";
import { checkIsRepo } from "./common";
import { init } from "./initialization";

const sendSuccessResult = (id: string, result: unknown) => {
  process.send(new GitExecuteResult(true, id, result, null))
}

const sendFailedResult = (id: string, error: Error) => {
  process.send(new GitExecuteResult(false, id, null, error))
}


process.on("message", async (message: GitExecutorMessageDescriptor) => {
  switch (message.action) {
    //#region config
    case 'getGitVersion':
      getGitVersion().then(version => sendSuccessResult(message.requestID, version)).catch(err => sendFailedResult(message.requestID, err))
      break;
    case 'getGlobalUsername':
      getGlobalUsername().then(username => sendSuccessResult(message.requestID, username)).catch(err => sendFailedResult(message.requestID, err))
      break;
    case 'getGlobalEmailAddress':
      getGlobalEmailAddress().then(email => sendSuccessResult(message.requestID, email)).catch(err => sendFailedResult(message.requestID, err))
      break;
    case 'setGlobalUsername':
      setGlobalUsername(message.args[0] as string).then(() => sendSuccessResult(message.requestID, null)).catch(err => sendFailedResult(message.requestID, err))
      break;
    case 'setGlobalEmailAddress':
      setGlobalEmailAddress(message.args[0] as string).then(() => sendSuccessResult(message.requestID, null)).catch(err => sendFailedResult(message.requestID, err))
      break;
    //#endregion
    //#region common
    case 'checkIsRepo':
      checkIsRepo(message.args[0] as string).then(isRepo => sendSuccessResult(message.requestID, isRepo)).catch(err => sendFailedResult(message.requestID, err))
      break;
    //#endregion
    //#region initialization
    case 'init':
      init(message.args[0] as string).then(() => sendSuccessResult(message.requestID, null)).catch(err => sendFailedResult(message.requestID, err))
    //#endregion
    default:
      break;
  }
})

