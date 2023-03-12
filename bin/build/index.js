import path from 'path';
import { copyTmpl, copyFile, mergeTmpl2JSON } from "../util/copy.js";
// 最新 node 核心包的导入写法
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
// 获取 __dirname 的 ESM 写法
const __dirname = dirname(fileURLToPath(import.meta.url))

function init(cmdPath, name, option) {
    console.log("build: init");

    copyTmpl(
        path.resolve(__dirname, `./template/rollup.js.tmpl`),
        path.resolve(cmdPath, name, "config/rollup.js"),
        option
    );

    copyFile(
        path.resolve(__dirname, `./template/rollup.config.esm.js`),
        path.resolve(cmdPath, name, "config/rollup.config.esm.js")
    );

    copyFile(
        path.resolve(__dirname, `./template/rollup.config.js`),
        path.resolve(cmdPath, name, "config/rollup.config.js")
    );

    copyTmpl(
        path.resolve(__dirname, `./template/.babelrc.tmpl`),
        path.resolve(cmdPath, name, ".babelrc"),
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
};