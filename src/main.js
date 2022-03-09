import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css'


//导入模拟数据的文件
import '@/mock/mockServe.js'

//引入swiper

import "swiper/css/swiper.css"

import * as API from "@/api"

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

//导入图片懒加载数据
import VueLazyload from 'vue-lazyload'
//loading那里直接写图片路径好像不行。
import atm from "@/assets/images/1.gif"
Vue.use(VueLazyload, {
    loading: atm
})

//引入表单验证插件
import "@/plugins/validate";

new Vue({
    //全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    },
    router,
    store,
    render: h => h(App)
}).$mount('#app')
