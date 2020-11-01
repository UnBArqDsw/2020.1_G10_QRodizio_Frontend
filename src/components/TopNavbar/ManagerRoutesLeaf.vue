<template>
  <fragment>
    <b-navbar-item
      tag="router-link"
      to="/register-new-user"
      v-bind:class="{ hidden: userIsNotManager }"
    >
      Registrar novo usuário
    </b-navbar-item>

    <b-navbar-item
      tag="router-link"
      to="/list-users"
      v-bind:class="{ hidden: userIsNotManager }"
    >
      Listar usuários
    </b-navbar-item>
  </fragment>
</template>

<script>
export default {
  name: "ManagerRoutesLeaf",

  computed: {
    userIsNotManager() {
      if (!this.$store.getters.logged) return true;

      return !this.$store.getters.isManager;
    },
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
