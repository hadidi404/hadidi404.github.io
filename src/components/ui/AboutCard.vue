<template>
  <div class="grid grid-cols-3 mt-1 gap-3">
    <div
      v-for="(card, i) in trustCards"
      :key="card.title"
      v-animate="i * 100"
      class="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl space-y-1"
    >
      <div class="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 sm:h-7 sm:w-7 text-blue-600"
          :viewBox="card.icon.viewBox"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path v-for="(d, i) in card.icon.paths" :key="i" :d="d" />
        </svg>
      </div>
      <h3 class="text-sm sm:text-lg font-bold text-gray-900 text-center">
        {{ card.title }}
      </h3>
      <p class="text-gray-600 text-xs sm:text-sm text-center leading-relaxed">
        {{ card.desc }}
      </p>
    </div>
  </div>
</template>

<script setup>
const trustCards = [
  {
    title: "7+ Years",
    desc: "Certified Technician",
    icon: {
      viewBox: "0 0 24 24",
      paths: [
        "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
        "M18 8a6 6 0 1 1-12 0a6 6 0 0 1 12 0"
      ]
    }
  },
  {
    title: "100+",
    desc: "Happy Customers",
    icon: {
      viewBox: "0 0 24 24",
      paths: [
        "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
        "M13 7a4 4 0 1 1-8 0a4 4 0 0 1 8 0",
        "M22 21v-2a4 4 0 0 0-3-3.87",
        "M16 3.13a4 4 0 0 1 0 7.75"
      ]
    }
  },
  {
    title: "1-2hrs",
    desc: "Quick Turnaround",
    icon: {
      viewBox: "0 0 24 24",
      paths: [
        "M22 12a10 10 0 1 1-20 0a10 10 0 0 1 20 0",
        "M12 6v6l4 2"
      ]
    }
  }
]
</script>
