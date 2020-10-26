<template>
  <div>
    <div class="field">
      <label class="label">Tipo de status:</label>
      <div class="control">
        <div class="select">
          <select v-model="demandStatus">
            <option v-for="s in status" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
      </div>
    </div>
    <hr />
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
    <table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>Mesa</th>
          <th>Pedido</th>
          <th>Quantidade</th>
          <th>Cliente</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="demand in demands" :key="demand.id">
          <td>Mesa X</td>
          <td>{{ demand.item ? demand.item.name : "" }}</td>
          <td>{{ demand.quantity }}</td>
          <td>{{ demand.customer }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EmployeeDemands",

  data() {
    return {
      keepUpdating: false,
      isLoading: false,
      demandStatus: "waiting",
      status: [],
      demands: [],
    };
  },

  watch: {
    async demandStatus(newdemandStatus) {
      await this.fetchDemands(newdemandStatus);
    },
  },

  computed: {
    loggedUserToken() {
      return this.$store.state.userToken;
    },
  },

  async mounted() {
    await this.getDemandStatus();
    this.demands = this.status[0];
    await this.fetchDemands(this.demandStatus);
    this.updateDemandsTable();
  },

  destroyed() {
    this.keepUpdating = false;
  },

  methods: {
    updateDemandsTable() {
      if(this.keepUpdating == false) return;

      window.setTimeout(async () => {
        await this.fetchDemands(this.demandStatus);

        this.updateDemandsTable();
      }, 1000);
    },

    async getDemandStatus() {
      let request = await axios.get("http://127.0.0.1:5000/demands/status");

      if (request.status === 200) {
        this.status = request.data.status;
      }
    },

    async fetchDemands(status) {
      // this.isLoading = true;

      let request = await axios.get(`http://127.0.0.1:5000/demands/${status}`, {
        headers: { Authorization: `Bearer ${this.loggedUserToken}` },
      });

      // this.isLoading = false;

      if (request.status === 200) {
        this.demands = request.data.demands;
      }
    }
  },
};
</script>

<style></style>
