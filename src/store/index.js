import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: ""
  },
  mutations: {
    logUserIn(state, token) {
      state.userToken = token;
      localStorage.setItem("userToken", token);
    },

    logUserOut(state) {
      state.userToken = "";
      localStorage.setItem("userToken", "");
    }
  },
  actions: {
    logUserIn(context, token) {
      context.commit("logUserIn", token);
    },

    logUserOut(context) {
      context.commit("logUserOut");
    }
  },
})
