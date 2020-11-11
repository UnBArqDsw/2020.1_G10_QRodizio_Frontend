<template>
  <div class="columns is-flex is-vcentered is-centered">
    <div class="column is-half">
      <div class="field">
        <label class="label">Menu do dia ?</label>
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
        <label class="label">Nome</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Nome" v-model="name" />
        </div>
      </div>

      <div class="field">
        <label class="label">Descrição</label>
        <p class="control has-icons-left has-icons-right">
          <textarea
            v-model="description"
            class="textarea"
            placeholder="Descrição"
          ></textarea>
        </p>
      </div>

      <div class="field">
        <label class="label">Items</label>

        <MenuItemsForm
          :items="items"
          v-on:update:itemsUpdated="itemsUpdatedByForm($event)"
        />
      </div>

      <br />
      <hr />

      <b-button @click="updateMenu" class="button is-light">Atualizar</b-button>
      &nbsp;
      <b-button @click="goBack" class="button is-light">Cancelar</b-button>
      <hr />

      <div>
        {{ message }}

        <span v-if="message == 'Menu atualizado!'">
          <br />
          <a @click="goBack">Voltar para menus</a>
        </span>
      </div>

      <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

import MenuItemsForm from "../../components/MenuItemsForm";

export default {
  name: "EditMenu",

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

  mounted() {
    if (this.$route.params.id == undefined) {
      alert("no id");
      this.$router.push("/list-menus");
    }

    this.id = this.$route.params.id;
    this.is_daily = this.$route.params.is_daily;
    this.name = this.$route.params.name;
    this.description = this.$route.params.description;
    this.items = this.$route.params.items;
  },

  methods: {
    itemsUpdatedByForm(newItems) {
      this.items = newItems;
    },

    goBack() {
      this.$router.push("/list-menus");
    },

    async updateMenu() {
      let data = {
        is_daily: this.is_daily,
        name: this.name,
        description: this.description,
        items: this.items,
      };

      this.isLoading = true;

      let response = await axios.put(
        `http://127.0.0.1:5000/menus/${this.id}`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${this.userToken}` },
        }
      );

      this.isLoading = false;

      if (response.status == 202) {
        this.message = "Menu atualizado!";
      }
    },
  },
};
</script>

<style></style>
