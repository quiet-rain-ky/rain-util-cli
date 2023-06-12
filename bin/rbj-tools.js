#!/usr/bin/env node

import { program } from "commander";
import rbjCreate from "../utils/rbj_create.js";

// 输出版本信息
program.version("1.0.8", "-v, --version", "rain-tools version information");

// rbj-tool 命令解释说明
program.description("all required rain-interface-tools configuration files are automatically generated");

// 定义 rbj-tool 命令的 -i 参数
program.option("-i, --init", "Initialize the configuration files of all Rbj");

// 定义 rbj-tool 命令的 -c 参数
program.option("-c, --complement", "auto complement configuration files");

// 定义 rbj-tool 命令的回调函数
program.action(rbjCreate);

// 解析参数, parse() 函数会默认自动解析 process.argv 变量中的参数
program.parse();
