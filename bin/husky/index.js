import { copyTmpl, copyFile, mergeTmpl2JSON } from "../util/copy.js";
import path from "path";
// 最新 node 核心包的导入写法
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
// 获取 __dirname 的 ESM 写法
const __dirname = dirname(fileURLToPath(import.meta.url))

function init(cmdPath, name, option) {
    if (!option.husky) {
        return;
    }

    console.log("husky: init");

    if (option.commitlint.commitlint) {
        copyTmpl(
            path.resolve(__dirname, `./template/commit-msg.tmpl`),
            path.resolve(cmdPath, name, ".husky/commit-msg"),
            option
        );
    }

    if (option.eslint) {
        copyTmpl(
            path.resolve(__dirname, `./template/.lintstagedrc.js`),
            path.resolve(cmdPath, name, ".lintstagedrc.js"),
            option
        );
    }

    copyTmpl(
        path.resolve(__dirname, `./template/pre-commit.tmpl`),
        path.resolve(cmdPath, name, ".husky/pre-commit"),
        option
    );
    mergeTmpl2JSON(
        path.resolve(__dirname, `./template/package.json.tmpl`),
        path.resolve(cmdPath, name, "package.json"),
        option
    );
}

export default {
    init
}