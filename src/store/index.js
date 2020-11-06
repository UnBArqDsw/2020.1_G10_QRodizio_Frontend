import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userToken: "",
    userData: {},
    tableSession: {},
    loggedUsers: {},
    tablesCalling: {},
  },
  mutations: {
    logUserIn(state, { token, user }) {
      state.userToken = token;
      state.userData = user;

      localStorage.setItem("userToken", token);
      localStorage.setItem("userData", JSON.stringify(user));
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
    },

    addTableToCalling(state, table) {
      if (table["session"]["id"] in state.tablesCalling) return;

      state.tablesCalling = {
        [table["session"]["id"]]: table["session"],
        ...state.tablesCalling,
      };
    },

    removeTableToCalling(state, table) {
      let copy = { ...state.tablesCalling };
      delete copy[table["session"]["id"]];

      state.tablesCalling = { ...copy };
    },
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
    },

    addTableToCalling(context, table) {
      context.commit("addTableToCalling", table);
    },

    removeTableToCalling(context, table) {
      context.commit("removeTableToCalling", table);
    },
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
    },

    isTableCalling(state) {
      return Object.keys(state.tablesCalling).length > 0;
    },

    totalTableCalling(state) {
      console.log(state.tablesCalling);
      return Object.keys(state.tablesCalling).length;
    },
  },
});
