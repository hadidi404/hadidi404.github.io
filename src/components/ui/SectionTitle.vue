<template>
  <div class="flex flex-col items-center space-y-3 text-center">
    <span
      v-if="badge"
      class="w-fit text-sm font-semibold px-5 py-2 rounded-full"
      :class="dark ? 'bg-white/15 text-white' : 'bg-blue-100 text-blue-700'"
    >
      {{ badge }}
    </span>
    <h2
      class="text-2xl sm:text-3xl lg:text-4xl font-bold"
      :class="dark ? 'text-white' : 'text-gray-900'"
    >
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="text-base sm:text-lg max-w-2xl"
      :class="dark ? 'text-white/80' : 'text-gray-600'"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  badge: String,
  title: String,
  subtitle: String,
  dark: { type: Boolean, default: false }
})
</script>
