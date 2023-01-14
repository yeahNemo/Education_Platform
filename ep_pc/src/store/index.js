import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    userRights: {},
  },
  getters: {},
  mutations: {
    setUserInfo(state, value) {
      state.userInfo = value;
    },
    setUserRights(state, value) {
      state.userRights = value;
    },
  },
  actions: {},
  modules: {},
});
