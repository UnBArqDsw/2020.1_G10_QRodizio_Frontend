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
      <span class="spacer" v-if="isTableCalling">
        <b-icon icon="bell" size="is-small" type="is-danger" /> {{ totalTableCalling }}
      </span>
    </b-navbar-item>
  </fragment>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "EmployeeRoutesLeaf",

  computed: {
    notLogged() {
      return !this.$store.getters.logged;
    },

    ...mapGetters(['isTableCalling', 'totalTableCalling'])
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
.spacer {
  margin-left: 10px;
}
</style>
