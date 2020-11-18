<template>
  <fragment>
    <a class="navbar-item"
      @click="go"
    >
      Pedidos
    </a>
  </fragment>
</template>

<script>
export default {
  name: "BaseRoutesLeaf",

  data() {
    return {
      sessionUrl: "",
    };
  },

  async mounted() {
    this.sessionUrl = '/table/'+localStorage.getItem('urlParam');
  },

  methods: {
    go(){
      this.$router.push('/table/'+localStorage.getItem('urlParam'));
    }
  }
};
</script>

<style></style>
