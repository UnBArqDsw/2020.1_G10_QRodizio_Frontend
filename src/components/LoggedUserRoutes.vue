<template>
  <div>
    <b-navbar-item tag="router-link" :to="{ path: '/user-home' }">
      User Home
    </b-navbar-item>

    <b-navbar-item tag="router-link" :to="{ path: '/register-new-user' }">
      Registrar novo usuário
    </b-navbar-item>

    <b-navbar-item tag="router-link" :to="{ path: '/list-users' }">
      Listar usuários
    </b-navbar-item>
  </div>
</template>

<script>
export default {
  name: "LoggedUserRoutes",
};
</script>
