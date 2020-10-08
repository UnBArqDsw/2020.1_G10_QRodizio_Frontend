import { createStore } from "vuex";

export default createStore({
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
  modules: {}
});
