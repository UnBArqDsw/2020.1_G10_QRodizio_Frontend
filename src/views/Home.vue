<template>
  <div class="home">
    <!-- <b-button @click="clickMe">Click Me</b-button> -->

    <img src="@/assets/index.png" alt="QRodizio logo" />
    <footer class="footer">
     <div class="content has-text-centered">
        <p>
        <strong>Qrcode</strong> by <a href="https://jgthms.com">Universidade de Brasilia</a>. The source code is licensed
        </p>
      </div>
    </footer>
  </div>
  
</template>

<script>

export default {
  name: 'Home',

  methods: {
    clickMe() {
      this.$buefy.notification.open('Clicked!!');
    }
  }
}
</script>
