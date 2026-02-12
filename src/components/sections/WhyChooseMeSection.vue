<template>
  <section id="why-choose-me">
    <div class="flex flex-col items-center max-w-7xl mx-auto space-y-4 px-8 py-20">
      <h1 class="text-4xl font-bold">Why Choose Me</h1>
      
      <p class="font-normal text-2xl text-gray-600 mb-12">
        Trust and quality in every repair
      </p>
      <RepairCard />
    </div> 
  </section>
</template>



<script setup>
import RepairCard from '../ui/RepairCard.vue';
</script>

<style scoped>
</style>
