import { reqShopCartList, reqDeleteById, reqUpdateCheckedById } from "@/api/index"

const state = {
    cartInfoList: []
}

const mutations = {
    GET_SHOP_CART_LIST(state, res) {
        state.cartInfoList = res.length > 0 ? res[0].cartInfoList : []
    }
}

const actions = {
    async getShopCartList({ commit }) {
        let res = await reqShopCartList()
        if (res.code = 200) {
            commit("GET_SHOP_CART_LIST", res.data)
        }
    },
    async deleteById({ commit }, skuId) {
        let res = await reqDeleteById(skuId)
        return res
    },
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let res = await reqUpdateCheckedById(skuId, isChecked)
        if (res.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    deleteAllSelected({ dispatch, state }) {
        let promiseAll = []
        state.cartInfoList.forEach((item) => {
            if (item.isChecked == 1) {
                let promise = dispatch("deleteById", item.skuId)
                promiseAll.push(promise)
            }
        })
        return Promise.all(promiseAll)
    },
    updateAllChecked({ dispatch, state }, isChecked) {
        let promiseAll = []
        state.cartInfoList.forEach((item) => {
            let promise = dispatch("updateCheckedById", { skuId: item.skuId, isChecked })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
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