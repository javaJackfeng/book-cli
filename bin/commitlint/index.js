import { copyTmpl, copyFile, mergeTmpl2JSON } from "../util/copy.js";
import path from "path";
// 最新 node 核心包的导入写法
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
// 获取 __dirname 的 ESM 写法
const __dirname = dirname(fileURLToPath(import.meta.url))

function init(cmdPath, name, option) {
    if (!option.commitlint.commitlint) {
        return;
    }
    
    console.log("commitlint: init");
    
    copyTmpl(
        path.resolve(__dirname, `./template/commitlint.config.js`),
        path.resolve(cmdPath, name, "commitlint.config.js")
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