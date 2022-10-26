import { GitExecutorMessageDescriptor } from "./GitExecutorMessageDescriptor";
import { getGitVersion, getGlobalEmailAddress, getGlobalUsername, setGlobalEmailAddress, setGlobalUsername } from "./config"
import { GitExecuteResult } from "./GitExtcuteResult";

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

    default:
      break;
    //#endregion
  }
})

