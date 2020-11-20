<template>
  <div>
    <h1 class="description">Página inicial do usuário</h1>
    <strong class="description">Token: </strong>
    <span class="description">{{ token }}</span>
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
