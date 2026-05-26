<script setup>
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <Navbar />
  <main class="page">
    <RouterView />
  </main>
  <Footer />
</template>

