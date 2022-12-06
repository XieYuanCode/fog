import sqlite3 from "sqlite3";
import type { Database } from "sqlite3"
import { app } from "electron"
import path from "path"
import { promisify } from "util"

const sq3 = sqlite3.verbose()

class FogDataBase {
  private _userDataDBFilePath = path.join(app.getPath("userData"), 'UserData.db')
  private _db: Database

  public prePrepareForDatabase() {
    this._db = new sq3.Database(this._userDataDBFilePath)

    this._db.parallelize(() => {
      this._db.run(`CREATE TABLE IF NOT EXISTS local_repository (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT,
        location TEXT,
        explorer_location TEXT,
        openTimes INTEGER,
        importDate TEXT,
        pined BLOB,
        lastOpen TEXT,
        description TEXT
      )`)

      this._db.run(`CREATE TABLE IF NOT EXISTS service_account (
        uuid TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        fullName TEXT,
        avatar_url TEXT,
        web_url TEXT,
        email TEXT,
        accountType TEXT NOT NULL,
        authType TEXT NOT NULL,
        host TEXT,
        token TEXT NOT NULL,
        defaultCloneProtocol TEXT,
        sshKey TEXT
      )`)
    })
  }

  public getServiceAccounts(columns: string = "*", cb?) {
    this._db.all(`SELECT ${columns} from service_account`, cb)
  }

  public insertServiceAccount(serviceAccount, cb?) {
    this._db.run("INSERT INTO service_account VALUES ( $uuid , $name , $fullName , $avatar_url , $web_url , $email , $accountType , $authType , $host , $token , $defaultCloneProtocol , $sshKey )", serviceAccount, cb)
  }

  public deleteServiceAccount(uuid, cb?) {
    this._db.run("DELETE FROM service_account WHERE uuid = $uuid", {
      $uuid: uuid
    })
  }

  public async updateServiceAccount() { }
}

export default new FogDataBase()