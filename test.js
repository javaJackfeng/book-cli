import path from 'path';
import { copyTmpl, copyFile, mergeTmpl2JSON } from "./bin/util/copy.js";
// 最新 node 核心包的导入写法
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
// 获取 __dirname 的 ESM 写法
const __dirname = dirname(fileURLToPath(import.meta.url))


console.log('rid', __dirname)

copyFile(
    path.resolve(__dirname, `./bin/build/template/rollup.config.aio.js`),
    path.resolve(__dirname, './test-copy.js')
);