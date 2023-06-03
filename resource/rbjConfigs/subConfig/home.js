/**
 * @type {import('rain-interface-tools/types/interFaceModuleConfig').default}
 * 这是非模块化的方式 (注意: 模块化和非模块化两种方式, 可以一起用, 没有限制)
 */
export default {
    home: {
        description: "获取首页信息",
        url: "/home",
        method: "POST",
        paramsData(data, operandObj) {},
        interfaceData(data, operandObj) {},
    },
};
