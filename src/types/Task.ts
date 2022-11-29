export abstract class Task {
  public progress: number = 0
  public status: 'UnStart' | 'Running' | 'Success' | 'Fail' = 'UnStart'

  constructor(
    public readonly name: string,
    public readonly taskType: string
  ) { }

  public start() {
    this.status = 'Running'
  }

  public success() {
    this.progress = 100
    this.status = "Success"
  }

  public fail() {
    this.progress = 100
    this.status = "Fail"
  }

  public updateProgress(process: number) {
    this.progress = process
  }
}

export class CloneTask extends Task {
  public stage?: 'remote' | 'receiving' | 'resolving'
  public innerProgress: number = 0

  constructor(name: string) {
    super(name, 'Clone')
  }

  public changeStage(stage: 'remote' | 'receiving' | 'resolving') {
    this.stage = stage
  }
}