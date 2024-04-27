import { Rbj, importsConfigObj } from "rain-interface-tools";
import { FixedVal } from "./fixedValue.ts";
import globalFun from "./globalFun.ts";
// 接口配置文件导入
import homeInterfaceConfig from "./subConfig/home.ts";
import userInterfaceConfig from "./subConfig/user.ts";

// 融合配置模块
const configObj = importsConfigObj<typeof globalFun>([homeInterfaceConfig, userInterfaceConfig]);

// 也可以使用下方 'require.context()' 和 'import.meta.globEager()' 两种方式, 当然前提是当前项目支持使用这两种 API 接口函数

/**
 * 使用 vite 独有的 api 接口, 'import.meta.globEager()' 融合指定目录下, 所有的接口配置对象
 */
// const configObj = importsConfigObj(import.meta.globEager("./subConfig/**.js"));

/**
 * 使用 webpack 独有的 api 接口, 'require.context()' 融合指定目录下, 所有的接口配置对象
 */
// const configObj = importsConfigObj(
//     require
//         .context("./subConfig/", true, /.js$/)
//         .keys()
//         .map((item) => require("./subConfig/" + item.substr(2, item.length)))
// );

/**
 * 初始化 rbj 对象
 */
export default new Rbj<typeof globalFun>({
    /**
     * 请求的主机地址, 默认值: "localhost:8080", 当需要使用 https 时, 可以直接在请求地址前面加 https://localhost:8080
     */
    reqAddress: FixedVal.REQ_ADDRESS,
    /**
     * 自定义 token 在请求头上的名字，默认值："Authorization"
     */
    tokenName: FixedVal.TOKEN_NAME,
    /**
     * 控制台是否进行日志输出, 默认值: false
     */
    logs: FixedVal.LOGS,
    /**
     * 是否开启假数据模式, 开启后 接口不在发送请求, 我们可以在接口配置的 interfaceData() 函数中, 自定义一些模拟数据返回, 并在组件中使用, 默认值: false
     * 注意: 假数据模式下, 接口的数据变成了自定义的模拟数据, autoButtJoint() 和 buttJoint() 函数在接收请求数据时, 接收的数据也会变成我们自定义的模拟数据
     */
    falseDataMode: FixedVal.FALSE_DATA_MODE,
    /**
     *  用户的接口配置对象, configObj 即 使用上方的 importsConfigObj 函数导入多个 js 文件合成的对象
     */
    userConfig: configObj,
    /**
     * 初始化全局自定义调用函数, 可以在任何组件内使用 this.$rbj.globalFun.自定义的函数名(); 来调用
     * 注意: 也可以自定义一些, 常用的全局变量, 也可以用 this.$rbj.globalFun.变量名, 的方式来调用
     */
    globalFun: globalFun,
    /**
     * 全局请求过滤器函数
     */
    globalRequestFilterFun(reqParams, pathParams, rbjObj, currentUserConfigObjData, operandObj) {
        return false;
    },
    /**
     * 全局响应过滤器函数
     */
    globalResponseFilterFun(respData, rbjObj, currentUserConfigObjData, operandObj) {
        return false;
    },
    /**
     * 全局请求错误回调函数
     */
    globalRequestErrorFun(err, rbjObj) {
        console.log(err, "请求错误");
    },
});
