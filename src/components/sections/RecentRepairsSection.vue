<template>
  <section id="recent-repairs">
    <div class="max-w-7xl mx-auto space-y-4 px-8 py-20">
      <div class="flex flex-col items-center justify-center space-y-4 mb-16">
        <p
          class="w-fit flex justify-center text-xl text-[#155DFC] font-semibold  bg-[#DBEAFE] rounded-full items-center px-4 py-2"
        >
          OUR WORK
        </p>
        <h1 class="text-4xl font-bold ">Recent Repairs</h1>
        <p class="font-normal text-lg text-gray-600">
          See the quality of work I deliver for every device
        </p>
        
      </div>
      <RecentRepairCards />
    </div>
  </section>
</template>

<script setup>
import RecentRepairCards from '../ui/RecentRepairCards.vue';
</script>

<style scoped></style>
