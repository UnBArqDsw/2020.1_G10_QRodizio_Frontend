<template>
  <div class="ListTables">
    <a class="button is-success" @click="makeNewTable">
      Criar nova mesa
    </a>

    <br />
    <div style="overflow-x:auto;>">
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>id</th>
            <th>Status</th>
            <th>Data</th>
            <th>Quantidade de pedidos</th>
            <th>Pedindo atendimento</th>
            <th>Ver QRCode</th>
            <th>Ver Sessão</th>
            <th>Encerrar mesa</th>
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
                  <b-button @click="attendant(table.last_session.url)" v-if="isCalling(table.last_session.id) ? true : false" size="is-small">Atender</b-button>
                  <p v-if="isCalling(table.last_session.id) ? false : true" size="is-small">Em atendimento</p>
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

            <td>
              <span v-if="table.last_session == undefined || table.last_session.closed" >Sem sessões</span>
              <a v-else class="button is-danger" @click="confirmEndSession(table.last_session.id, table.last_session.closed)">Encerrar mesa</a>
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
  name: "ListTables",

  data() {
    return {
      tables: [],
      showQrcode:false,
    };
  },

  computed: {
    ...mapState(["tablesCalling"]),
  },

  async mounted() {
    await this.fetchTables();
  },

    sockets: {
    
    //so msg recebida pelo socket do servidor
    frontend_employee_called(message) {
      alert(message);
    },

  
    frontend_update_employee_called(data) {
      if (data.session_url == this.sessionUrl) {
        console.log("Updating my table demands");
        this.demands = [...data.demands];
      }
    },
  },

  methods: {
    isCalling(id) {
      return id in this.tablesCalling;
    },
   async confirmEndSession(sessionId, status) {
      this.$buefy.dialog.confirm({
        message: "Deseja realmente fechar a mesa ?",
        onConfirm: async () => await this.endSession(sessionId, status),
      });
    },
   async endSession(sessionId, status) {
            
      if(status===false) {
        try {
          let data = {"closed": true};
          let request = await axios.put(
            `http://127.0.0.1:5000/sessions/${sessionId}`, 
          { ...data },
          {
            headers: { Authorization: `Bearer ${this.userToken}` },
          });

          this.$router.go(this.$router.currentRoute);
        }catch (err) {
            console.log(err);
        }   
      } else {        
        alert('Mesa ja fechada')
      }

    },

    async fetchTables() {
      let response = await axios.get("http://127.0.0.1:5000/tables/");

      if (response.status == 200) {
        this.tables = response.data.tables;
      }
    },

   async attendant(urlTable){
      await this.$socket.emit("response_for_assistence", urlTable);     
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
