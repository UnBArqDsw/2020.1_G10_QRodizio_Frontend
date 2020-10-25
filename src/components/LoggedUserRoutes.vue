<template>
  <fragment>
    <b-navbar-item tag="router-link" to="/user-home">
      Página inicial
    </b-navbar-item>

    <b-navbar-item tag="router-link" to="/register-new-user">
      Registrar novo usuário
    </b-navbar-item>

    <b-navbar-item tag="router-link" to="/list-users">
      Listar usuários
    </b-navbar-item>

    <b-navbar-item tag="router-link" to="/employee-demands">
      Listar pedidos
    </b-navbar-item>
    
  </fragment>
</template>

<script>
export default {
  name: "LoggedUserRoutes",
};
</script>