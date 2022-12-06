import { ipcMain } from "electron"
import fogDatabase from "../database"

const initDataBaseEvents = () => {
  ipcMain.on("Database:ServiceAccount:AddServiceAccount", (_, serviceAccount) => {
    fogDatabase.insertServiceAccount({
      $uuid: serviceAccount.uuid || "",
      $name: serviceAccount.userInfo.name || "",
      $fullName: serviceAccount.userInfo.fullName || "",
      $avatar_url: serviceAccount.userInfo.avatar_url || "",
      $web_url: serviceAccount.userInfo.web_url,
      $email: serviceAccount.userInfo.email || "",
      $accountType: serviceAccount.accountType || "",
      $authType: serviceAccount.authType || "",
      $host: serviceAccount.host || "",
      $token: serviceAccount.token || "",
      $defaultCloneProtocol: serviceAccount.defaultCloneProtocol || "",
      $sshKey: serviceAccount.sshKey || ""
    })
  })

  ipcMain.on("Database:ServiceAccount:DeleteServiceAccount", (_, id) => {
    fogDatabase.deleteServiceAccount(id)
  })
}

export default initDataBaseEvents