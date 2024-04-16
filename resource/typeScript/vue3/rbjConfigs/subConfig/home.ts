/**
 * @type {import('rain-interface-tools/types/interFaceConfig').default}
 * 这是非模块化的方式 (注意: 模块化和非模块化两种方式, 可以一起用, 没有限制)
 */
export default {
    // 对接对象 one, 此属性名是自定义的
    one: {
        // 可选, 默认为 ''
        description: "接口描述说明",
        // 自定义当前接口的请求服务地址(注意: 自定义当前接口的请求服务地址时, 必须要带上 http:// 或 https:// 协议前缀), 默认使用全局的 reqAddress 路径
        reqAddress: "https://localhost:8080/",
        // 当全局是别的请求对象时是否临时使用 fetch 为请求对象, 注意: 当处于 uniapp 项目时此选项不可用
        tempUseFetch: true,
        // 设置请求路径
        url: "/user/home",
        // 请求的方法类型
        method: "GET", // GET 方法默认是 application/x-www-form-urlencoded 的方式, 进行传参, POST 默认是 application/json 的形式, 进行传参
        // 当前接口的请求配置对象
        requestConfig: {
            // 配置当前接口的请求头
            headers: {
                // 注意: 设置属性名时, 必须加上双引号, 才会生效
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            //... 还可以配置一些其他的属性
        },
        /**
         * 当声明了此函数时 会对参数进行过滤, 此函数返回什么数据, 请求时就发送什么样的参数给服务器
         * @param data | Object 说明: data 包含 paramsObj 主体参数, pathParams 路径参数, 可以直接修改 data 对象中 属性的引用数据, 进行达到修改请求参数的作用
         * @param operandObj | Object 说明: operandObj 自动化对接时要进行装配数据的操作对象, 非自动对接时此值为 null
         * @param isAppendData | boolean 说明: 当前接口是否处于追加模式, 非自动对接时此值为 null, 注意: 处于自动对接时除非你在 autoButtJoint() 的 options 对象中设置了此 isAppendData 属性, 否则此处的 isAppendData 还是为空
         * @param frontORback | boolean 说明: 处于追加模式时, 确认向前追加数据 还是 向后追加数据, 非自动对接时此值为 null, 默认值: false 向后追加
         */
        paramsData(data, operandObj, isAppendData, frontORback) {
            // data.paramsObj = {names: "小明"};
            // data.pathParams = 1;
            // data.paramsObj = JSON.stringify(data.paramsObj); // 也可以将整个参数转成 json 字符串
            // 注意: 本函数只具有, 修改请求参数的功能, 不具备拦截并中断请求的功能
            return {
                // 如有返回值请按照下方格式进行返回
                paramsObj: {}, // 此返回值对 paramsObj 参数对象进行重新设置
                pathParams: "", // 此返回值对 pathParams 参数进行重新设置
            };
        },
        // 过滤响应数据, 不管是 buttJoint 手动对象, 还是 autoButtJoint 自动对接, 此 interfaceData() 函数都会运行(即都可以正常的进行响应数据的过滤操作)
        interfaceData(data, operandObj) {
            // data 服务器响应的对象, operandObj 自动化对接时要进行装配数据的操作对象, 非自动对接时此值为 null, 注意: 只有接口对接时才能使用此函数, 或者假数据模式下也可以使用, 但是 假数据模式下 此 data 没有数据
            // 数据对接操作, 返回什么数据, 组件中的数据就会接收什么数据
            // return {}
            // 注意: 本函数只具有修改响应数据的功能, 不具有拦截响应的功能
            // 注意: 如果 return 返回的是未定义的属性 或 undefined , Rbj插件对象则会当作此函数没有返回数据, 且响应的数据会不经过 interfaceData 函数的过滤, 直接返回的页面上, 所以 return 前最好先判断一个返回的属性是否存在
            // 注意: 如果返回的是 null, Rbj插件对象则会当作此函数已返回数据, 即 返回 null 是有效的
        },
    },
    two: "one", // 把 one 接口定义一个 two 别名, 即支持对一个接口加一个别名, 主要是为了一个接口在不同页面使用，会造成不知道这是哪个页面的接口，所以给同一个接口定义多个别名，可以让你在进行 多模块或多页面 式的开发时，更容易分辨出不同模块或不同页面的接口
};
