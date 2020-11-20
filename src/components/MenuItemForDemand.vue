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
import axios from "@/axios-config";
import { mapState, mapGetters } from "vuex";

export default {
  name: "MenuItemForDemand",

  props: ["name", "description", "id", "value", "sessionUrl", "demands"],

  data() {
    return {
      isLoading: false,
      quantity: 0,
      demandsArrays: [],
      currentDemandId: 0,
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
    ...mapState(["customerName"]),
    ...mapGetters(["sessionId"])
  },

  methods: {
    async decQuantity() {
      if (this.quantity == 0) return;
      this.quantity -= 1;
<<<<<<< HEAD
      console.log(this.id)

      let respose = await axios.delete(`/demands/${this.currentDemandId}`);
=======
       let postData = {
        quantity: this.quantity,
        item_id: this.id,
        session_id: this.sessionId,
        customer: localStorage.getItem("name"),
      }
      console.log(this.sessionId);
      this.$emit("update:demandsUpdated", postData);
>>>>>>> fix error to decremet item
      
    },

    incQuantity() {
      this.quantity += 1;
      let postData = {
        quantity: this.quantity,
        item_id: this.id,
        session_id: this.sessionId,
        customer: localStorage.getItem("name"),
      }
      console.log(this.sessionId);
      this.$emit("update:demandsUpdated", postData);
      //this.sendDemand(postData);
      
    },

    async sendDemand(postData) {
      
      this.isLoading = true;
      let response = await axios.post(
        "/demands/",
        postData
      );
      if (response.status == 201) {
        this.currentDemandId = response.data.demand.id;
      }
      this.isLoading = false;

      /*if (response.status == 201) {
        await this.emitNewDemand();
        this.$router.push(`/table/${this.sessionUrl}`);
      } else {
        console.log(request);
      }*/
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
