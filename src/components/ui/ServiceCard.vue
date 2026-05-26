<template>
  <div class="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  lg:gap-8">
    <div
      v-for="(group, gIndex) in serviceGroups"
      :key="gIndex"
      v-animate="gIndex * 120"
      class="bg-white rounded-2xl shadow-sm border-2 border-gray-100 transition-all duration-700 ease-in-out hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        class="flex items-center gap-4 p-4 sm:flex-col sm:items-start sm:p-8 sm:pb-0 cursor-pointer sm:cursor-default select-none sm:select-auto"
        @click="openCards[gIndex] = !openCards[gIndex]"
      >
        <div class="flex items-center justify-center rounded-xl sm:rounded-2xl w-12 h-12 sm:w-20 sm:h-20 bg-blue-50 shrink-0 sm:mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :viewBox="group.icon.viewBox"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
          >
            <path v-for="(d, i) in group.icon.paths" :key="i" :d="d" />
          </svg>
        </div>
        <h3 class="flex-1 text-base font-bold text-gray-900 sm:flex-none sm:text-xl sm:text-left">
          {{ group.title }}
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 sm:hidden"
          :class="openCards[gIndex] ? 'rotate-180' : ''"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <div
        class="px-4 sm:px-8 pb-4 sm:pb-8 pt-2 sm:pt-5 flex-col items-start gap-1"
        :class="openCards[gIndex] ? 'flex' : 'hidden sm:flex'"
      >
        <div
          v-for="(service, sIndex) in group.services"
          :key="sIndex"
          class="flex items-center gap-2 w-full py-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd" />
          </svg>
          <p class="text-sm sm:text-base font-normal">{{ service }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const serviceGroups = [
  {
    title: 'Phone & Tablet Repairs',
    services: [
      'Cracked screen replacement',
      'Battery replacement',
      'Charging port repair',
      'Water damage assessment',
      'Software troubleshooting',
    ],
    icon: {
      viewBox: "0 0 24 24",
      paths: [
        "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2",
        "M12 18h.01"
      ]
    }
  },
  {
    title: 'Laptop & PC Services',
    services: [
      "Screen replacement",
      "Hardware upgrades (RAM, SSD)",
      "Keyboard and trackpad repair",
      "Overheating fixes",
      "Operating system reinstall"
    ],
    icon: {
      viewBox: "0 0 24 24",
      paths: [
        "M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"
      ]
    }
  },
  {
    title: 'Diagnostics & Maintenance',
    services: [
      "Complete device diagnostics",
      "Performance optimization",
      "Virus and malware removal",
      "Data backup assistance",
      "Preventive maintenance"
    ],
    icon: {
      viewBox: "0 0 24 24",
      paths: [
        "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
      ]
    }
  }
]

const openCards = reactive(serviceGroups.map(() => false))
</script>
