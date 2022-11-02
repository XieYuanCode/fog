import { gitExecutorAction } from "../types/gitExecutorAction";

export class GitExecutorMessageDescriptor {
  constructor(
    public readonly requestID: string,
    public readonly action: gitExecutorAction,
    public readonly args: unknown[]
  ) { }
}