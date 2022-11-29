import { simpleGit } from "simple-git"

export const init = async (location: string) => (await simpleGit(location).init())

export const clone = async (remoteURL: string, localAddress: string, bare: boolean = false, recurseSubmodules: boolean = false, depth?: number, branch?: string, progressCallback?: (stage, progress) => void) => {
  return new Promise((resolve, reject) => {
    const options = {}
    bare && (options['--bare'] = null);
    recurseSubmodules && (options['--recurse-submodules'] = null)
    if (depth && depth !== 0) { options['--depth'] = depth }
    if (branch && branch !== "") { options['--branch'] = branch }

    simpleGit({
      progress: ({ stage, progress }) => {
        progressCallback.call(null, stage, progress)
      }
    }).clone(remoteURL, localAddress, options).then(result => {
      resolve(result)
    }).catch(err => {
      reject(err.message)
    })
  })
}