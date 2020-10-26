<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="@/assets/qr_code_icon.png" alt="QRodizio logo" />
      </b-navbar-item>
    </template>

    <template slot="start">
      <b-navbar-item tag="router-link" to="/">
        Home
      </b-navbar-item>

      <b-navbar-item tag="router-link" to="/table/1-59a9639a-1778-11eb-aa36-7429afd877c3">
        Pedidos
      </b-navbar-item>

      <LoggedUserRoutes v-if="logged" />
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a v-if="logged" class="button is-light" @click="logUserOut">
            Log out
          </a>
          <b-button v-else tag="router-link" to="/login" type="is-link">
            Log in
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import LoggedUserRoutes from "./LoggedUserRoutes";

export default {
  name: "TopNavbar",

  components: { LoggedUserRoutes },

  computed: {
    logged() {
      return this.$store.getters.logged;
    },
  },

  methods: {
    logUserOut() {
      this.$store.dispatch("logUserOut");
      this.$router.push("/");
    },
  },
};
</script>
