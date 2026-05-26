<template>
  <section id="service-area" class="bg-linear-to-br from-[#155DFC] via-[#1447E6] to-[#1C398E] text-white relative overflow-hidden">

    <div
      class="absolute inset-0
            bg-[linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),
                linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)]
            bg-size-[40px_40px]
            pointer-events-none">
    </div>

    <div class="m-auto max-w-5xl px-8 py-12 sm:py-20 relative z-10">
      <div class="flex flex-col space-y-4 justify-center items-center">
        <SectionTitle
          badge="WHERE WE SERVE"
          title="Service Area"
          subtitle="Proudly serving the following locations"
          :dark="true"
        />
      </div>
      <LocationCard />
      <div class="mt-8 outline rounded-2xl p-6 outline-white/20 bg-white/8">
        <p class="text-center"><span class="font-semibold">Not sure if I can reach you?</span> Send me a message and let's find out!</p>
      </div>
    </div>

  </section>
</template>

<script setup>
import LocationCard from '../ui/LocationCard.vue'
import SectionTitle from '../ui/SectionTitle.vue'
</script>
