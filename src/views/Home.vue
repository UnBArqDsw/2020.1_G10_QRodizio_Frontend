<template>
  <body>
    <div class="wrapper">    
  <div class="bg">
      <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
        <!-- <b-button @click="clickMe">Click Me</b-button> -->
        <h1 style="text-align:center" class="title is-1">Qrodizio</h1>
        <h1 style="text-align:center" class="title is-2">Rodizio direto e simples</h1>
        <img class="center" src="@/assets/Logov.png" alt="QRodizio logo" />
        </article>
      </div>
    
      <div class="tile is-parent">
       <article class="tile is-child box">
       <p class="title">Leitura de QRCode</p>
        <div class="content">
          <p>Basta ler um QRCode e você já está em uma mesa, pronto para fazer pedidos.</p>
        </div>      
        </article>
      </div>

    <div class="tile is-parent">
      <article class="tile is-child box">
      <p class="title">Gerenciamento de mesas</p>
      <div class="content">
        <p>Gerencie facilmente os pedidos sendo realizados por diversas mesas.</p>
      </div>
      </article>
    </div>
  </div>
</div>
</div>
</body>
    
  
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
<style>
  html, body{
  height: 100%;
}
body { 
			background-image: url(https://images.unsplash.com/photo-1571939634097-f1829662cdfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80) ;
			background-position: center center;
			background-repeat:  no-repeat;
			background-attachment: fixed;
			background-size:  cover;
   
      
  
}

div, body{
  margin: 0;
  padding: 0;
  font-family: exo, sans-serif;
  
}


.wrapper {
  height: 100%; 
  width: 100%; 
}



</style>