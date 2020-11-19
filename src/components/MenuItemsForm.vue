<template>
  <div>
    <button
      v-if="!displayForm"
      @click="displayForm = true"
      class="button is-success"
    >
      Adicionar novo item
    </button>

    <fieldset v-if="displayForm">
      <legend>
        {{ editing > -1 ? "Edição de item de menu" : "Novo item de menu" }}
      </legend>
      <div class="field">
        <label class="label">Nome</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Nome" v-model="name" />
        </div>
      </div>

      <div class="field">
        <label class="label">Valor</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="number"
            placeholder="0.0"
            v-model="value"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Descrição</label>

        <textarea
          v-model="description"
          class="textarea"
          placeholder="Descrição"
        ></textarea>
      </div>

      <button class="button is-light is-success" @click="saveItem">
        {{ editing > -1 ? "Salvar mudança" : "Adicionar" }}
      </button>
      &nbsp;
      <button class="button is-light" @click="clearForm">Cancelar</button>
    </fieldset>
    <div style="overflow-x:auto;>">
      <table class="table is-striped is-fullwidth" v-if="!displayForm">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in items" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.value }}</td>
            <td>
              <button class="button is-light" @click="editItem(index)">
                Editar
              </button>
            </td>
            <td>
              <button
                class="button is-light is-danger"
                @click="confirmRemoveItem(index)"
              >
                Deletar
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

export default {
  name: "MenuItemsForm",

  props: {
    menuId: {
      type: Number,
      default: -1,
    },
    items: Array,
  },

  data() {
    return {
      editing: -1,
      displayForm: false,
      name: "",
      description: "",
      value: 0.0,
    };
  },

  watch: {
    value(newValue) {
      let parsed = parseFloat(newValue);

      if (isNaN(parsed) || parsed < 0) parsed = 0;

      this.value = parsed;
    },
  },

  methods: {
    clearForm() {
      this.editing = -1;
      this.displayForm = false;
      this.name = "";
      this.description = "";
      this.value = 0.0;
    },

    saveItem() {
      let item = {
        name: this.name,
        description: this.description,
        value: this.value,
      };

      let updatedItems = [...this.items];

      if (this.editing > -1) {
        // if is editing a given index, update it
        updatedItems[this.editing] = item;
      } else {
        // else add new item to the list
        updatedItems = [...updatedItems, item];
      }

      this.$emit("update:itemsUpdated", updatedItems);
      this.clearForm();
    },

    editItem(index) {
      this.editing = index;
      this.displayForm = true;
      this.name = this.items[index].name;
      this.description = this.items[index].description;
      this.value = this.items[index].value;
    },

    confirmRemoveItem(index) {
      this.$buefy.dialog.confirm({
        message: "Deseja realmente deletar esse item ?",
        onConfirm: async () => await this.removeItem(index),
      });
    },

    async removeItem(index) {
      await this.verifyDeleteOnBack(index);

      let copyItems = [...this.items];

      copyItems = [...copyItems.slice(0, index), ...copyItems.slice(index + 1)];

      this.$emit("update:itemsUpdated", copyItems);
    },

    async verifyDeleteOnBack(index) {
      if (this.menuId > -1 && this.items[index].id !== undefined) {
        await this.deleteItemOnBackend(this.items[index]);
      }
    },

    async deleteItemOnBackend(item) {
      let response = await axios.delete(
        `http://127.0.0.1:5000/menus/${this.menuId}/${item.id}`,
        {
          headers: { Authorization: `Bearer ${this.userToken}` },
        }
      );

      if(response.status === 202) {
        alert("Deletado no servidor");
      }
    },
  },
};
</script>

<style scoped>
fieldset {
  margin-top: 20px;
  padding: 20px;
  border: solid #f5f5f5 2px;
}

fieldset legend {
  font-size: 22px;
  margin-bottom: 10px;
  padding: 0 10px;
}
</style>
