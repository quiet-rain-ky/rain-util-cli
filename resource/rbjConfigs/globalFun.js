/**
 * @type {import('rain-interface-tools/types/interfaceButtJoint').globalFunType}
 */
export default {
    // 示例 (变量|函数):
    one: 1, // 可以定义常用的全局变量, 可以在组件内直接用 this.$rbj.one 的方式调用

    // 可以在组件内直接用 this.$rbj.fun_one() 的方式进行调用
    fun_one() {
        console.log("这是全局初始化的第一个全局自定义函数", this.$rbj); // 当前 全局函数内, 也可以通过 this 来调用 $rbj 对象
        this.fun_two(); // 注意: 全局函数内, 可以直接使用 this 来调用其他全局函数
    },
    fun_two() {
        console.log("这是全局初始化的第二个全局自定义函数");
    },
};
