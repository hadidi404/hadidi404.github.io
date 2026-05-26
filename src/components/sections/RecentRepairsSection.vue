<template>
  <section id="recent-repairs">
    <div class="max-w-7xl mx-auto space-y-4 px-4 sm:px-8 py-12 sm:py-20">
      <div class="flex flex-col items-center justify-center space-y-4">
        <div v-animate>
          <SectionTitle
            badge="OUR WORK"
            title="Recent Repairs"
            subtitle="See the quality of work I deliver for every device"
          />
        </div>
      </div>
      <RecentRepairCards />
    </div>
  </section>
</template>

<script setup>
import RecentRepairCards from '../ui/RecentRepairCards.vue'
import SectionTitle from '../ui/SectionTitle.vue'
</script>
