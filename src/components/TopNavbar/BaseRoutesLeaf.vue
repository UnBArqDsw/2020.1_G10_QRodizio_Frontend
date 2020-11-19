<template>
  <fragment>
    <a class="navbar-item" @click="go" v-if="urlParam.length > 0">
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

  computed: {
    urlParam() {
      let url = localStorage.getItem("urlParam");

      if (url == null || url == "null") url = "";

      return url;
    },
  },

  async mounted() {
    this.sessionUrl = "/table/" + this.urlParam;
  },

  methods: {
    go() {
      if (this.urlParam == "") return;

      this.$router.push("/table/" + this.urlParam);
    },
  },
};
</script>

<style></style>
