<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link v-if="!logged" to="/loggin">Loggin</router-link>
    <router-link v-else to="/user-home">User Home</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "App",

  mounted() {
    let userToken = localStorage.getItem("userToken");

    if (userToken !== null && userToken.length > 0) {
      this.$store.dispatch("logUserIn", userToken);
      this.logged = true;
    }
  },

  computed: {
    logged() {
      return this.$store.state.userToken.length > 0;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
