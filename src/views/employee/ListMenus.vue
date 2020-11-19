<template>
<div class="ListMenus">
    <a class="button is-success" @click="makeNewMenu">
      Fazer novo menu
    </a>

    <br />
    <div style="overflow-x:auto;>">
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>id</th>
            <th>Menu do dia</th>
            <th>Nome</th>
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="menu in menus" :key="menu.id">
            <td>{{ menu.id }}</td>

            <td>
              <span v-if="menu.is_daily" class="button is-success is-light">
                Sim
              </span>
              <span v-else class="button is-danger is-light">Não</span>
            </td>

            <td>
              {{menu.name}}
            </td>

            <td>
              <a class="button is-light" @click="editMenu(menu)">
                Editar
              </a>
            </td>

            <td>
              <a class="button is-danger" @click="confirmDeleteMenu(menu)">
                Deletar
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ListMenus",

  data() {
    return {
      menus: []
    }
  },

  async mounted() {
    await this.fetchMenus();
  },

  methods: {
    async fetchMenus() {
      let response = await axios.get("http://127.0.0.1:5000/menus");
      this.menus = response.data.menus; 
    },

    makeNewMenu() {
      this.$router.push("/create-Menu");
    },

    editMenu(menu) {
      this.$router.push({name: "EditMenu", params: {...menu}});
    },

    async confirmDeleteMenu(menu) {
      this.$buefy.dialog.confirm({
        message: "Deseja realmente deletar esse menu ?",
        onConfirm: async () => await this.deleteMenu(menu),
      });
    },

    async deleteMenu(menu) {
      let respose = await axios.delete(`http://127.0.0.1:5000/menus/${menu.id}`);

      if(respose.status == 202) {
        await this.fetchMenus();
      }
    },
  }
};
</script>

<style></style>
