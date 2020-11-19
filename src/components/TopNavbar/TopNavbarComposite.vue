<template>
  <b-navbar id = "header">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="@/assets/Logov.png" alt="QRodizio logo" />
      </b-navbar-item>
    </template>

    <template slot="start">
      <slot></slot>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a v-if="logged" class="button is-light" @click="confirmLogOut">
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
import { mapState, mapGetters } from "vuex";

export default {
  name: "TopNavbarComposite",

  computed: {
    logged() {
      return this.$store.getters.logged;
    },

    ...mapState(['userData'])
  },

  methods: {
    async confirmLogOut() {
      this.$buefy.dialog.confirm({
        message: "Deseja realmente fazer log out?",
        onConfirm: async () => await this.logUserOut(),
      });
    },
    async logUserOut() {
      await this.$socket.emit("employee_to_logout", this.userData);
      this.$store.dispatch("logUserOut");
      this.$router.push("/");
      
    },
  },
};
</script>

<style>
  #header{
    background: linear-gradient(315deg, #d7ddd7 0%, #d7ddd7 32%);
  }
  #link{
    color: #ffffff;
  }
</style>