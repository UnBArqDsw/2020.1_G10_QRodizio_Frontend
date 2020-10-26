import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: "",
    tableSession: {}
  },
  mutations: {
    logUserIn(state, token) {
      state.userToken = token;
      localStorage.setItem("userToken", token);
    },

    logUserOut(state) {
      state.userToken = "";
      localStorage.setItem("userToken", "");
    },

    setTableSesssion(state, session) {
      state.tableSession = session;
    },
  },
  actions: {
    logUserIn(context, token) {
      context.commit("logUserIn", token);
    },

    logUserOut(context) {
      context.commit("logUserOut");
    },

    setTableSesssion(context, session) {
      context.commit("setTableSesssion", session);
    },
  },
  getters: {
    logged(state) {
      return state.userToken.length > 0;
    }
  }
})
