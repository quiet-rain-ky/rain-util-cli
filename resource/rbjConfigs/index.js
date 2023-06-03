import { UniRbjTwo, importsConfigObj } from "rain-interface-tools";
import { FixedVal } from "./fixedValue.js";
import globalFun from "./globalFun.js";

/**
 * 融合指定目录下, 所有的接口配置对象
 * Vue2 方式
 */
const configObj = importsConfigObj(
    require
        .context("./subConfig/", true, /.js$/)
        .keys()
        .map((item) => require("./subConfig/" + item.substr(2, item.length)))
);

/**
 * 融合指定目录下, 所有的接口配置对象
 * Vue3 方式
 */
// const configObj = importsConfigObj(import.meta.globEager("./subConfig/**.js"));

/**
 * 初始化 rbj 对象
 */
export default new UniRbjTwo({
    reqAddress: FixedVal.REQ_ADDRESS,
    tokenName: FixedVal.TOKEN_NAME,
    logs: FixedVal.LOGS,
    falseDataMode: FixedVal.FALSE_DATA_MODE,
    userConfig: configObj,
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
