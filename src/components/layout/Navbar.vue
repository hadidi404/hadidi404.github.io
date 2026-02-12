<script setup>
const links = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Repairs', id: 'recent-repairs' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' }
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
      <div class="font-bold text-[24px] bg-linear-to-r from-[#155DFC]  to-[#193CB8] bg-clip-text text-transparent">
        Rayson Tech
      </div>

      <div class="hidden md:flex gap-6">
        <button
          v-for="l in links"
          :key="l.id"
          @click="scrollTo(l.id)"
          class="text-base font-medium text-gray-700 hover:text-blue-600 transition"
        >
          {{ l.label }}
        </button>
      </div>
    </div>
  </nav>
</template>


<script setup></script>


  <script setup>
  </script>

  <style scoped>
   
  </style>
