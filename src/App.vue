<template>
  <div id="app">
    <TopNavbar />

    <div class="container">
      <router-view />
    </div>
        <footer class="footer">
     <div class="content has-text-centered">
        <p>
        <strong>Qrcode</strong> by <a href="https://jgthms.com">Universidade de Brasilia</a>. The source code is licensed
        </p>
      </div>
    </footer>
  </div>
  
</template>

<script>
import TopNavbar from "./components/TopNavbar/TopNavbar";

const isNotBank = (data) => data !== null && data.length > 0;

export default {
  name: "App",

  components: {
    TopNavbar,
  },

  sockets: {
    frontend_current_logged_employee(employees) {
      this.$store.dispatch("setLoggedUsers", employees);
    },

    //appvue pq fica na navbar
    frontend_call_for_employee_on_table(tableSession) {
      console.log("Called on ");
      console.log(tableSession);
      this.$store.dispatch("addTableToCalling", tableSession);
    },

    frontend_not_call_for_employee_on_table(tableSession) {
      console.log("Called on ");
      console.log(tableSession);
      this.$store.dispatch("removeTableToCalling", tableSession);
    },
  },

  mounted() {
    let userToken = localStorage.getItem("userToken");
    let userData = localStorage.getItem("userData");

    if (isNotBank(userToken) && isNotBank(userData)) {
      this.$store.dispatch("logUserIn", {
        token: userToken,
        user: JSON.parse(userData),
      });

      this.logged = true;
    }
  },
};
</script>

<style >
@import '/assets/styles/styles.css';

</style>
