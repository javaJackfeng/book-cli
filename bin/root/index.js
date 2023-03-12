import path from "path";
import { copyDir, copyTmpl } from "../util/copy.js";

// 最新 node 核心包的导入写法
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
// 获取 __filename 的 ESM 写法
const __filename = fileURLToPath(import.meta.url)
// 获取 __dirname 的 ESM 写法
const __dirname = dirname(fileURLToPath(import.meta.url))


// const __dirname = path.resolve();

const init = (cmdPath, name, option) => {
  console.log("root: init....");
  console.log(__dirname)
  const lang = option.lang;
  copyDir(
    path.resolve(__dirname, "./template/base"),
    path.resolve(cmdPath, name)
  );
  copyTmpl(
    path.resolve(__dirname, "./template/README.md.tmpl"),
    path.resolve(cmdPath, name, "README.md"),
    option
  );
  // init license
  copyTmpl(
    path.resolve(__dirname, `./template/license.tmpl`),
    path.resolve(cmdPath, name, "LICENSE"),
    option
  );

  // init package
  copyTmpl(
    path.resolve(__dirname, `./template/package.json.tmpl`),
    path.resolve(cmdPath, name, "package.json"),
    option
  );
};

export default {
    init
}
