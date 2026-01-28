<script setup>
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import HomeSection from './components/sections/HomeSection.vue'
import ServicesSection from './components/sections/ServicesSection.vue'
import RepairsSection from './components/sections/RepairsSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
</script>

<template>
  <Navbar />
  <main class="page">
    <HomeSection />
    <ServicesSection />
    <RepairsSection />
    <AboutSection />
    <ContactSection />
    <Footer />
  </main>
  
</template>

<style scoped>
  
</style>
