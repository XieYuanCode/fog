import { uuid } from "../utils/common"

export class GitRepository {
  public readonly id: string
  public available: boolean = true
  public openTimes: number = 0
  public importDate: Date = new Date()
  public pined: boolean = false
  public lastOpen?: Date
  public description?: string

  constructor(
    public readonly location: string,
    public name: string,
    public explorer_location: string
  ) {
    this.id = uuid()
  }
}