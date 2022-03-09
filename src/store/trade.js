import { reqOrderInfo, reqUserAddress } from "../api"

const state = {
    address: [],
    orderInfo:{}
}
const mutations = {
    GET_USER_ADDRESS(state, res) {
        state.address = res
    },
    GET_ORDER_INFO(state,res){
        state.orderInfo = res
    }
}
const actions = {
    async getUserAddress({ commit }) {
        let res = await reqUserAddress()
        if (res.code == 200) {
            commit("GET_USER_ADDRESS", res.data)
        } else {
            return Promise.reject(new Error(res.message))
        }
    },
    async getOrderInfo({ commit }) {
        let res = await reqOrderInfo()
        if (res.code == 200) {
            commit("GET_ORDER_INFO", res.data)
        } else {
            console.log(res);
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