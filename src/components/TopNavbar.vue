<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="@/assets/qr_code_icon.png" alt="QRodizio logo" />
      </b-navbar-item>
    </template>

    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Home
      </b-navbar-item>

      <LoggedUserRoutes v-if="logged" />
    </template>

    <template slot="end" v-if="logged">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-light" @click="logUserOut">
            Log out
          </a>
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
