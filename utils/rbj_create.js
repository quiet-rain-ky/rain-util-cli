const fs = require("fs");
const path = require("path");
const { copyDirAsync, copyMissingFiles } = require("../tools/fileTools");

// 配置文件初始化创建函数
function rbjCreateFun() {
    // process.cwd() 可以直接获取当前命令运行的目录
    let targetDir = process.cwd() + "/rbjConfigs";
    if (fs.existsSync(targetDir)) {
        console.log("The rbjConfigs directory already exists. You can use 'rain-tools rbj-init -c' to complete the configuration file");
    } else {
        let sourceDir = path.join(__dirname, "../resource/rbjConfigs");
        copyDirAsync(sourceDir, targetDir).then((res) => {
            console.log("All configuration files of rain-interface-tools have been successfully initialized. Procedure");
        });
    }
}

// 配置文件补全函数
function complementFun() {
    let sourceDir = path.join(__dirname, "../resource/rbjConfigs");
    // process.cwd() 可以直接获取当前命令运行的目录
    let targetDir = process.cwd() + "/rbjConfigs";
    copyMissingFiles(sourceDir, targetDir).then((res) => {
        console.log("All missing rain-interface-tools configuration files have been completed");
    });
}

// rbj-init 命令的回调函数
function rbjCreate(opts) {
    if (opts.complement) {
        // 判断是否进行补全操作
        complementFun();
    } else {
        // 初始化创建操作
        rbjCreateFun();
    }
}

// 导出 create 命令函数
module.exports = rbjCreate;
