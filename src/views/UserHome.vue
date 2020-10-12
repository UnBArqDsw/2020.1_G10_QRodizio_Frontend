<template>
  <div>
    <h1>User home</h1>
    <strong>Token: </strong>
    <span>{{ token }}</span>
    <br />
    <button @click="logUserOut">Logout</button>
  </div>
</template>

<script>
export default {
  name: "UserHome",

  computed: {
    token() {
      return this.$store.state.userToken;
    }
  },

  methods: {
    logUserOut() {
      this.$store.dispatch("logUserOut");
      this.$router.push("/");
    }
  }
};
</script>
