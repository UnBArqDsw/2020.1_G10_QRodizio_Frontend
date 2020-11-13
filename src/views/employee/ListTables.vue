<template>
  <div class="ListTables">
    <a class="button is-light" @click="makeNewTable">
      Criar nova mesa
    </a>

    <br />

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
            <span v-if="table.last_session == undefined">Nenhuma sessão</span>
            <span v-else>
              <span
                v-if="table.last_session.closed"
                class="button is-danger is-light"
              >
                Fechada
              </span>
              <span v-else class="button is-success is-light">Aberta</span>
            </span>
          </td>
          <td>
            <span v-if="table.last_session != undefined">
              {{ table.last_session.created_on }}
            </span>
            <span v-else>
              Nenhuma sessão
            </span>
          </td>
          <td>{{ table.total_demands }}</td>
          <td>
            <span v-if="table.last_session == undefined">Nenhuma sessão</span>
            <span v-else>
              <span
                v-bind:class="[
                  isCalling(table.last_session.id)
                    ? 'is-calling'
                    : 'not-calling',
                ]"
              >
                {{ isCalling(table.last_session.id) ? "sim" : "não" }}
              </span>
            </span>
          </td>
          <td>
            <button class="button is-light" @click="displayTableQRCode(table.id)">Ver QRCode</button>
          </td>
          <td>
            <span v-if="table.last_session == undefined">Nenhuma sessão</span>
            <b-navbar-item
              v-else
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
    ...mapState(["tablesCalling"]),
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

    makeNewTable() {
      this.$router.push("/create-table");
    },

    displayTableQRCode(tableId) {
      this.$router.push(`/display-table-qrcode/${tableId}`);
    }
  },
};
</script>

<style scoped>
.not-calling {
  color: #ccc;
}

.is-calling {
  color: #f14668;
}
</style>
