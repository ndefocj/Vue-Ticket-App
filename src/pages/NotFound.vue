<template>
  <div class="container" style="text-align: center; padding: 4rem 0">
    <h1>404: Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <RouterLink to="/" class="btn btn-primary" style="margin-top: 1rem"
      >Go Home</RouterLink
    >
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>