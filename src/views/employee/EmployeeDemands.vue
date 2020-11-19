<template>
  <div>
    <div class="field">
      <h2 class="name-status">Status:</h2>
      <div class="control">
        <div class="select">
          <select @change="handler($event)" v-model="demandStatus">
            <option v-for="s in status" :key="s.status" :value="s.status">{{ s.statusPt }}</option>
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
            <select @change="someHandler($event, demand.id)" v-model="demandStatus" >
            <option v-for="s in status" :key="s.status" :value="s.status">{{ s.statusPt }}</option>
          </select>
        </div>
      </div>
          </td>
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
      status: [],
      demands: [],
      demandStatus: 'waiting'
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
    handler(event) {
      this.demandStatus=event.target.value;
    },
    async someHandler(event, demandId){
      
      console.log("Status to change ", event.target.value);      
      try {
        let data = {"status": event.target.value};
        let request = await axios.put(
          `http://127.0.0.1:5000/demands/${demandId}/status`, 
        { ...data },
        {
          headers: { Authorization: `Bearer ${this.userToken}` },
        });
          this.fetchDemands(event.target.value);
          // console.log(this.demands);
          
         this.$router.go(this.$router.currentRoute);
      }catch (err) {
          console.log(err);
      }   
      console.log(event.target.value);
    }, 

    async getDemandStatus() {
      let request = await axios.get("http://127.0.0.1:5000/demands/status");

      if (request.status === 200) {
        if(request.data.status) {
          request.data.status.forEach(element => {
            if(element==='waiting'){
              this.status.push({'status': element, 'statusPt': 'Aguardando'});
            }
            if(element==='processing'){
              this.status.push({'status': element, 'statusPt': 'Processando'});
            }
            if(element==='done'){
              this.status.push({'status': element, 'statusPt': 'Pronto'});
            }
            if(element==='canceled'){
              this.status.push({'status': element, 'statusPt': 'Cancelado'});
            }

          });
        }
        // this.status = request.data.status;
        console.log(this.status)
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
