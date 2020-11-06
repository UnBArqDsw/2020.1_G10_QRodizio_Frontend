<template>
  <div class="container">
    <a class="button is-light" @click="makeNewDemand">
      Fazer novo peido
    </a>

    &nbsp;

    <a class="button is-light is-info" @click="callForAssistance">
      Chamar funcionário
    </a>

    <hr />

    <table class="table">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Pedido</th>
          <th>Quantidade</th>
          <th>Status</th>
          <th>Cancelar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="demand in demands" :key="demand.id">
          <td>{{ demand.customer }}</td>
          <td>{{ demand.item.name }}</td>
          <td>{{ demand.quantity }}</td>
          <td>{{ demandDisplayStatus(demand.status) }}</td>
          <td>
            <button
              v-if="demand.status == 0"
              class="button is-light"
              @click="confirmCancelDemand(demand.id)"
            >
              Cancelar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      keepUpdateLoop: true,
      demands: [],
    };
  },

  async mounted() {
    await this.fetchSession();
    this.updateTableDemands();
  },

  destroyed() {
    this.keepUpdateLoop = false;
  },

  sockets: {
    frontend_employee_called(message) {
      alert(message);
    }
  },

  methods: {
    async callForAssistance() {
      let { url } = this.$route.params;

      await this.$socket.emit("call_for_assistance", url);
    },

    demandDisplayStatus(demandStatus) {
      let status = "";

      switch (demandStatus) {
        case 0:
          status = "Aguardando";
          break;
        case 1:
          status = "Procesando";
          break;
        case 2:
          status = "Concluído";
          break;
        case 3:
          status = "Cancelado";
          break;
        default:
          status = "Erro";
      }

      return status;
    },

    async fetchSession() {
      // TODO: use this.$route.params.url when table as qrcode in backend
      let url = "1-59a9639a-1778-11eb-aa36-7429afd877c3";
      let response = await axios.get(
        `http://127.0.0.1:5000/sessions/url/${url}`
      );

      if (response.status == 200) {
        let { id, url } = response.data.session;

        this.$store.dispatch("setTableSesssion", { id, url });
        this.demands = response.data.session.demands;
      }
    },

    makeNewDemand() {
      let sessionUrl = this.$route.params.url;
      this.$router.push(`/make-new-demand/${sessionUrl}`);
    },

    updateTableDemands() {
      if (this.keepUpdateLoop == false) return;

      window.setTimeout(async () => {
        await this.fetchSession();

        this.updateTableDemands();
      }, 1000);
    },

    async confirmCancelDemand(demandId) {
      this.$buefy.dialog.confirm({
        message: "Deseja realmente cancelar ?",
        onConfirm: async () => await this.cancelDemand(demandId),
      });
    },

    async cancelDemand(demandId) {
      try {
        let request = await axios.put(
          `http://127.0.0.1:5000/demands/${demandId}/cancel`
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
