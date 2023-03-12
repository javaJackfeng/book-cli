import { copyTmpl, copyFile, mergeTmpl2JSON } from "../util/copy.js";
import path from "path";
// 最新 node 核心包的导入写法
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
// 获取 __dirname 的 ESM 写法
const __dirname = dirname(fileURLToPath(import.meta.url))

function init(cmdPath, name, option) {
    if (!option.ci) {
        return;
    }
    
    console.log("ci: init");
    
    if (option.ci === 'github') {
        copyTmpl(
            path.resolve(__dirname, `./template/.github.yml.tmpl`),
            path.resolve(cmdPath, name, ".github/workflows/ci.yml"),
            option
        );
    } else if (option.ci === 'circleci') {
        copyTmpl(
            path.resolve(__dirname, `./template/.circleci.yml.tmpl`),
            path.resolve(cmdPath, name, ".circleci/config.yml"),
            option
        );
    } else if (option.ci === 'travis') {
        copyTmpl(
            path.resolve(__dirname, `./template/.travis.yml`),
            path.resolve(cmdPath, name, ".travis.yml"),
            option
        );
    }
}

export default {
    init
}