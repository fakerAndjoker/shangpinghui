import axios from "axios";

import nprogress from "nprogress";
//引入样式
import "nprogress/nprogress.css";

//引入store获取临时的UUID
import store from "@/store"

const instance = axios.create({
    baseURL: "/api",
    timeout: 5000,
});

//请求拦截器:在请求发出之前做一些事情
instance.interceptors.request.use((config) => {
    //config:配置对象，对象里面有一个headers属性
    //给请求头添加UUID
    if (store.state.detail.uuid) {
        config.headers.userTempId = store.state.detail.uuid
    }
    //添加token获取用户信息
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    nprogress.start();
    return config;
})

//响应拦截器
instance.interceptors.response.use((res) => {
    nprogress.done()
    return res.data;
}, (error) => {
    console.log(error);
    return Promise.reject(new Error('fail'));
})

export default instance;