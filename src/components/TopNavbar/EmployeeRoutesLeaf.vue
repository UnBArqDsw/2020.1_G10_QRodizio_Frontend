<template>
  <fragment>
    <b-navbar-item
      tag="router-link"
      to="/user-home"
      v-bind:class="{ hidden: notLogged }"
    >
      Página inicial
    </b-navbar-item>

    <b-navbar-item
      tag="router-link"
      to="/employee-demands"
      v-bind:class="{ hidden: notLogged }"
    >
      Listar pedidos
    </b-navbar-item>

    <b-navbar-item
      tag="router-link"
      to="/list-tables"
      v-bind:class="{ hidden: notLogged }"
    >
      Mesas
    </b-navbar-item>
  </fragment>
</template>

<script>
export default {
  name: "EmployeeRoutesLeaf",

  computed: {
    notLogged() {
      return !this.$store.getters.logged;
    },
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
