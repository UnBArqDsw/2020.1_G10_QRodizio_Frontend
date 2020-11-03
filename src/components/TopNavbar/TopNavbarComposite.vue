<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="@/assets/qr_code_icon.png" alt="QRodizio logo" />
      </b-navbar-item>
    </template>

    <template slot="start">
      <slot></slot>
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
export default {
  name: "TopNavbarComposite",

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
