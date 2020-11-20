<template>
  <div>
    <TopNavbarComposite>
      <BaseRoutesLeaf />
      <EmployeeRoutesLeaf />
      <ManagerRoutesLeaf />
    </TopNavbarComposite>
  </div>
</template>

<script>
import TopNavbarComposite from "./TopNavbarComposite";
import BaseRoutesLeaf from "./BaseRoutesLeaf";
import EmployeeRoutesLeaf from "./EmployeeRoutesLeaf";
import ManagerRoutesLeaf from "./ManagerRoutesLeaf";

export default {
  name: "TopNavbar",

  components: {
    TopNavbarComposite,
    BaseRoutesLeaf,
    EmployeeRoutesLeaf,
    ManagerRoutesLeaf,
  },

  computed: {
    logged() {
      return this.$store.getters.logged;
    },

    isManager() {
      return this.$store.getters.isManager;
    },
  },
};
</script>

<style scoped>
.hide-it {
  display: none;
}
</style>
