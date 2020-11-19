<template>
  <div class="ViewSession">
    <b-navbar-item
      class="button-normal"
      tag="router-link"
      to="/list-tables"
    >
      Voltar
    </b-navbar-item>
    <div style="overflow-x:auto;>">
      <table class="table">
        <thead>
          <tr>
            <th>id</th>
            <th>Status</th>
            <th>Mesa</th>
            <th>Cliente</th>
            <th>Pedido</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="demand in demands" :key="demand.id">
            <td>{{ demand.id }}</td>
            <td>{{ status[demand.status] }}</td>
            <td>Identificador da mesa</td>
            <td>{{ demand.customer }}</td>
            <td>{{ demand.item.name }}</td>
            <td>{{ demand.quantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ViewSession",

  data() {
    return {
      closed: false,
      created_on: null,
      status: [],
      demands: [],
    };
  },

  async mounted() {
    await this.getDemandStatus();
    await this.fetchDemands();
  },

  methods: {
    async getDemandStatus() {
      let request = await axios.get("http://127.0.0.1:5000/demands/status");

      if (request.status === 200) {
        this.status = request.data.status;
        console.log(request.data.status);
      }
    },

    async fetchDemands() {
      let session_id = this.$route.params.id;
      let response = await axios.get(
        `http://localhost:5000/sessions/${session_id}`
      );

      console.log(response);

      if (response.status == 200) {
        this.closed = response.data.session.closed;
        this.created_on = response.data.session.created_on;
        this.demands = response.data.session.demands;
      }
    },
  },
};
</script>

<style>
  @import '../../assets/styles/styles.css';
</style>
