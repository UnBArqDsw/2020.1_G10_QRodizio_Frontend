<template>
  <div class="container">
    <a class="button is-light" @click="makeNewDemand">
      Fazer novo peido
    </a>

    <hr />

    <ul>
      <li v-for="demand in demands" :key="demand.id">
        {{ demand.customer }} --> {{ demand.item.name }} -- {{demand.quantity}}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TempTableDemands",

  data() {
    return {
      demands: [],
    };
  },

  async mounted() {
    await this.fetchDemands();
  },

  methods: {
    makeNewDemand() {
      this.$router.push("/make-new-demand");
    },

    async fetchDemands() {
      let request = await axios.get("http://127.0.0.1:5000/demands/");

      if (request.status === 200) {
        this.demands = request.data.demands;
      }
    },
  },
};
</script>

<style></style>
