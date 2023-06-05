import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import { copyDirAsync, copyMissingFiles } from "../tools/fileTools.js";

// 配置文件初始化创建函数
function rbjCreateFun() {
    // process.cwd() 可以直接获取当前命令运行的目录
    let targetDir = process.cwd() + "/rbjConfigs";
    if (fs.existsSync(targetDir)) {
        console.log(chalk.red("The rbjConfigs directory already exists. You can use 'rbj-tool -c' to complete the configuration file"));
    } else {
        // 获取当前文件的目录路径, 和 __dirname 一样的作用, 只不过 __dirname 在 ES Module 模式下不能使用
        let currentFileDirectory = path.dirname(fileURLToPath(import.meta.url));
        let sourceDir = path.join(currentFileDirectory, "../resource/rbjConfigs");
        copyDirAsync(sourceDir, targetDir)
            .then((res) => {
                console.log(chalk.green("All configuration files of rain-interface-tools have been successfully initialized. Procedure"));
            })
            .catch((err) => {
                console.log(chalk.red(err));
            });
    }
}

// 配置文件补全函数
function complementFun() {
    // 获取当前文件的目录路径, 和 __dirname 一样的作用, 只不过 __dirname 在 ES Module 模式下不能使用
    let currentFileDirectory = path.dirname(fileURLToPath(import.meta.url));
    let sourceDir = path.join(currentFileDirectory, "../resource/rbjConfigs");
    // process.cwd() 可以直接获取当前命令运行的目录
    let targetDir = process.cwd() + "/rbjConfigs";
    copyMissingFiles(sourceDir, targetDir)
        .then((res) => {
            console.log(chalk.green("All missing rain-interface-tools configuration files have been completed"));
        })
        .catch((err) => {
            console.log(chalk.red(err));
        });
}

// rbj-init 命令的回调函数
function rbjCreate(opts, programCommand) {
    if (opts.init && opts.complement) {
        console.log(chalk.red("(-i, --init 参数) 和 (-c, --complement 参数) 不能同时使用"));
    } else if (opts.init) {
        // 初始化创建操作
        rbjCreateFun();
    } else if (opts.complement) {
        // 判断是否进行补全操作
        complementFun();
    } else {
        if (programCommand.args.length === 0) {
            console.log(chalk.red("rbj-tool 需要 [options] 参数"));
        } else {
            console.log(chalk.red("参数错误"));
        }
    }
}

// 导出 create 命令函数
export default rbjCreate;
