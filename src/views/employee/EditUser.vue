<template>
  <div class="columns is-flex is-vcentered is-centered">
    <div class="column is-half">
      <a class="button is-light" @click="goBack">
        Voltar
      </a>

      <br />
      <br />

      <div class="field" v-if="isManager">
        <label class="label">Tipo de conta:</label>
        <div class="control">
          <div class="select">
            <select v-model="role">
              <option value="basic">Funcionário</option>
              <option value="manager">Gerente</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Nome</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="text"
            placeholder="Text input"
            v-model="name"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
      </div>

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

      <b-button @click="updateUser">Atualizar dados</b-button>
      <hr />

      <div>
        {{ userUpdated.message }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios-config";
import { mapGetters } from "vuex";

export default {
  name: "EditUser",

  data() {
    return {
      id: 0,
      role: "basic",
      name: "",
      email: "",
      password: "",
      userUpdated: {
        error: false,
        message: "",
      },
    };
  },

  computed: {
    loggedUserToken() {
      return this.$store.state.userToken;
    },

    ...mapGetters(["isManager"]),
  },

  mounted() {
    this.id = this.$route.params.id;
    this.role = this.$route.params.role == 1 ? "manager" : "basic";
    this.name = this.$route.params.name;
    this.email = this.$route.params.email;
  },

  methods: {
    updateUser() {
      const data = {
        role: this.role,
        name: this.name,
        email: this.email,
      };

      if (this.password.length > 0) data.password = this.password;

      axios
        .put(
          `/employees/${this.id}`,
          { ...data },
          {
            headers: { Authorization: `Bearer ${this.loggedUserToken}` },
          }
        )
        .then(() => {
          this.userUpdated.error = false;
          this.userUpdated.message = "Usuário atualizado";
        })
        .catch((error) => {
          this.userUpdated.error = true;
          this.userUpdated.message = error.response.data.error;
        });
    },

    goBack() {
      this.$router.push("/list-users");
    },
  },
};
</script>
