import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import inquirer from "inquirer";
import { copyDirAsync, copyMissingFiles } from "../tools/fileTools.js";

// 配置文件初始化创建函数
function rbjCreateFun(frameType) {
    // process.cwd() 可以直接获取当前命令运行的目录
    let targetSrc = process.cwd() + "/src";
    let targetDir = process.cwd() + "/rbjConfigs";

    // 判断是否存在 src 目录, 如果存在, 则目标目录, 添加上 /src 路径
    if (fs.existsSync(targetSrc)) targetDir = process.cwd() + "/src/rbjConfigs";

    // 判断目标目录是否已经存在, 如果已经存在, 则此初始化命令进行提示, 并且不再执行初始化的程序
    if (fs.existsSync(targetDir)) {
        console.log(chalk.red("The rbjConfigs directory already exists. You can use 'rbj-tool -c' to complete the configuration file"));
    } else {
        // 获取当前文件的目录路径, 和 __dirname 一样的作用, 只不过 __dirname 在 ES Module 模式下不能使用
        let currentFileDirectory = path.dirname(fileURLToPath(import.meta.url));
        let sourceDir = path.join(currentFileDirectory, `../resource/${frameType}/rbjConfigs`);
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
function complementFun(frameType) {
    // process.cwd() 可以直接获取当前命令运行的目录
    let targetSrc = process.cwd() + "/src";
    let targetDir = process.cwd() + "/rbjConfigs";

    // 获取当前文件的目录路径, 和 __dirname 一样的作用, 只不过 __dirname 在 ES Module 模式下不能使用
    let currentFileDirectory = path.dirname(fileURLToPath(import.meta.url));
    let sourceDir = path.join(currentFileDirectory, `../resource/${frameType}/rbjConfigs`);

    // 判断是否存在 src 目录, 如果存在, 则目标目录, 添加上 /src 路径
    if (fs.existsSync(targetSrc)) targetDir = process.cwd() + "/src/rbjConfigs";
    copyMissingFiles(sourceDir, targetDir)
        .then((res) => {
            console.log(chalk.green("All missing rain-interface-tools configuration files have been completed"));
        })
        .catch((err) => {
            console.log(chalk.red(err + ","), chalk.red("please use the 'rbj-tool -i' command to initialize the rbj configuration file for the current project"));
        });
}

// rbj-init 命令的回调函数
function rbjCreate(opts, programCommand) {
    // 定义问题
    let questionArr = [
        {
            type: "list",
            name: "languageType",
            message: chalk.rgb(131, 50, 251)("Is the current project using javaScript or typeScript: "),
            choices: [
                {
                    name: "😏 javaScript 😏",
                    value: "javaScript",
                },
                {
                    name: "😎 typeScript 😎",
                    value: "typeScript",
                },
            ],
        },
        {
            type: "list",
            name: "frameType",
            message: chalk.rgb(131, 50, 251)("The framework type of the current project is: "),
            choices: [
                {
                    name: "🦢 Uniapp Vue2 🦢",
                    value: "uniappVue2",
                },
                {
                    name: "🐻 Uniapp Vue3 🐻",
                    value: "uniappVue3",
                },
                {
                    name: "😏 Vue2 😏",
                    value: "vue2",
                },
                {
                    name: "😎 Vue3 😎",
                    value: "vue3",
                },
                {
                    name: "💤 React 💤",
                    value: "react",
                },
            ],
        },
    ];
    if (opts.init && opts.complement) {
        console.log(chalk.red("The (-i, --init parameter) and (-c, --complement parameter) cannot complement each other"));
    } else if (opts.init) {
        // 初始化创建操作
        inquirer
            .prompt(questionArr)
            .then((answers) => {
                rbjCreateFun(`${answers.languageType}/${answers.frameType}`);
            })
            .catch((err) => {
                console.error(err);
            });
    } else if (opts.complement) {
        // 判断是否进行补全操作
        inquirer
            .prompt(questionArr)
            .then((answers) => {
                complementFun(`${answers.languageType}/${answers.frameType}`);
            })
            .catch((err) => {
                console.error(err);
            });
    } else {
        // programCommand.args.length == 1 && programCommand.args[0] === "rbj-tool" 的判断, 是为了防止当前项目中只有一条命令, npx 自动把 npm 包名, 当作 rbj-tool 来使用时的情况
        if (programCommand.args.length === 0 || (programCommand.args.length == 1 && programCommand.args[0] === "rbj-tool")) {
            console.log(chalk.red("rbj-tool requires the [options] parameter"));
        } else {
            console.log(chalk.red("parameter error"));
        }
    }
}

// 导出 create 命令函数
export default rbjCreate;
