import { Rbj, importsConfigObj } from "rain-interface-tools";
import { FixedVal } from "./fixedValue.js";
import globalFun from "./globalFun.js";

/**
 * 融合指定目录下, 所有的接口配置对象
 */
const configObj = importsConfigObj(import.meta.globEager("./subConfig/**.js"));

/**
 * 初始化 rbj 对象
 */
let core_Rbj = new Rbj({
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
});

export default core_Rbj;
