<template>
  <div class="home">
    <b-button @click="clickMe">Click Me</b-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',

  methods: {
    clickMe() {
      this.$buefy.notification.open('Clicked!!');
    }
  }
}
</script>
