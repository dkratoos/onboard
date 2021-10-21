const fs = require("fs");
const path = require("path");

const message = fs.readFileSync(path.join(__dirname, "..", ".git", "COMMIT_EDITMSG")).toString();
const [firstLine, ...lines] = message.split("\n");

const colors = {
  red: "\x1b[0;31m",
  yellow: "\x1b[0;33m",
  blue: "\x1b[0;34m",
  green: "\x1b[0;32m",
  none: "\x1b[0m",
}

if (!/^((chore|docs|feat|fix|merge|perf|refact|refactor|style|test|wip)(\([a-zA-Z0-9]+\))?:|Merge)/u.test(firstLine)) {
  console.log(`${colors.red}Please use semantic commit messages:`);
  console.log(`${colors.yellow}feat${colors.none}[${colors.green}(scope)${colors.none}]: ${colors.blue}add hat wobble`);
  console.log(`${colors.yellow}^--^${colors.green} ^--*--^ ${colors.blue}  ^------------^ -> Summary in present tense.`);
  console.log(`${colors.yellow} *      ${colors.green}*-> [optional]: Scope of the commit.`);
  console.log(`${colors.yellow} *-> Type: chore, docs, feat, fix, merge, perf, refact, style, test, or wip.${colors.none}`);

  process.exit(1);
}

for (const line of lines) {
  if (line.startsWith("#")) {
    continue;
  }

  if (line.length > 100) {
    console.log(`${colors.yellow}Commit messages are limited to 100 characters.${colors.none}`);
    console.log(`The following commit message has ${colors.red}${line.length}${colors.none} characters.`);
    console.log(line);

    process.exit(1);
  }
}

process.exit(0);
