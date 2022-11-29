const { simpleGit } = require("simple-git");

const progress = (arg) => {
  console.log(arg);
}

const gitRepo = simpleGit({ progress });

const remoteURL = "http://192.168.180.113/ast/awpjssdk.git"
const localPath = "/Users/xieyuan/Unclutter/FileStorage/Unclutter Files/git/awpjssdk"

gitRepo.clone(remoteURL, localPath, { "--depth": 3 }).then(result => {
  console.log(result);
}).catch(err => {
  console.error(err);
})