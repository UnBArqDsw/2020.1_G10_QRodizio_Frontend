<template>
  <div class="columns is-flex is-vcentered is-centered">
    <div class="column is-half">
      <div class="field">
        <h2 class="description">Menu do dia ?</h2>
        <div class="control">
          <div class="select">
            <select v-model="is_daily">
              <option :value="false">Não</option>
              <option :value="true">Sim</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="description">Nome</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Nome" v-model="name" />
        </div>
      </div>

      <div class="field">
        <label class="description">Descrição</label>
        <p class="control has-icons-left has-icons-right">
          <textarea
            v-model="description"
            class="textarea"
            placeholder="Descrição"
          ></textarea>
        </p>
      </div>

      <div class="field">
        <label class="description">Items</label>

        <MenuItemsForm
          :items="items"
          v-on:update:itemsUpdated="itemsUpdatedByForm($event)"
        />
      </div>

      <br />
      <hr />

      <b-button @click="createMenu" class="button is-success">Criar</b-button>
      &nbsp;
      <b-button @click="goBack" class="button is-danger">Cancelar</b-button>
      <hr />

      <div>
        {{ message }}

        <span v-if="message == 'Menu criado!'">
          <br />
          <a @click="goBack">Voltar para menus</a>
        </span>
      </div>

      <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true" />
    </div>
  </div>
</template>

<script>
import axios from "@/axios-config";
import { mapState } from "vuex";

import MenuItemsForm from "../../components/MenuItemsForm";

export default {
  name: "CreateMenu",

  components: { MenuItemsForm },

  data() {
    return {
      is_daily: false,
      name: "",
      description: "",
      items: [],
      message: "",
      isLoading: false,
    };
  },

  computed: {
    ...mapState(["userToken"]),
  },

  methods: {
    itemsUpdatedByForm(newItems) {
      this.items = newItems;
    },

    goBack() {
      this.$router.push("/list-menus");
    },

    clearForm() {
      this.is_daily = false;
      this.name = "";
      this.description = "";
      this.items = [];
    },

    async createMenu() {
      let data = {
        is_daily: this.is_daily,
        name: this.name,
        description: this.description,
        items: this.items,
      };

      this.isLoading = true;

      let response = await axios.post(
        "/menus/",
        { ...data },
        {
          headers: { Authorization: `Bearer ${this.userToken}` },
        }
      );

      this.isLoading = false;

      if (response.status == 201) {
        this.message = "Menu criado!";
        this.clearForm();
      }
    },
  },
};
</script>

<style>
@import "/assets/styles/styles.css"
</style>
