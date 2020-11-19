<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ name }} R$ {{ value }}</p>
      <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
    </header>

    <div class="card-content">
      <div class="content-card">
        <div class="column">
          <label id="descritionDemand">{{ description }}</label>
          <b-button
            style="margin-left: 60px "
            rounded
            type="is-light"
            icon-left="minus"
            @click="decQuantity"
          />
          {{ quantity }}
          <b-button
            rounded
            type="is-light"
            icon-left="plus"
            @click="incQuantity"
          />
        </div>
      </div>
    </div>

    <!--
    <footer class="card-footer">
      <a @click="makeDemand" class="card-footer-item">Pedir</a>
    </footer>
    -->

    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "MenuItemForDemand",

  props: ["name", "description", "id", "value", "sessionUrl"],

  data() {
    return {
      isLoading: false,
      quantity: 0,
    };
  },

  watch: {
    quantity(newQuantity) {
      if (newQuantity < 0) {
        this.quantity = 0;
      }
    },
  },

  computed: {
    sessionId() {
      return this.$store.state.tableSession.id;
    },

    ...mapState(["customerName"]),
  },

  methods: {
    decQuantity() {
      if (this.quantity == 0) return;
      this.quantity -= 1;
    },

    incQuantity() {
      this.quantity += 1;
    },

    async sendDemand() {
      let postData = {
        quantity: this.quantity,
        item_id: this.id,
        session_id: this.sessionId,
        customer: localStorage.getItem("name"),
      };

      this.isLoading = true;
      let response = await axios.post(
        "http://127.0.0.1:5000/demands/",
        postData
      );
      this.isLoading = false;

      if (response.status == 201) {
        await this.emitNewDemand();
        this.$router.push(`/table/${this.sessionUrl}`);
      } else {
        console.log(request);
      }
    },

    async makeDemand() {
      this.$buefy.dialog.confirm({
        message: "Deseja realizar esse pedido ?",
        onConfirm: async () => await this.sendDemand(),
      });
    },

    async emitNewDemand() {
      await this.$socket.emit("customer_new_demand_sent", this.sessionUrl);
    },
  },
};
</script>

<style>
@import "/../assets/styles/styles.css";
</style>
