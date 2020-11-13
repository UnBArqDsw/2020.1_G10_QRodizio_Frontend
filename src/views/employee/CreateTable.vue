<template>
  <div class="columns is-flex is-vcentered is-centered">
    <div class="column is-half">
      <div class="field">
        <label class="label">Identificador</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="text"
            placeholder="Identificador"
            v-model="identifier"
          />
        </div>
      </div>

      <div class="field">
        QRCODE
      </div>

      <b-button @click="createTable" class="button is-light">Criar</b-button>
      &nbsp;
      <b-button @click="goBack" class="button is-light">Cancelar</b-button>
      <hr />

      <div>
        {{ message }}

        <span v-if="message == 'Tabela criada!'">
          <br />
          <a @click="goBack">Voltar para mesas</a>
        </span>
      </div>

      <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "CreateTable",

  data() {
    return {
      identifier: "",
      message: "",
      isLoading: false
    };
  },

  computed: {
    ...mapState(["userToken"]),
  },

  methods: {
    clearForm() {
      this.identifier = "";
    },

    async createTable() {
      let data = {
        qrcode: "abc-" + String(Date.now()),
        identifier: this.identifier,
      };

      this.isLoading = true;

      let response = await axios.post("http://127.0.0.1:5000/tables/", data, {
        headers: { Authorization: `Bearer ${this.userToken}` },
      });

      this.isLoading = false;

      if(response.status == 201) {
        this.clearForm();
        this.message = "Tabela criada!";
      }
    },

    goBack() {
      this.$router.push("/list-tables");
    },
  },
};
</script>

<style></style>
