<template>
  <section class="flex justify-center">
    <div
      class="flex flex-col items-center justify-center pt-50 space-y-4 px-5 mx-auto max-w-7xl"
    >
      <p
        class="flex justify-center text-xl text-blue-700 font-semibold bg-blue-100 rounded-full items-center px-5 py-2"
      >
        WHAT I OFFER
      </p>
      <h1 class="text-4xl font-extrabold ">Services</h1>
      <p class="font-normal text-lg text-gray-600">
        Professional repair and maintenance for all your devices
      </p>
      <ServiceCard />
      <div
        class="outline rounded-2xl mt-12 bg-blue-300 w-full h-20 flex items-center justify-center bg-gradient-to-r from-blue-50 to-cyan-50"
      >
        <p class="text-normal text-gray-700">
          <span class="font-semibold text-gray-900"
            >Don't see your issue listed?</span
          >
          Feel free to contact me—I handle a wide range of repairs and I'm happy
          to help!
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import ServiceCard from "../ui/ServiceCard.vue";
</script>

<style scoped></style>
