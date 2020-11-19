<template>
  <div class="container">
    <div>
      <a class="button-normal" @click="makeNewDemand">
        Novo pedido
      </a>
      <a class="button-normal" @click="callForAssistance">
        Chamar funcionário
      </a>
    </div>
      &nbsp;
    <a class="button-cancel" @click="endAccount">
        Fechar conta
      </a>
    <b-modal :active.sync="selectPayment" has-modal-card>
      <form action="">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Fechar conta</p>
          </header>
          <div class = "total-value-to-payment" style="overflow-x:auto;>">
            <table class="table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Pedido</th>
                  <th>Quantidade</th>
                  <th>Valor</th>
                  <th>Valor total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="demand in demands" :key="demand.id">
                  <td>{{ demand.customer }}</td>
                  <td>{{ demand.item.name }}</td>
                  <td>{{ demand.quantity }}</td>
                  <td>{{ demand.item.value }}R$</td>
                  <td>{{demand.quantity * demand.item.value}}R$</td>
                </tr>
               
              </tbody>
            </table>
            <div class="content-color">
              <h3 style="margin-left: 15px">
                Valor total por cliente: {{priceClient}}R$
              </h3>
              <h3 style="margin-left: 15px">
                Valor total da mesa : {{tabletotal}} R$
              </h3>   
            </div>
          </div>
          <section class="modal-card-body">
            <div class="field">
          <b-checkbox v-model="method" native-value="money">Dinheiro</b-checkbox>
      </div>
      <div class="field">
          <b-checkbox v-model="method" native-value="card">
              Cartão
          </b-checkbox>
      </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button" @click="selectPayment = false" >Cancelar</button>
            <button class="button is-primary" @click="callForAssistance" >Confirmar</button>
          </footer>
        </div>
      </form>
    </b-modal>
    <br>
    <div class="content-color">
      <h3 style="margin-left: 15px">Nome:  
      <i><b>{{clientName}}</b></i>
        <a class="button-change" @click="changeClientName">
        alterar
        </a>          
            
      </h3> 
    </div>
    <div style="overflow-x:auto;>">
      <table class="table is-striped is-fullwidth">
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
                v-bind:class="{'button-cancel-demand': isCustomerTheDemandOwner(demand)}"
                @click="confirmCancelDemand(demand.id)"
                :disabled="!isCustomerTheDemandOwner(demand)"
              >
                Cancelar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      sessionUrl: "",
      demands: [],
      sessionId: 0,
      paymentSelect: false,
      method: [],
      session: {},
      selectPayment: false,
      tabletotal: 0,
      priceClient: 0,
      
    };
  },

  computed: {
    clientName() {
      let name = "Cliente";

      if(localStorage.getItem("name") != null) {
        name = localStorage.getItem("name");
      }

      return name;
    },

    ...mapState(["customerName"]),
  },

  async mounted() {
    this.sessionUrl = this.$route.params.url;
    localStorage.setItem('urlParam', this.sessionUrl);

    await this.fetchSession();

    this.checkUserName();
  },

  sockets: {
    frontend_employee_called(message) {
      alert(message);
    },

    frontend_table_demands_updated(data) {
      if (data.session_url == this.sessionUrl) {
        console.log("Updating my table demands");
        this.demands = [...data.demands];
        
      }
      
    },
  },

  methods: {
    isCustomerTheDemandOwner(demand) {
      return demand.customer == this.clientName;
    },


    async endAccount() {
      // this.paymentSelect=!this.paymentSelect;
      localStorage.setItem('payment', this.method);
      let url = `http://127.0.0.1:5000/sessions/${this.session.id}/close`;
      let response = await axios.get(url);

      if (response.status == 200) {
        let price = response.data.table;
        this.priceClient = price;
        this.selectPayment = true;
        console.log(price);
      }   
        
      
    },
    async checkUserName() {

      if(localStorage.getItem('name')===null) {
        this.$buefy.dialog.prompt({
        message: 'Qual seu nome ?',
        inputAttrs: {
          placeholder: 'Nome',
          maxlength: 30,
        },
        trapFocus: true,
        onConfirm: async (name) => await this.joinRoom(name),
        });
      } 
    },
    async joinRoom(name) {
      if (name.length > 0) {
        this.$store.dispatch("setCustomerName", name);

        await this.$socket.emit("customer_join_room", {
          session_url: this.sessionUrl,
          name,
        });
        localStorage.setItem('name', name);
        this.$router.go(this.$router.currentRoute);
      } else {
        alert("No name was given");
      }
    },
    async getTotal() {
      this.paymentSelect=true;
      console.log("teste");
    },


    async callForAssistance() {
      let { url } = this.$route.params;
      console.log(url)
      await this.$socket.emit("call_for_assistance", url);
    },
    priceTotal(){

    },
    changeClientName() {
      localStorage.removeItem("name");
      this.checkUserName();
    },
    closeTable(){
      this.paymentSelect();
    },
    demandDisplayStatus(demandStatus) {
      let status = "";

      switch (demandStatus) {
        case 0:
          status = "Aguardando";
          break;
        case 1:
          status = "Processando";
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
      let url = `http://127.0.0.1:5000/sessions/url/${this.sessionUrl}`;
      let response = await axios.get(url);

      if (response.status == 200) {
        let { id, url } = response.data.session;
        this.session=response.data.session;

        this.$store.dispatch("setTableSesssion", { id, url });
        this.demands = response.data.session.demands;
        let total = 0;
        this.demands.forEach(demand => {
          total += demand.quantity * demand.item.value;
        });
        this.tabletotal = total;
        this.sessionId = id;
      }
    },

    makeNewDemand() {
      console.log(this.session)
      if(this.session.closed==false){
        this.$router.push(`/make-new-demand/${this.sessionUrl}`);
      } else {
        alert("A mesa precisa estar aberta para realizar uma demanda");
      }
    },

    async confirmCancelDemand(demandId) {
      this.$buefy.dialog.confirm({
        message: "Deseja realmente cancelar o pedido ?",
        onConfirm: async () => await this.cancelDemand(demandId),
      });
    },

    async cancelDemand(demandId) {
      try {
        let request = await axios.put(
          `http://127.0.0.1:5000/demands/${demandId}/cancel`
        );

        if(request.status===406){
          alert("Demanda ja cancelada");
        }

        if(request.status === 202){
          alert("Demanda cancelada");
          this.$router.go(this.$router.currentRoute);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style >
  @import '../../assets/styles/styles.css';

</style>
