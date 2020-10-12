<template>
  <div>
    <form @submit.prevent="logUser">
      <spam>Email: </spam>
      <input type="text" id="user-email" v-model="email" />
      <br />
      <spam>password: </spam>
      <input type="password" id="user-password" v-model="password" />
      <br />
      <button>Logar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserLoggin",

  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    async logUser() {
      let response = await axios.post("http://127.0.0.1:5000/auth/loggin", {
        email: this.email,
        password: this.password
      });

      if (response.status === 200) {
        this.$store.dispatch("logUserIn", response.data.token);
        this.$router.push("/user-home");
      } else {
        alert("Deu ruim");
      }
    }
  }
};
</script>
