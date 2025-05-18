<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComponent from './components/Navbar.vue'
</script>

<template>
  <div class="app-container">
    <NavbarComponent />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.main-content {
  flex: 1;
  padding: 2rem 1rem;
  width: 100%;
  max-width: 100%;
}
</style>
