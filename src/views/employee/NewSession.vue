<template>
  <div class="NewSession">
    <h2>URL gerada: {{generateUrl}}</h2>
    <br>
    <br>
    <h1>Escolha a forma de pagamento</h1>
      <br>
      <br>
        <section>
        <div class="field">
            <b-checkbox v-model="method" native-value="Money">Dinheiro</b-checkbox>
        </div>
        <div class="field">
            <b-checkbox v-model="method" native-value="Card">
                Cartão
            </b-checkbox>
        </div>
        <div class="field">
            <b-checkbox v-model="method" native-value="Both">
                Indeterminado
            </b-checkbox>
        </div>
    </section>
    <p>{{method}}</p>
    <br>
    <button v-on:click="teste()" class="button is-light">Começar a pedir</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewSession",

  data() {
    return {
      tables: [],
      showQrcode:false,
      checkbox: false,
      method: [],
      generateUrl: Math.random().toString(20).substring(2,10),
    };
  },


  methods: {
    
    teste() {
      console.log(this.method.length);
      if(this.method.length===0){
        alert("Ops, selecione uma opção")
      } else {
        //faz o post.
        
      }
    },
  },
};
</script>
