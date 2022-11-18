import { uuid } from "../utils/common"
import type { StatusResult, BranchSummary, TagResult } from "simple-git"
import { GitSubmodule } from "./submodule"

export class GitRepository {
  private _submodules?: GitSubmodule[]

  public readonly id: string
  public available: boolean = true
  public openTimes: number = 0
  public importDate: Date = new Date()
  public pined: boolean = false
  public lastOpen?: Date
  public description?: string
  public isLoading: boolean = false;

  public branches?: BranchSummary
  public status?: StatusResult
  public tags?: TagResult

  public get submodules(): GitSubmodule[] {
    return this._submodules || [];
  }

  public setSubmodulesByString(str: string): void {
    //TODO
  }

  constructor(
    public readonly location: string,
    public name: string,
    public explorer_location: string
  ) {
    this.id = uuid()
  }
}