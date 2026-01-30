<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
    <div v-for="(group, gIndex) in serviceGroups" :key="gIndex" class="bg-white rounded-2xl p-8 shadow-sm 
                hover:shadow-2xl duration-300 border border-gray-100 border-2
                hover:border-transparent hover:-translate-y-1 space-y-5">
      <!-- Icon placeholder -->
      <div
        class="flex items-center justify-center rounded-2xl w-20 h-20 bg-blue-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :viewBox="group.icon.viewBox"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-8 h-8 text-blue-600"
        >
          <path
            v-for="(path, pIndex) in group.icon.paths"
            :key="pIndex"
            :d="path"
          />
        </svg>
      </div>

      <!-- Title -->
      <h3 class="text-2xl text-left font-bold mb-2">
        {{ group.title }}
      </h3>

      <!-- Services list -->
      <div class="flex flex-col items-start gap-1">
        <div v-for="(service, sIndex) in group.services" :key="sIndex" class="flex items-center gap-2 outline outline-2 outline-white/20 py-2
                    max-w-[460px] rounded-full text-sm leading-tight bg-white/5 backdrop-blur">
          <!-- Check icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-sky-400 flex-shrink-0" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd" />
          </svg>

          <p class="text-normal font-normal">
            {{ service }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
          // rect x=5 y=2 width=14 height=20 rx=2 ry=2  (converted to path)
          "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2",
          // "M12 18h.01"
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

</script>

<style scoped></style>
