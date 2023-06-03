import fs from "fs";
import path from "path";
// fs 默认使用的是 同步对象, 即同步对象中所有对文件的操作都是同步的, 所有我们在此处从 fs 模块中获取文件操作的异步对象
const fsPromises = fs.promises;

// 同步复制整个目录
function copyDirSync(src, dest) {
    // 创建目标目录
    fs.mkdirSync(dest, { recursive: true });

    // 读取源目录中的所有文件和子目录
    const files = fs.readdirSync(src);

    // 遍历源目录中的所有文件和子目录
    for (const file of files) {
        // 获取源文件的路径和目标文件的路径
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        // 判断当前文件是否为目录
        if (fs.statSync(srcPath).isDirectory()) {
            // 如果是目录，递归调用 copyDir 函数
            copyDir(srcPath, destPath);
        } else {
            // 如果是文件，使用 fs.copyFileSync 函数复制文件
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// 同步复制单独一个文件
function copyFileSync(src, dest) {
    fs.copyFileSync(src, dest);
}

// 异步复制整个目录
async function copyDirAsync(src, dest) {
    try {
        // 创建目标目录
        await fsPromises.mkdir(dest, { recursive: true });

        // 读取源目录中的所有文件和子目录
        const files = await fsPromises.readdir(src);

        // 遍历源目录中的所有文件和子目录
        for (const file of files) {
            // 获取源文件的路径和目标文件的路径
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);

            // 判断当前文件是否为目录
            const stat = await fsPromises.stat(srcPath);
            if (stat.isDirectory()) {
                // 如果是目录，递归调用 copyDirAsync 函数
                await copyDirAsync(srcPath, destPath);
            } else {
                // 如果是文件，使用 fsPromises.copyFile 函数复制文件
                await fsPromises.copyFile(srcPath, destPath);
            }
        }
    } catch (error) {
        console.error(error);
    }
}

// 异步复制单独一个文件
async function copyFileAsync(src, dest) {
    try {
        await fsPromises.copyFile(src, dest);
    } catch (error) {
        console.error(error);
    }
}

// 源目录和指定目录进行对比, 如果指定目录缺少源目录中的某个目录或文件, 则从源目录中复制到指定的目录中
async function copyMissingFiles(src, dest) {
    const exists = await fsPromises
        .access(dest)
        .then(() => true)
        .catch(() => false);
    if (!exists) {
        throw `${path.normalize(dest).replace(/\\/g, "/")} Path does not exist`;
    } else {
        // 使用 fsPromises.readdir 方法读取源目录中的所有文件和子目录
        const files = await fsPromises.readdir(src);
        // 遍历源目录中的每个文件和子目录
        for (const file of files) {
            // 计算源文件路径和目标文件路径
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);
            // 使用 fsPromises.stat 方法获取文件或目录的状态信息
            const stats = await fsPromises.stat(srcPath);
            if (stats.isDirectory()) {
                // 如果是目录，则递归调用 copyMissingFiles 函数进行复制
                const exists = await fsPromises
                    .access(destPath)
                    .then(() => true)
                    .catch(() => false);
                if (!exists) {
                    // 如果目标目录中不存在该目录，则创建该目录
                    await fsPromises.mkdir(destPath);
                    // 递归复制子目录
                    await copyMissingFiles(srcPath, destPath);
                } else {
                    // 如果目标目录中已存在该目录，则递归复制子目录
                    await copyMissingFiles(srcPath, destPath);
                }
            } else {
                // 如果是文件，则直接复制
                const exists = await fsPromises
                    .access(destPath)
                    .then(() => true)
                    .catch(() => false);
                if (!exists) {
                    // 如果目标目录中不存在该文件，则复制该文件
                    await fsPromises.copyFile(srcPath, destPath);
                }
            }
        }
    }
}

export { copyDirSync, copyFileSync, copyDirAsync, copyFileAsync, copyMissingFiles };
