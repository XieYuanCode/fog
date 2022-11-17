const globby = require("globby")
const path = require("path")

const selectedFilePath = "/Users/xieyuan/code"

const patterns = [path.join(selectedFilePath, "**", ".git"), `!${path.join(selectedFilePath, "**", "node_modules", "**")}`];

(async () => {
  const result = await globby(patterns, {
    onlyDirectories: true,
    deep: 4
  })

  console.log(result.length);
  console.log(result);
})()