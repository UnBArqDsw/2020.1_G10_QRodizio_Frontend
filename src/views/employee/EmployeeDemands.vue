<template>
  <div>
    <div class="field">
      <h2 class="name-status">Status:</h2>
      <div class="control">
        <div class="select">
          <select @change="handler($event)" v-model="demandStatus">
            <option v-for="s in status" :key="s.status" :value="s.status">{{
              s.statusPt
            }}</option>
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
    <div style="overflow-x:auto;>">
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Mesa</th>
            <th>Pedido</th>
            <th>Quantidade</th>
            <th>Cliente</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="demand in demands" :key="demand.id">
            <td>Mesa X</td>
            <td>{{ demand.item ? demand.item.name : "" }}</td>
            <td>{{ demand.quantity }}</td>
            <td>{{ demand.customer }}</td>
            <td>
              <div class="control">
                <div class="select">
                  <select
                    @change="someHandler($event, demand)"
                  >
                    <option
                      v-for="s in status"
                      :key="s.status"
                      :value="s.status"
                      :selected="demandStatus == s.status"
                      >{{ s.statusPt }}</option
                    >
                  </select>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "@/axios-config";

export default {
  name: "EmployeeDemands",

  data() {
    return {
      keepUpdated: true,
      isLoading: false,
      status: [],
      demands: [],
      demandStatus: "waiting",
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
    this.demands = this.status[0].status;
    await this.fetchDemands(this.demandStatus);
    this.autoUpdate();
  },

  destroyed() {
    this.keepUpdated = false;
  },

  methods: {
    autoUpdate() {
      console.log("OI");
      if(this.keepUpdated == false) return;

      window.setTimeout(async () => {
        await this.fetchDemands(this.demandStatus);
        this.autoUpdate();
      }, 2000);
    },

    handler(event) {
      this.demandStatus = event.target.value;
    },

    async someHandler(event, demand) {
      let demandId = demand.id;
      console.log("Status to change ", event.target.value);

      console.log("UPDATE DEMAND");
      let sessionUrl = demand.table_session.url;
      console.log(sessionUrl);

      try {
        let data = { status: event.target.value };

        let request = await axios.put(
          `/demands/${demandId}/status`,
          { ...data },
          {
            headers: { Authorization: `Bearer ${this.userToken}` },
          }
        );

        await this.$socket.emit("customer_new_demand_sent", sessionUrl);
        await this.fetchDemands(this.demandStatus);
        // console.log(this.demands);

        // this.$router.go(this.$router.currentRoute);
      } catch (err) {
        console.log(err);
      }
      console.log(event.target.value);
    },

    async getDemandStatus() {
      let request = await axios.get("/demands/status");

      if (request.status === 200) {
        if (request.data.status) {
          request.data.status.forEach((element) => {
            if (element === "waiting") {
              this.status.push({ status: element, statusPt: "Aguardando" });
            }
            if (element === "processing") {
              this.status.push({ status: element, statusPt: "Processando" });
            }
            if (element === "done") {
              this.status.push({ status: element, statusPt: "Pronto" });
            }
            if (element === "canceled") {
              this.status.push({ status: element, statusPt: "Cancelado" });
            }
          });
        }
        // this.status = request.data.status;
        console.log(this.status);
      }
    },

    async fetchDemands(status) {
      // this.isLoading = true;

      let request = await axios.get(`/demands/${status}`, {
        headers: { Authorization: `Bearer ${this.loggedUserToken}` },
      });

      // this.isLoading = false;

      if (request.status === 200) {
        this.demands = request.data.demands;
      }
    },
  },
};
</script>

<style></style>
