<template>
  <div class="grid grid-cols-1 mt-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="card in trustCards"
          :key="card.title"
          class="h rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="mb-4 flex justify-center">
            <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-blue-600"
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
          </div>
          <h3 class="text-lg font-bold text-gray-900 text-center">
            {{ card.title }}
          </h3>

          <p class="mt-3 text-gray-600 text-center leading-relaxed">
            {{ card.desc }}
          </p>
        </div>
      </div>
</template>

<script setup>
  const trustCards = [
    {
      title: "Honest Assessment",
      desc: "I will tell you exactly what is wrong and whether it is worth repairing—no upselling, just honest advice.",
      icon: {
        viewBox: "0 0 24 24",
        paths: [
          "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
          "M12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5",
        ],
      },
    },
    {
      title: "Quality Parts",
      desc: "I use reliable, tested components to ensure your device works properly and lasts.",
      icon: {
        viewBox: "0 0 24 24",
        paths: [
          "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
        ],
      },
    },
    {
      title: "Careful Repair Process",
      desc: "Every repair is done with attention to detail, following proper procedures to protect your device.",
      icon: {
        viewBox: "0 0 24 24",
        paths: [
          "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
          "m9 12 2 2 4-4",
        ],
      },
    },

    {
      title: "Clear Communication",
      desc: "I keep you informed throughout the process—no tech jargon, just plain explanations.",
      icon: {
        viewBox: "0 0 24 24",
        paths: ["M7.9 20A9 9 0 1 0 4 16.1L2 22Z"],
      },
    },
  ];
</script>

<style scoped>
</style>
