<template>
  <section id="services" class="w-full">
    <div class="max-w-7xl mx-auto flex flex-col items-center justify-center py-12 sm:py-20 space-y-4 px-4 sm:px-8">
      <div v-animate>
        <SectionTitle
          badge="WHAT I OFFER"
          title="Services"
          subtitle="Professional repair and maintenance for all your devices"
        />
      </div>
      <ServiceCard />
      <div class="rounded-2xl w-full flex items-center justify-center bg-linear-to-r from-blue-50 to-cyan-50 border border-blue-100 p-2 sm:p-6 lg:p-3">
        <p class="text-xs sm:text-base text-gray-700 text-center">
          <span class="font-semibold text-gray-900">Don't see your issue listed?</span>
          {{ ' ' }}Feel free to contact me—I handle a wide range of repairs and I'm happy to help!
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import ServiceCard from '../ui/ServiceCard.vue'
import SectionTitle from '../ui/SectionTitle.vue'
</script>
