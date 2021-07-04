import Toast from "./component/index.vue"
export default {
    install(Vue, Options) {
        let ToastConstructor = Vue.extend(Toast)        // 获取toast构造实例
        Vue.prototype.$toast = toast;                   // 将toast的调用封装成一个方法，挂载到Vue的原型上

        function toast(args) {
            // 实例化组件
            const instance = new ToastConstructor({ propsData: args });
            document.body.append(instance.$mount().$el)
            
            /* 等价于
             * let div = document.createElement('div'); // 手动创建toast的挂载容器
             * instance.$mount(div)                     // 解析挂载toast
             * document.body.append(instance.$el)       // 将toast挂载到body中
             */
        }
    }
}