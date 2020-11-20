<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <button class="go-back-button button is-danger" @click="goBack">
          Voltar
        </button>
      </div>

      <div class="column is-full">
        <div class="field">
          <label class="label">Menu:</label>
          <div class="control">
            <div class="select">
              <select v-model="menu">
                <option v-for="m in menus" :key="m.id" :value="m.id">
                  {{ m.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <b-loading
          :is-full-page="true"
          v-model="isLoading"
          :can-cancel="true"
        />
      </div>
    </div>

    <hr />

    <div class="columns">
      <div class="column" v-for="item in items" :key="item.id">
        <MenuItemForDemand
          :name="item.name"
          :description="item.description"
          :id="item.id"
          :value="item.value"
          :sessionUrl="sessionUrl"
          v-on:update:demandsUpdated="demandsUpdatedByForm($event)"
          :demands="demands"
        />
      </div>
    </div>
    <button class="button-demand" @click="awaysendButton">
      Fazer pedido
    </button>
  </div>
</template>

<script>
import axios from "@/axios-config";
import MenuItemForDemand from "../../components/MenuItemForDemand";
import { mapGetters } from "vuex";

export default {
  name: "MakeNewDemand",

  components: { MenuItemForDemand },

  data() {
    return {
      isLoading: false,
      menu: 1,
      menus: [],
      items: [],
      demands: {},
    };
  },

  computed: {
    sessionUrl() {
      return this.$route.params.sessionUrl;
    },
  },

  watch: {
    menu(newMenu) {
      this.items = this.menus[this.menu - 1].items;
    },
  },

  async mounted() {
    await this.fetchMenus();
  },

  methods: {
    demandsUpdatedByForm(demand) {
      this.demands[demand.item_id] = demand;
    },
    async awaysendButton() {
      let requests = [];

      for (let key of Object.keys(this.demands)) {
        let demand = this.demands[key];

        if (!demand) {
          console.log("item nao encontrado: ");
          console.log(key);
          continue;
        }
        if (demand.quantity == 0) {
          continue;
        }
        
        requests.push(axios.post("/demands/", demand));
      }
      try {
        await Promise.all(requests);
        await this.emitNewDemand();

        this.$router.push(`/table/${this.sessionUrl}`);
      } catch (err) {
        console.log(err);
      }
    },

    async emitNewDemand() {
      await this.$socket.emit("customer_new_demand_sent", this.sessionUrl);
    },

    goBack() {
      this.$router.push("/table/" + this.sessionUrl);
    },

    async fetchMenus() {
      this.isLoading = true;
      let request = await axios.get("/menus/");
      this.isLoading = false;

      if (request.status === 200) {
        this.menus = request.data.menus;
        this.items = this.menus[this.menu - 1].items;
      }
    },
  },
};
</script>

<style>
.go-back-button {
  margin-top: 32px;
}

@media screen and (max-width: 760px) {
  .go-back-button {
    margin-top: 5px;
  }
}
</style>
