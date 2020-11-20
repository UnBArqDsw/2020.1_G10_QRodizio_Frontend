import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { Plugin } from "vue-fragment";
import VueSocketIO from "vue-socket.io";

Vue.config.productionTip = false;
Vue.use(Buefy);
Vue.use(Plugin);

const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_BASE_URL;

const vueSocketIO = new VueSocketIO({
  debug: true,
  connection: BACKEND_BASE_URL,
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_",
  },
});

Vue.use(vueSocketIO);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
