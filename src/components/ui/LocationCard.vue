<template>
  <div class="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-4 pt-12">
    <div
      v-for="(location, index) in locations"
      :key="index"
      class="flex gap-3 sm:gap-4 items-center p-4 sm:p-6 rounded-2xl border border-white/20 hover:shadow-lg transition bg-white/8"
    >
      <div class="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-blue-500 shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :viewBox="location.icon.viewBox"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-5 h-5 sm:w-7 sm:h-7 text-white"
        >
          <path
            v-for="(path, pIndex) in location.icon.paths"
            :key="pIndex"
            :d="path"
          />
        </svg>
      </div>

      <div>
        <h2 class="text-lg sm:text-xl font-bold">{{ location.name }}</h2>
        <p class="text-sm sm:text-base text-[#BEDBFF] text-left">{{ location.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const locations = [
  {
    name: "Baguio City",
    desc: "Benguet",
    icon: {
      viewBox: "0 0 24 24",
      paths: [
        "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
        "M15 10a3 3 0 1 1-6 0a3 3 0 0 1 6 0"
      ]
    }
  },
  {
    name: "Infanta",
    desc: "Pangasinan",
    icon: {
      viewBox: "0 0 24 24",
      paths: [
        "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
        "M15 10a3 3 0 1 1-6 0a3 3 0 0 1 6 0"
      ]
    }
  }
]
</script>
