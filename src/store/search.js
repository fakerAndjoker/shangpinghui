//search模块的小仓库

import { reqGetSearchInfo } from "@/api/index"


const state = {
    searchList: {},
};
const mutations = {
    GET_SEARCH_INFO(state, res) {
        state.searchList = res
    }
};
const actions = {
    //search的信息
    //这个请求的参数最起码是一个空对象
    async getSearchInfo({ commit }, params = {}) {
        let res = await reqGetSearchInfo(params)
        if (res.code == 200) {
            commit("GET_SEARCH_INFO", res.data)
        }
    }
};
const getters = {
    //这个state是当前小模块的state
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    }

};

export default {
    //开启命名空间
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}