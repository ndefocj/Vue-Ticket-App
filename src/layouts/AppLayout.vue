<template>
  <div class="layout-wrapper">
    <header class="main-header">
      <div class="container">
        <RouterLink to="/dashboard" class="logo">TicketApp</RouterLink>
        <nav class="main-nav">
          <ul>
            <li><RouterLink to="/dashboard">Dashboard</RouterLink></li>
            <li><RouterLink to="/tickets">Manage Tickets</RouterLink></li>
            <li>
              <button @click="handleLogout" class="btn btn-secondary">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <main>
      <RouterView />
    </main>
    <Footer></Footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "../store/auth.js";
import Footer from "../components/Footer.vue";

const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
};
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
}
</style>
