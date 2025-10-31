<template>
  <div class="layout-wrapper">
    <header class="main-header">
      <div class="container">
        <RouterLink to="/" class="logo">TicketApp</RouterLink>
        <nav class="main-nav">
          <ul>
            <li>
              <RouterLink to="/auth" class="btn btn-secondary">Login</RouterLink>
            </li>
            <li>
              <RouterLink to="/auth" class="btn btn-primary"
                >Get Started</RouterLink
              >
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
import Footer from "../components/Footer.vue";
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