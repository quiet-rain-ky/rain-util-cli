export class FixedVal {
    /**
     * 接口请求的服务器地址
     */
    static REQ_ADDRESS = "localhost:8080";
    /**
     * 自定义接口请求头的默认 token 属性名
     */
    static TOKEN_NAME = "token";
    /**
     * 控制 rbj 是否打印日志
     */
    static LOGS = process.env.NODE_ENV === "development";
    /**
     * 控制 rbj 是否开启假数据模式
     */
    static FALSE_DATA_MODE = false;
}
