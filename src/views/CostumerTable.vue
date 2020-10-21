<template>
  <div>
      AQUI SERÂO MOSTRADAS AS MESAS!!!!    
  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
      return{
          costumer_tables: []
      };
  },
  methods: {
    getTables() {
        const path = 'http://127.0.0.1:5000/costumer_tables';
        axios.get(path)
        .then((res) => {
            this.costumer_tables = res.data.costumer_tables;
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

<!-- async get_costumer_tables() {
      let response = await axios.post("http://127.0.0.1:5000/costumer_tables", {
      });
      if (response.status === 200) {
        this.get_costumer_tables();
      } else {
        alert("Deu ruim");
      }
    } -->