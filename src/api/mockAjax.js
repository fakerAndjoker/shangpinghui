import axios from "axios";

import nprogress from "nprogress";
//引入样式
import "nprogress/nprogress.css"

const instance = axios.create({
    baseURL: "/mock",
    timeout: 5000,
});

//请求拦截器:在请求发出之前做一些事情
instance.interceptors.request.use((config) => {
    //config:配置对象，对象里面有一个headers属性
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