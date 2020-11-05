<template>
  <div class="container">
    <a class="button is-light" @click="makeNewDemand">
      Fazer novo pedido
    </a>
    <a class="button is-light" @click="getTotal">
      Fechar Conta
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
  name: "TempTableDemands",

  data() {
    return {
      keepUpdateLoop: true,
      demands: [],
    };
  },

  async mounted() {
    await this.fetchDemands();
    this.updateTableDemands();
  },

  destroyed() {
    this.keepUpdateLoop = false;
  },

  methods: {
    demandDisplayStatus(demandStatus) {
      let status = "";

      switch(demandStatus) {
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

    makeNewDemand() {
      this.$router.push("/make-new-demand");
    },

    updateTableDemands() {
      if(this.keepUpdateLoop == false) return;

      window.setTimeout(async () => {
        await this.fetchDemands();

        this.updateTableDemands();
      }, 1000);
    },

    async fetchDemands() {
      let request = await axios.get("http://127.0.0.1:5000/demands/");

      if (request.status === 200) {
        this.demands = request.data.demands;
      }
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
