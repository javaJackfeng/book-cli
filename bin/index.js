#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { runInitPrompts } from "./run-prompts.js";
import { init } from "./init.js";
import initLog from './util/log.js'

initLog()

yargs(hideBin(process.argv))
  .usage("usage: bookcli [options]")
  .usage("usage: bookcli <command> [options]")
  .example("boockcli new lib", "新建一个lib库")
  .alias("h", "help")
  .alias("v", "version")
  .option("name", {
    alias: "n",
    demand: false,
    default: "mylib",
    describe: "you library name",
    type: "string",
  })
  .command(
    ["new", "n"],
    "新建一个项目",
    () => {},
    (argv) => {
      runInitPrompts(argv).then((answers) => {
          init(argv, answers)
      })
    }
  )
  .demandCommand(1)
  .parse()
