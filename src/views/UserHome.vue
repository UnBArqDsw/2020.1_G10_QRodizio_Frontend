<template>
  <div>
    <h1>Página inicial do usuário</h1>
    <strong>Token: </strong>
    <spam>{{ token }}</spam>
    <br />
    <button @click="logUserOut">Encerrar sessão</button>
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
