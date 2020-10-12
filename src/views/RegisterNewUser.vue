<template>
  <div>
    <form @submit.prevent="registerUser">
      Tipo de conta:
      <select v-model="role" id="user-role">
        <option value="basic" default>Funcionário</option>
        <option value="manager">Gerente</option>
      </select>

      <br />

      <spam>Nome: </spam>
      <input type="text" id="user-name" v-model="name" />
      <br />

      <spam>Email: </spam>
      <input type="text" id="user-email" v-model="email" />
      <br />

      <spam>password: </spam>
      <input type="password" id="user-password" v-model="password" />
      <br />

      <button>Registrar</button>
    </form>

    <hr />

    <div>
      {{ userCreated.message }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterNewUser",

  data() {
    return {
      role: "basic",
      name: "",
      email: "",
      password: "",
      userCreated: {
        error: false,
        message: ""
      }
    };
  },

  computed: {
    loggedUserToken() {
      return this.$store.state.userToken;
    }
  },

  methods: {
    registerUser() {
      axios
        .post(
          "http://127.0.0.1:5000/auth/register",
          {
            role: this.role,
            name: this.name,
            email: this.email,
            password: this.password
          },
          {
            headers: { Authorization: `Bearer ${this.loggedUserToken}` }
          }
        )
        .then(() => {
          this.userCreated.error = false;
          this.userCreated.message = "Usuário criado";
        })
        .catch(error => {
          this.userCreated.error = true;
          this.userCreated.message = error.response.data.error;
        });
    }
  }
};
</script>
