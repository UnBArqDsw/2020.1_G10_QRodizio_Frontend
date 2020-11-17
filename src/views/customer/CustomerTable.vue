<template>
  <div class="container">
    <a class="button is-light" @click="makeNewDemand">
      Fazer novo pedido
    </a>
    &nbsp;
    <a class="button is-light is-info" @click="callForAssistance">
      Chamar funcionário
    </a>
    &nbsp;
    Nome do cliente: {{clientName}}
    &nbsp;
    &nbsp;
    &nbsp;
    <a class="button is-light" @click="changeClientName">
     Alterar
    </a>
 
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      sessionUrl: "",
      demands: [],
      clientName: localStorage.getItem("name") != null ? localStorage.getItem("name") : 'Cliente',
      sessionId: 0,
    };
  },

  computed: {
    ...mapState(["customerName"]),
  },

  async mounted() {
    this.sessionUrl = this.$route.params.url;
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

    async callForAssistance() {
      let { url } = this.$route.params;

      await this.$socket.emit("call_for_assistance", url);
    },

     changeClientName() {
      localStorage.removeItem("name");
      this.checkUserName();
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

        this.$store.dispatch("setTableSesssion", { id, url });
        this.demands = response.data.session.demands;
        this.sessionId = id;
      }
    },

    makeNewDemand() {
      this.$router.push(`/make-new-demand/${this.sessionUrl}`);
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
