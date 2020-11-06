import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userToken: "",
    userData: {},
    tableSession: {},
    loggedUsers: {},
  },
  mutations: {
    logUserIn(state, { token, user }) {
      state.userToken = token;
      state.userData = user;

      localStorage.setItem("userToken", token);
      localStorage.setItem("userData", JSON.stringify(user));
    },

    SOCKET_logUserIn(state, { user }) {
      console.log(`User ${user.email} logged`);
    },

    logUserOut(state) {
      state.userToken = "";
      state.userData = {};

      localStorage.setItem("userToken", "");
      localStorage.setItem("userData", "");
    },

    setTableSesssion(state, session) {
      state.tableSession = session;
    },

    setLoggedUsers(state, users) {
      state.loggedUsers = users;
    }
  },
  actions: {
    logUserIn(context, { token, user }) {
      context.commit("logUserIn", { token, user });
    },

    logUserOut(context) {
      context.commit("logUserOut");
    },

    setTableSesssion(context, session) {
      context.commit("setTableSesssion", session);
    },

    setLoggedUsers(context, users) {
      context.commit("setLoggedUsers", users);
    }
  },
  getters: {
    logged(state) {
      return state.userToken.length > 0;
    },

    isManager(state) {
      const userDataIsEmpty = Object.keys(state.userData).length === 0;

      if (userDataIsEmpty) return false;

      return state.userData.role === 1;
    },

    loggedUsers(state) {
      return state.loggedUsers;
    }
  },
});
