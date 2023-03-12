import { checkProjectExists } from "./util/file.js"
import root from './root/index.js'
import build from './build/index.js'
import prettier from './prettier/index.js'
import eslint from './eslint/index.js'
import commitlint from './commitlint/index.js'
import test from './test/index.js'
import husky from './husky/index.js'
import ci from './ci/index.js'
import manager from './manager/index.js'

import ora from "ora";

const spinner = ora();

export const init = (argv, answers) => {
    const cmdPath = process.cwd()
    const option = { ...argv, ...answers }
    const { name } = argv
    const pathname = String(typeof argv._[1] !== 'undefined' ? argv._[1] : name)
    if (checkProjectExists(cmdPath, pathname)) {
        console.error(`error: the library ${pathname} is already existed`)
        return
    }
    root.init(cmdPath, pathname, option)
    build.init(cmdPath, pathname, option);
    prettier.init(cmdPath, pathname, option);
    eslint.init(cmdPath, pathname, option);
    commitlint.init(cmdPath, pathname, option);
    test.init(cmdPath, pathname, option);
    husky.init(cmdPath, pathname, option);
    ci.init(cmdPath, pathname, option);

    manager.init(cmdPath, pathname, option).then(
        () => {
            spinner.succeed("Create lib successfully");
        },
        () => {
            spinner.fail("Create lib failure");
        }
    );
}