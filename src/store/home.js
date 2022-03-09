//home模块的小仓库

import { reqCategoryList, reqBannerList, reqFloorList } from '@/api/index'

const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
};
const mutations = {
    GET_CATEGORY_LIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GET_BANNER_LIST(state, res) {
        state.bannerList = res
    },
    GET_FLOOR_LIST(state, res) {
        state.floorList = res
    }
};
const actions = {
    //获取三级列表
    async getCategoryList({ commit }) {
        let res = await reqCategoryList();
        if (res.code == 200) {
            commit("GET_CATEGORY_LIST", res.data)
        }
    },

    //获取轮播图
    async getBannerList({ commit }) {
        let res = await reqBannerList();
        if (res.code == 200) {
            commit("GET_BANNER_LIST", res.data)
        }
    },

    //floor
    async getFloorList({ commit }) {
        let res = await reqFloorList();
        if (res.code == 200) {
            commit("GET_FLOOR_LIST", res.data)
        }
    }

};
const getters = {};


export default {
    state,
    mutations,
    actions,
    getters
}