

import { reqGetDetailInfo, reqUpdateShopCart } from "@/api/index"
import { getUUID } from "../utils/uuid_token"
const state = {
    detailInfo: {},
    uuid: getUUID()
}

const mutations = {
    GET_DETAIL_INFO(state, res) {
        state.detailInfo = res
    }
}


const actions = {
    //获得商品详情
    async getDetailInfo({ commit }, skuId) {
        let res = await reqGetDetailInfo(skuId)
        if (res.code = 200) {
            commit("GET_DETAIL_INFO", res.data)
        }
    },
    //更新购物车
    // 参数若有多个则要用对象的形式
    async updateShopCart({ commit }, { skuId, skuNum }) {
        let res = await reqUpdateShopCart(skuId, skuNum)
        if (res.code == 200) {
            console.log("添加成功");
        }
        return res
    }
}

const getters = {
    //路径导航简化的数据
    categoryView(state) {
        //若没获取到数据就返回一个空对象
        return state.detailInfo.categoryView || {}
    },
    //产品信息
    skuInfo(state) {
        return state.detailInfo.skuInfo || {}
    },
    //产品售卖属性
    spuSaleAttrList(state) {
        return state.detailInfo.spuSaleAttrList || []
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}