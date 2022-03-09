//登录和注册共用的store

import { reqCode, reqUserRegister } from "@/api/index"
import { reqUserLogin, reqUserInfo, reqUserLoginOut } from "../api"

const state = {
    code: "",
    //开始时本地存储中没有token，所以token的初始值为空
    token: localStorage.getItem("TOKEN"),
    userInfo: {},
}
const mutations = {
    GET_CODE(state, res) {
        state.code = res
    },
    GET_USER_INFO(state, res) {
        state.userInfo = res
    },
    USER_LOGIN(state, res) {
        state.token = res
    },
    LOGIN_OUT(state) {
        state.token = ""
        state.userInfo = {}
        localStorage.removeItem("TOKEN")
    }
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let res = await reqCode(phone)
        if (res.code == 200) {
            commit("GET_CODE", res.data)
            return "ok"
        } else {
            return Promise.reject(new Error("获取验证码失败"))
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let res = await reqUserRegister(user)
        if (res.code == 200) {
            return "ok"
        } else {
            console.log(res);
            return Promise.reject(new Error("fail"))
        }
    },
    //用户登录
    async userLogin({ commit }, userInfo) {
        let res = await reqUserLogin(userInfo)
        if (res.code == 200) {
            commit("USER_LOGIN", res.data.token)
            localStorage.setItem("TOKEN", res.data.token)
            return "ok"
        } else {
            console.log(res);
            return Promise.reject(new Error(res.message))
        }
    },
    //用户信息
    async getUserInfo({ commit, state }) {
        let res = await reqUserInfo()
        if (res.code == 200) {
            commit("GET_USER_INFO", res.data)
            return "ok"
        } else {
            console.log(res);
            return Promise.reject(new Error(res.message))
        }
    },
    //退出登录
    async loginOut({ commit }) {
        let res = await reqUserLoginOut()
        if (res.code == 200) {

            commit("LOGIN_OUT")
            return "ok"
        } else {
            return Promise.reject(new Error(res.message))
        }
    }
}
const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}