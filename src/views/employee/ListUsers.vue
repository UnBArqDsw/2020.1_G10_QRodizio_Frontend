<template>
  <div>
    <strong>Usuários</strong>
    <hr />
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.role == 0 ? "Funcionário" : "Gerente" }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ListUsers",

  data() {
    return {
      users: []
    };
  },

  computed: {
    loggedUserToken() {
      return this.$store.state.userToken;
    }
  },

  async mounted() {
    await this.fetchUsers();
  },

  methods: {
    async fetchUsers() {
      let response = await axios.get("http://127.0.0.1:5000/employees/", {
        headers: { Authorization: `Bearer ${this.loggedUserToken}` }
      });

      this.users = response.data.employees;
      console.log(response.data);
    }
  }
};
</script>
