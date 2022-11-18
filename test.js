const { simpleGit } = require("simple-git")

const gitRepo = simpleGit("/Users/xieyuan/code/fog")

const tasks = [
  gitRepo.status(),
  gitRepo.branch(),
  // gitRepo.tag(),
  // gitRepo.subModule()
];

(async () => {
  console.time("test")
  const result = await Promise.all(tasks)
  console.log(result);
  console.timeEnd("test");
})()