<template>
  <div>
    <a class="button is-success" @click="gotoRegisterNewUser">
      Cadastrar novo usuário
    </a>

    <hr />

    <table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>Cargo</th>
          <th>Nome</th>
          <th>Logado</th>
          <th>Editar</th>
          <th>Deletar</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>
            {{ displayUserRole(user.role) }}
          </td>
          <td>{{ user.name }}</td>
          <td>
            <span v-bind:class="[isUserLogged(user.id) ? 'userLogged' : 'userNotLogged']">
              {{ isUserLogged(user.id) ? "sim" : "não" }}
            </span>
          </td>
          <td>
            <button class="button is-light" @click="gotoEditUser(user)">editar</button>
          </td>
          <td>
            <button
              class="button is-danger"
              @click="confirmDeleteUser(user.id)"
            >
              deletar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "ListUsers",

  data() {
    return {
      users: [],
    };
  },

  computed: {
    loggedUserToken() {
      return this.$store.state.userToken;
    },

    loggedUserId() {
      return this.$store.state.userData.id;
    },

    ...mapGetters(['loggedUsers'])
  },

  async mounted() {
    await this.fetchUsers();
  },

  methods: {
    isUserLogged(id) {
      return id in this.loggedUsers;
    },

    displayUserRole(role) {
      let text = "";

      switch (role) {
        case 0:
          text = "Funcionário";
          break;
        case 1:
          text = "Gerente";
          break;
        default:
          text = "";
      }

      return text;
    },

    async fetchUsers() {
      let response = await axios.get("http://127.0.0.1:5000/employees/", {
        headers: { Authorization: `Bearer ${this.loggedUserToken}` },
      });

      this.users = response.data.employees;
    },

    gotoRegisterNewUser() {
      this.$router.push("/register-new-user");
    },

    async confirmDeleteUser(userId) {
      if (userId == this.loggedUserId) {
        this.$buefy.dialog.alert({
          title: "Atenção",
          message: "Você nao pode se deletar",
          type: "is-danger",
          hasIcon: true,
          icon: "times-circle",
          iconPack: "fa",
          ariaRole: "alertdialog",
          ariaModal: true,
        });

        return;
      }

      this.$buefy.dialog.confirm({
        message: "Deseja realmente deletar esse usuário ?",
        onConfirm: async () => await this.deleteUser(userId),
      });
    },

    async deleteUser(userId) {
      let response = await axios.delete(
        `http://127.0.0.1:5000/employees/${userId}`,
        {
          headers: { Authorization: `Bearer ${this.loggedUserToken}` },
        }
      );

      if(response.status == 202) {
        await this.fetchUsers();
      }
    },

    gotoEditUser(user) {
      this.$router.push({name: "EditUser", params: {...user}});
    }
  },
};
</script>

<style scoped>
.userLogged {
  color: #48c774;
}

.userNotLogged {
  color: #f14668;
}
</style>
