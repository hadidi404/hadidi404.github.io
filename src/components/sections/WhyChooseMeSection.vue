<template>
  <section id="why-choose-me">
    <div class="flex flex-col items-center max-w-7xl mx-auto space-y-4 px-4 sm:px-8 py-8 sm:py-20">
      <div v-animate>
        <SectionTitle
          badge="MY COMMITMENT"
          title="Why Choose Me"
          subtitle="Trust and quality in every repair"
        />
      </div>
      <RepairCard />
    </div>
  </section>
</template>

<script setup>
import RepairCard from '../ui/RepairCard.vue'
import SectionTitle from '../ui/SectionTitle.vue'
</script>
