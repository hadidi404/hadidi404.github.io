<template>
  <!-- Hero header -->
  <section class="bg-gradient-to-br from-[#1e3a6e] to-[#152a50] pt-24 pb-16">
    <div class="max-w-7xl mx-auto px-8">

      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm font-medium mb-10 transition-colors group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to Home
      </RouterLink>

      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
        <div class="space-y-4">
          <span class="inline-block bg-blue-500/20 text-blue-300 text-sm font-semibold px-5 py-2 rounded-full">
            REPAIR GALLERY
          </span>
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Before &amp; After
          </h1>
          <p class="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
            Every repair tells a story. Browse real work and see the difference quality service makes.
          </p>
        </div>

        <div class="flex gap-8 sm:gap-10 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/10">
          <div>
            <div class="text-3xl sm:text-4xl font-bold text-white">{{ repairs.length }}<span class="text-blue-400">+</span></div>
            <div class="text-xs sm:text-sm text-slate-400 mt-1 uppercase tracking-wide">Repairs Shown</div>
          </div>
          <div>
            <div class="text-3xl sm:text-4xl font-bold text-white">98<span class="text-blue-400">%</span></div>
            <div class="text-xs sm:text-sm text-slate-400 mt-1 uppercase tracking-wide">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Gallery body -->
  <section class="bg-gray-50 py-10 sm:py-14 min-h-[60vh]">
    <div class="max-w-7xl mx-auto px-8">

      <!-- Category filter -->
      <div class="flex gap-2 flex-wrap mb-10">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none"
          :class="activeCategory === cat
            ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
            : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'"
        >
          {{ cat }}
          <span class="ml-1.5 text-xs opacity-60">{{ cat === 'All' ? repairs.length : repairs.filter(r => r.category === cat).length }}</span>
        </button>
      </div>

      <!-- Grid -->
      <div v-if="filteredRepairs.length" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(item, index) in filteredRepairs"
          :key="item.id"
          v-animate="index * 80"
          @click="openModal(index)"
          class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-blue-100 cursor-pointer group"
        >
          <!-- Image area -->
          <div class="relative aspect-4/3 overflow-hidden bg-gray-100">
            <!-- Before image -->
            <img
              :src="item.before"
              :alt="`${item.title} — before`"
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              :class="showAfter[item.id] ? 'opacity-0' : 'opacity-100'"
              loading="lazy"
              decoding="async"
            />
            <!-- After image -->
            <img
              :src="item.after"
              :alt="`${item.title} — after`"
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              :class="showAfter[item.id] ? 'opacity-100' : 'opacity-0'"
              loading="lazy"
              decoding="async"
            />

            <!-- Hover expand hint -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
              <div class="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 bg-white rounded-full p-3 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0 5-5m11 5-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
            </div>

            <!-- State badge -->
            <div class="absolute top-3 left-3 pointer-events-none">
              <span
                class="text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-colors duration-300"
                :class="showAfter[item.id] ? 'bg-green-500' : 'bg-orange-500'"
              >
                {{ showAfter[item.id] ? 'After' : 'Before' }}
              </span>
            </div>

            <!-- Category badge -->
            <div class="absolute top-3 right-3 pointer-events-none">
              <span class="bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                {{ item.category }}
              </span>
            </div>

            <!-- Toggle pill -->
            <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 bg-black/50 backdrop-blur-sm rounded-full p-1">
              <button
                @click.stop="showAfter[item.id] = false"
                class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none"
                :class="!showAfter[item.id] ? 'bg-white text-gray-900' : 'text-white/70 hover:text-white'"
              >
                Before
              </button>
              <button
                @click.stop="showAfter[item.id] = true"
                class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none"
                :class="showAfter[item.id] ? 'bg-white text-gray-900' : 'text-white/70 hover:text-white'"
              >
                After
              </button>
            </div>
          </div>

          <!-- Card body -->
          <div class="p-5 space-y-1.5">
            <h3 class="font-bold text-gray-900 text-lg leading-snug">{{ item.title }}</h3>
            <p class="text-sm font-medium text-blue-600">{{ item.device }}</p>
            <p class="text-sm text-gray-500 leading-relaxed pt-1">{{ item.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="flex flex-col items-center justify-center py-24 text-center">
        <div class="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909" />
          </svg>
        </div>
        <p class="text-gray-500 font-medium">No repairs in this category yet.</p>
        <button @click="activeCategory = 'All'" class="mt-3 text-sm text-blue-600 hover:underline focus:outline-none">
          View all repairs
        </button>
      </div>

    </div>
  </section>

  <!-- CTA -->
  <section class="bg-white border-t border-gray-100 py-10 sm:py-16">
    <div class="max-w-2xl mx-auto px-8 text-center space-y-5">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">Ready to fix your device?</h2>
      <p class="text-gray-500 text-lg">Get in touch and I'll get it sorted — honest pricing, quality results.</p>
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all font-medium shadow-lg shadow-blue-100"
      >
        Contact Me
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </RouterLink>
    </div>
  </section>

  <!-- Modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="selectedIndex !== -1 && selectedItem"
        class="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

          <!-- Modal header -->
          <div class="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
            <div>
              <h2 class="text-xl font-bold text-gray-900">{{ selectedItem.title }}</h2>
              <p class="text-sm text-blue-600 font-medium mt-0.5">{{ selectedItem.device }}</p>
            </div>
            <div class="flex items-center gap-3">
              <span class="hidden sm:block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                {{ selectedItem.category }}
              </span>
              <button @click="closeModal" class="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Images side by side -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 p-1">
            <div class="relative">
              <div class="aspect-4/3 overflow-hidden rounded-xl bg-gray-100">
                <img
                  :src="selectedItem.before"
                  :alt="`${selectedItem.title} — before`"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="absolute top-3 left-3">
                <span class="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow">Before</span>
              </div>
            </div>
            <div class="relative">
              <div class="aspect-4/3 overflow-hidden rounded-xl bg-gray-100">
                <img
                  :src="selectedItem.after"
                  :alt="`${selectedItem.title} — after`"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="absolute top-3 left-3">
                <span class="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow">After</span>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="px-6 py-5">
            <p class="text-gray-600 leading-relaxed">{{ selectedItem.desc }}</p>
          </div>

          <!-- Navigation -->
          <div class="flex items-center justify-between px-6 pb-5 pt-1 border-t border-gray-100">
            <button
              @click="prevItem"
              :disabled="selectedIndex === 0"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Previous
            </button>
            <span class="text-xs text-gray-400">{{ selectedIndex + 1 }} / {{ filteredRepairs.length }}</span>
            <button
              @click="nextItem"
              :disabled="selectedIndex === filteredRepairs.length - 1"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const activeCategory = ref('All')
const selectedIndex = ref(-1)

const categories = ['All', 'Phone', 'Laptop', 'Tablet', 'Desktop']

// Replace before/after URLs with your own photos.
const repairs = [
  {
    id: 1,
    title: 'Cracked Screen Replacement',
    device: 'iPhone 13',
    category: 'Phone',
    desc: 'Deep cracks across the entire display — replaced with an OEM-quality screen, restored like new.',
    before: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    after: 'https://images.unsplash.com/photo-1731391747600-4d0f478b2184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    title: 'Battery Replacement',
    device: 'Samsung Galaxy S22',
    category: 'Phone',
    desc: 'Swollen battery causing back panel to bulge — safely removed and replaced with a new cell.',
    before: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    after: 'https://images.unsplash.com/photo-1735875530804-d661ca2001da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    title: 'SSD Upgrade',
    device: 'MacBook Pro 2019',
    category: 'Laptop',
    desc: 'Slow spinning HDD swapped for a 1TB NVMe SSD — boot time dropped from 90s to under 10s.',
    before: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    after: 'https://images.unsplash.com/photo-1709102884400-b50ca1a12bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    title: 'Charging Port Repair',
    device: 'iPad Air 5th Gen',
    category: 'Tablet',
    desc: 'USB-C port was loose and intermittent — cleaned and replaced, charges reliably again.',
    before: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    after: 'https://images.unsplash.com/photo-1735964366700-9eedefcf0065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    title: 'Motherboard Repair',
    device: 'Dell XPS 15',
    category: 'Laptop',
    desc: 'No power after liquid spill — traced fault to corroded power rail, reflowed and cleaned.',
    before: 'https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    after: 'https://images.unsplash.com/photo-1560165143-fa7e2d9e594c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 6,
    title: 'Deep Clean & Maintenance',
    device: 'Custom Gaming PC',
    category: 'Desktop',
    desc: 'Years of dust buildup causing overheating — fully disassembled, cleaned, and repasted.',
    before: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    after: 'https://images.unsplash.com/photo-1768633647910-7e6fb53e5b0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
  },
]

const showAfter = reactive(Object.fromEntries(repairs.map(r => [r.id, false])))

const filteredRepairs = computed(() =>
  activeCategory.value === 'All'
    ? repairs
    : repairs.filter(r => r.category === activeCategory.value)
)

const selectedItem = computed(() => filteredRepairs.value[selectedIndex.value] ?? null)

function openModal(index) {
  selectedIndex.value = index
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  selectedIndex.value = -1
  document.body.style.overflow = ''
}

function prevItem() {
  if (selectedIndex.value > 0) selectedIndex.value--
}

function nextItem() {
  if (selectedIndex.value < filteredRepairs.value.length - 1) selectedIndex.value++
}

function onKeydown(e) {
  if (selectedIndex.value === -1) return
  if (e.key === 'Escape') closeModal()
  if (e.key === 'ArrowLeft') prevItem()
  if (e.key === 'ArrowRight') nextItem()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>
