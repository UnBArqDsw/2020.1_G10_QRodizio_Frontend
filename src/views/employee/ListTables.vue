<template>
  <div class="ListTables">
    <table class="table">
      <thead>
        <tr>
          <th>id</th>
          <th>Status</th>
          <th>Data</th>
          <th>Quantidade de pedidos</th>
          <th>Pedindo atendimento</th>
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
            <span v-bind:class="[isCalling(table.last_session.id) ? 'calling' : '', 'blinking']">
              {{ isCalling(table.last_session.id) ? "sim" : "não" }}
            </span>
          </td>
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
import { mapState } from "vuex";

export default {
  name: "ListTables",

  data() {
    return {
      tables: [],
    };
  },

  computed: {
    ...mapState(['tablesCalling'])
  },

  async mounted() {
    await this.fetchTables();
  },

  methods: {
    isCalling(id) {
      return id in this.tablesCalling;
    },

    async fetchTables() {
      let response = await axios.get("http://127.0.0.1:5000/tables/");

      if (response.status == 200) {
        this.tables = response.data.tables;
      }
    },
  },
};
</script>

<style scoped>
.calling {
  color: #f14668;
}

.blinking {
  animation:blinkingText 1.5s infinite;
}
@keyframes blinkingText {
  0% {     color:#f14668; }
  49% {    color:#f14668; }
  60% {    color: transparent; }
  99% {    color:transparent; }
  100% {   color:#f14668; }
}

</style>