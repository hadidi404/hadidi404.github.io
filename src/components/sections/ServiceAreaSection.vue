<template>
  <section id="service-area" class="py-20 sm:py-28 bg-gradient-to-br from-[#155DFC] via-[#1447E6] to-[#1C398E] text-white relative overflow-hidden">
      <!-- Grid overlay -->
    <div
  class="absolute inset-0
        bg-[linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),
            linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)]
        bg-[size:40px_40px]
        pointer-events-none">
</div>

    <div class="m-auto max-w-7xl px-4 relative z-10">
      <!--Texts-->
      <div class="flex flex-col space-y-4 justify-center items-center">
        <p class="flex justify-center text-xl text-blue-700 font-semibold px-5 py-2 bg-blue-100 rounded-full items-center">WHERE WE SERVE</p>  
        <h1 class="text-4xl font-extrabold text-white">Service Area</h1>
        <p class="font-normal text-lg text-white">Proudly serving the following locations</p>
      </div>
      <!--Cards-->
      <LocationCard/>
      <div class="mt-9 outline rounded-2xl p-6 outline-white/20 bg-white/8">
        <p><span class="font-semibold">Not sure if I can reach you?</span> Send me a message and let's find out!</p>
      </div>
      <div id="placeholder" class="h-50"></div>
    </div>
    
  </section>
</template>

<script setup>
import LocationCard from '../ui/LocationCard.vue';

</script>

<style scoped>
</style>
