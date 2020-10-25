<template>
  <div>
    <h1>Página inicial do usuário</h1>
    <strong>Token: </strong>
    <span>{{ token }}</span>
  </div>
</template>

<script>
export default {
  name: "UserHome",

  computed: {
    token() {
      return this.$store.state.userToken;
    }
  }
};
</script>
