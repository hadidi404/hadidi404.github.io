<template>
  <section class="flex flex-col items-center justify-center py-50 space-y-4">
    <p
      class="flex justify-center text-xl text-blue-700 font-semibold  bg-blue-100 rounded-full items-center px-5 py-2"
    >
      OUR WORK
    </p>
    <h1 class="text-6xl font-bold">Recent Repairs</h1>
    <p class="font-normal text-2xl text-gray-600">
      See the quality of work I deliver for every device
    </p>

    <div class="max-w-7xl mx-auto space-y-4 px-5">
      <h1 class="mt-50 text-6xl font-bold">Why Choose Me</h1>
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

<style scoped></style>
