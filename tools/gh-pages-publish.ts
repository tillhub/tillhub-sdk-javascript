const { cd, exec, echo, touch } = require("shelljs")
const { readFileSync } = require("fs")
const url = require("url")

function run (command: string, description: string) {
  const result = exec(command)
  if (result.code !== 0) {
    throw new Error(`${description} failed with exit code ${result.code}`)
  }
  return result
}

let repoUrl
let pkg = JSON.parse(readFileSync("package.json") as any)
if (typeof pkg.repository === "object") {
  if (!pkg.repository.hasOwnProperty("url")) {
    throw new Error("URL does not exist in repository section")
  }
  repoUrl = pkg.repository.url
} else {
  repoUrl = pkg.repository
}

let parsedUrl = url.parse(repoUrl)
let repository = (parsedUrl.host || "") + (parsedUrl.path || "")
let ghToken = process.env.GH_TOKEN

if (!ghToken) {
  throw new Error("GH_TOKEN is not set — cannot publish docs")
}

echo("Deploying docs!!!")
cd("docs")
touch(".nojekyll")
run("git init", "git init")
run("git add .", "git add")
run('git config user.name "Tillhub Engineer"', "git config user.name")
run('git config user.email "engineering@tillhub.de"', "git config user.email")
run('git commit -m "docs(docs): update gh-pages [ci skip]"', "git commit")
run(
  `git push --force --quiet "https://x-access-token:${ghToken}@${repository}" master:gh-pages`,
  "git push to gh-pages"
)
echo("Docs deployed!!")
