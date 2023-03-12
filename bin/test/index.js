import { copyTmpl, copyFile, mergeTmpl2JSON } from "../util/copy.js";
import path from "path";
// 最新 node 核心包的导入写法
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
// 获取 __dirname 的 ESM 写法
const __dirname = dirname(fileURLToPath(import.meta.url))

function init(cmdPath, name, option) {
    if (!option.test.mocha) {
        return;
    }

    console.log("test: init");

    copyTmpl(
        path.resolve(__dirname, `./template/.nycrc`),
        path.resolve(cmdPath, name, ".nycrc")
    );

    copyTmpl(
        path.resolve(__dirname, `./template/index.html.tmpl`),
        path.resolve(cmdPath, name, "test/browser/index.html"),
        option
    );

    copyTmpl(
        path.resolve(__dirname, `./template/test.js`),
        path.resolve(cmdPath, name, "test/test.js"),
        option
    );

    mergeTmpl2JSON(
        path.resolve(__dirname, `./template/package.json.tmpl`),
        path.resolve(cmdPath, name, "package.json"),
        option
    );

    if (option.test.puppeteer) {
        copyTmpl(
            path.resolve(__dirname, `./template/puppeteer.js`),
            path.resolve(cmdPath, name, "test/browser/puppeteer.js")
        );
    }
}


export default {
    init
}