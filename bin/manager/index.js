import path from "path";
import { exec } from 'node:child_process';
import ora from "ora";

function init(cmdPath, name, option) {
  const manager = option.manager;

  if (!manager) {
    return Promise.resolve();
  }

  return new Promise(function (resolve, reject) {
    exec(
      "git init",
      { cwd: path.resolve(cmdPath, name) },
      function (error, stdout, stderr) {
        if (error) {
          console.warn("git init失败，跳过install过程");
          resolve();
          return;
        }

        const spinner = ora();

        spinner.start(`Installing packages from npm, wait for a second...`);
        exec(
          `${manager} install`,
          {
            cwd: path.resolve(cmdPath, name),
          },
          function (error, stdout, stderr) {
            if (error) {
              reject();
              return;
            }
            spinner.succeed(`Install packages successfully!`);
            resolve();
          }
        );
      }
    );
  });
}

export default {
  init,
};
