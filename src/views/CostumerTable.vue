<template>
  <div>
      <h1>Mesas Disponiveis</h1>
      <!-- {{available_tables}}     -->
  </div>

<div v-for="table in available_tables" :key="table.id" class="card">
  <div class="card-content">
    <p class="title">
     Mesa {{table}}
    </p>
    <p class="subtitle">
      Disponivel
    </p>
  </div>
  <footer class="card-footer">
    <p class="card-footer-item">
      <span>
        Abrir
      </span>
    </p>
    
  </footer>
</div>


    <div>
      <h2>Mesas aguardando pedido</h2>
      <!-- {{costumer_tables}}     -->
  </div>
    <div>
      <h2>Mesas aguardando pagamento</h2>
      <!-- {{costumer_tables}}     -->
  </div>


</template>

<script>
import axios from "axios";
export default {
  data(){
      return{
          costumer_tables: [],
          available_tables: []

      };
  },
  methods: {
    getTables() {
        const path = 'http://127.0.0.1:5000/costumer_tables/';
        axios.get(path)
        .then((res) => {
            console.log('succes', res);
            res.data.costumer_table.forEach(element => {
              //mesas disponiveis.
              if(element.status==false){
                this.available_tables.push(element.id);
              }
            });
        })
        .catch((error) => {
            console.error(error);
        });
    },
  },
  created(){
      this.getTables();
  },
};
</script>
