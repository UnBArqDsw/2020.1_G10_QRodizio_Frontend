<template>
  <div class="ListTables">
    <table class="table">
      <thead>
        <tr>
          <th>id</th>
          <th>Status</th>
          <th>Data</th>
          <th>Quantidade de pedidos</th>
          <th>Ver QRCode</th>
          <th>Ver Sessão</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="table in tables" :key="table.id">
          <td>{{ table.id }}</td>
          <td>
            <span v-if="table.last_session.closed" class="button is-danger is-light">
              Fechada
            </span>
            <span v-else class="button is-success is-light">Aberta</span>
          </td>
          <td>{{ table.last_session.created_on }}</td>
          <td>{{ table.total_demands }}</td>
          <td>
            <button class="button is-light">Ver QRCode</button>
          </td>
          <td>
            <b-navbar-item
              class="button is-light"
              tag="router-link"
              :to="`/view-session/${table.last_session.id}`"
            >
              Ver Sessão
            </b-navbar-item>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ListTables",

  data() {
    return {
      tables: [],
    };
  },

  async mounted() {
    await this.fetchTables();
  },

  methods: {
    async fetchTables() {
      let response = await axios.get("http://127.0.0.1:5000/tables/");

      if (response.status == 200) {
        this.tables = response.data.tables;
      }
    },
  },
};
</script>
