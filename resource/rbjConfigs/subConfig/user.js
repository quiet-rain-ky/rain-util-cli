/**
 * @type {import('rain-interface-tools/types/interFaceModuleConfig').default}
 * 这是模块化的方式写法 (注意: 模块化和非模块化两种方式, 可以一起用, 没有限制)
 */
export default {
    moduleName: "user 用户模块",
    moduleUrl: "/user",
    interfaceList: {
        login: {
            description: "用户登录",
            url: "/login",
            method: "POST",
            paramsData(data, operandObj) {},
            interfaceData(data, operandObj) {},
        },
    },
};
