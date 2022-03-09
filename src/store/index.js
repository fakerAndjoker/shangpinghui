import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import home from './home'
import search from './search'
import detail from './detail'
import shopCart from './shopCart'
import user from './user'
import trade from './trade'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
      home,
      search,
      detail,
      shopCart,
      user,
      trade
  }
})
