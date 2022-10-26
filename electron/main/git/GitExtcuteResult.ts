export class GitExecuteResult {
  constructor(
    public readonly isSuccess: boolean,
    public readonly requestID: string,
    public readonly result?: any,
    public readonly error?: Error
  ){}
}