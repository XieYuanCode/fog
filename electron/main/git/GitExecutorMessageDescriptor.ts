export class GitExecutorMessageDescriptor {
  constructor(
    public readonly requestID: string,
    public readonly action: 'getBranches' | 'getLocalBranches' | 'deleteLocalBranch' | 'deleteLocalBranches' | 'getGlobalUsername' | 'getGlobalEmailAddress' | 'getGitVersion' | 'setGlobalUsername' | 'setGlobalEmailAddress',
    public readonly args: unknown[]
  ) { }
}