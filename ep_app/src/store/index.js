import Vue from 'vue'
import Vuex from 'vuex'
// 数据持久化
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  getters: {},
  mutations: {
    setUserInfo (state, value) {
      state.userInfo = value
    }
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      // 存储方式：localStorage、sessionStorage、cookies
      storage: window.sessionStorage,
      // 存储的 key 的key值
      key: 'store',
      render (state) {
        // 要存储的数据：本项目采用es6扩展运算符的方式存储了state中所有的数据
        return { ...state }
      }
    })
  ]
})
