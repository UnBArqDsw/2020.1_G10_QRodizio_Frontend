<template>
  <div class="columns is-flex is-vcentered is-centered">
    <div class="column is-half">
      <form @submit.prevent="logUser">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="email"
              placeholder="Email"
              v-model="email"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </p>
        </div>

        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              type="password"
              placeholder="Password"
              v-model="password"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>

        <div class="field">
          <p class="control">
            <button class="button is-success">
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserLogin",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  sockets: {
    frontend_employee_logged(user) {
      console.log("An user just logged !!!");
      console.log(user);
    },
  },

  methods: {
    async logUser() {
      let response = await axios.post("http://127.0.0.1:5000/auth/login", {
        email: this.email,
        password: this.password,
      });

      if (response.status === 200) {
        let { token, user } = response.data;
        await this.$socket.emit("employee_logged", user);

        this.$store.dispatch("logUserIn", { token, user });
        this.$router.push("/user-home");
      } else {
        alert("Deu ruim");
      }
    },
  },
};
</script>
