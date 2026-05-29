<template>
  <section class="bg-gradient-to-br from-[#1e3a6e] to-[#152a50] pt-24 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-8">

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

  <section class="bg-gray-50 py-10 sm:py-14 min-h-[60vh]">
    <div class="max-w-7xl mx-auto px-4 sm:px-8">

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

      <div v-if="loading" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="n in 6" :key="n" class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <div class="aspect-4/3 bg-gray-200 animate-pulse"></div>
          <div class="p-5 space-y-2">
            <div class="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            <div class="h-3 bg-gray-200 rounded animate-pulse w-full mt-2"></div>
            <div class="h-3 bg-gray-200 rounded animate-pulse w-4/5"></div>
          </div>
        </div>
      </div>

      <div v-else-if="error" class="flex flex-col items-center justify-center py-24 text-center">
        <p class="text-red-500 font-medium">{{ error }}</p>
        <button @click="fetchRepairs" class="mt-3 text-sm text-blue-600 hover:underline focus:outline-none">Try again</button>
      </div>

      <div v-else-if="filteredRepairs.length || fetching" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(item, index) in filteredRepairs"
          :key="item.id"
          v-animate="index * 80"
          @click="openModal(index)"
          class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-blue-100 cursor-pointer group"
        >
          <div class="relative aspect-4/3 overflow-hidden bg-gray-100">
            <img
              v-if="item.images[0].before"
              :src="item.images[0].before"
              :alt="`${item.title} — before`"
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              :class="showAfter[item._id] ? 'opacity-0' : 'opacity-100'"
              loading="lazy"
              decoding="async"
            />
            <img
              :src="item.images[0].after"
              :alt="`${item.title} — after`"
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              :class="(!item.images[0].before || showAfter[item._id]) ? 'opacity-100' : 'opacity-0'"
              loading="lazy"
              decoding="async"
            />

            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
              <div class="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 bg-white rounded-full p-3 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0 5-5m11 5-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
            </div>

            <div class="absolute top-3 left-3 pointer-events-none">
              <span
                class="text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-colors duration-300"
                :class="!item.images[0].before ? 'bg-blue-500' : showAfter[item._id] ? 'bg-green-500' : 'bg-orange-500'"
              >
                {{ !item.images[0].before ? 'Fixed' : showAfter[item._id] ? 'After' : 'Before' }}
              </span>
            </div>

            <div class="absolute top-3 right-3 pointer-events-none flex flex-col items-end gap-1.5">
              <span class="bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                {{ item.category }}
              </span>
              <span
                v-if="item.images.length > 1"
                class="bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                {{ item.images.length }} fixes
              </span>
            </div>

            <div v-if="item.images[0].before" class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 bg-black/50 backdrop-blur-sm rounded-full p-1">
              <button
                @click.stop="showAfter[item._id] = false"
                class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none"
                :class="!showAfter[item._id] ? 'bg-white text-gray-900' : 'text-white/70 hover:text-white'"
              >
                Before
              </button>
              <button
                @click.stop="showAfter[item._id] = true"
                class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none"
                :class="showAfter[item._id] ? 'bg-white text-gray-900' : 'text-white/70 hover:text-white'"
              >
                After
              </button>
            </div>
          </div>

          <div class="p-5 space-y-1.5">
            <h3 class="font-bold text-gray-900 text-lg leading-snug">{{ item.title }}</h3>
            <p class="text-sm font-medium text-blue-600">{{ item.device }}</p>
            <p class="text-sm text-gray-500 leading-relaxed pt-1">{{ item.desc }}</p>
          </div>
        </div>

        <template v-if="fetching">
          <div v-for="n in 3" :key="`skel-${n}`" class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div class="aspect-4/3 bg-gray-200 animate-pulse"></div>
            <div class="p-5 space-y-2">
              <div class="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
              <div class="h-3 bg-gray-200 rounded animate-pulse w-full mt-2"></div>
              <div class="h-3 bg-gray-200 rounded animate-pulse w-4/5"></div>
            </div>
          </div>
        </template>
      </div>

      <div v-else-if="!loading && !fetching" class="flex flex-col items-center justify-center py-24 text-center">
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

  <section class="bg-white border-t border-gray-100 py-10 sm:py-16">
    <div class="max-w-2xl mx-auto px-4 sm:px-8 text-center space-y-5">
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

  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="selectedIndex !== -1 && selectedItem"
        class="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

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

          <template v-if="selectedItem.images.length === 1">
            <div class="grid gap-2 px-6 py-4" :class="selectedItem.images[0].before ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'">
              <div v-if="selectedItem.images[0].before" class="relative group">
                <div class="aspect-4/3 overflow-hidden rounded-xl bg-gray-100">
                  <img
                    :src="selectedItem.images[0].before"
                    :alt="`${selectedItem.title} — before`"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="absolute top-3 left-3">
                  <span class="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow">Before</span>
                </div>
                <button @click.stop="openLightbox(selectedItem.images[0].before, `${selectedItem.title} — before`)" class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 backdrop-blur-sm p-2 rounded-xl text-white focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0 5-5m11 5-5-5m5 5v-4m0 4h-4" /></svg>
                </button>
              </div>
              <div class="relative group" :class="!selectedItem.images[0].before ? 'max-w-lg mx-auto w-full' : ''">
                <div class="aspect-4/3 overflow-hidden rounded-xl bg-gray-100">
                  <img
                    :src="selectedItem.images[0].after"
                    :alt="`${selectedItem.title} — after`"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="absolute top-3 left-3">
                  <span
                    class="text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow"
                    :class="selectedItem.images[0].before ? 'bg-green-500' : 'bg-blue-500'"
                  >
                    {{ selectedItem.images[0].before ? 'After' : 'Fixed' }}
                  </span>
                </div>
                <button @click.stop="openLightbox(selectedItem.images[0].after, `${selectedItem.title} — after`)" class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 backdrop-blur-sm p-2 rounded-xl text-white focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0 5-5m11 5-5-5m5 5v-4m0 4h-4" /></svg>
                </button>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="px-6 py-4 space-y-4">
              <div v-for="(img, i) in selectedItem.images" :key="img.label ?? i">
                <div v-if="img.label" class="pt-1 pb-2 text-xs font-bold text-gray-400 uppercase tracking-widest">{{ img.label }}</div>
                <div class="grid gap-2" :class="img.before ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'">
                  <div v-if="img.before" class="relative group">
                    <div class="aspect-4/3 overflow-hidden rounded-xl bg-gray-100">
                      <img :src="img.before" :alt="`${selectedItem.title} — ${img.label ?? ''} before`" class="w-full h-full object-cover" />
                    </div>
                    <div class="absolute top-3 left-3">
                      <span class="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow">Before</span>
                    </div>
                    <button @click.stop="openLightbox(img.before, `${selectedItem.title} — ${img.label ?? ''} before`)" class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 backdrop-blur-sm p-2 rounded-xl text-white focus:outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0 5-5m11 5-5-5m5 5v-4m0 4h-4" /></svg>
                    </button>
                  </div>
                  <div class="relative group" :class="!img.before ? 'max-w-lg mx-auto w-full' : ''">
                    <div class="aspect-4/3 overflow-hidden rounded-xl bg-gray-100">
                      <img :src="img.after" :alt="`${selectedItem.title} — ${img.label ?? ''} after`" class="w-full h-full object-cover" />
                    </div>
                    <div class="absolute top-3 left-3">
                      <span class="text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow" :class="img.before ? 'bg-green-500' : 'bg-blue-500'">
                        {{ img.before ? 'After' : 'Fixed' }}
                      </span>
                    </div>
                    <button @click.stop="openLightbox(img.after, `${selectedItem.title} — ${img.label ?? ''} after`)" class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 backdrop-blur-sm p-2 rounded-xl text-white focus:outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0 5-5m11 5-5-5m5 5v-4m0 4h-4" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <div class="px-6 py-5">
            <p class="text-gray-600 leading-relaxed">{{ selectedItem.desc }}</p>
          </div>

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

  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="lightboxSrc"
        class="fixed inset-0 z-300 bg-black flex items-center justify-center"
        @click="closeLightbox"
      >
        <img :src="lightboxSrc" :alt="lightboxAlt" class="max-w-full max-h-full object-contain select-none" @click.stop />
        <button @click="closeLightbox" class="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const activeCategory = ref('All')
const selectedIndex = ref(-1)
const loading = ref(true)
const error = ref(null)
const lightboxSrc = ref(null)
const lightboxAlt = ref('')

const categories = ['All', 'Phone', 'Laptop', 'Tablet', 'Desktop']

const repairs = ref([])
const showAfter = reactive({})

const CACHE_KEY = 'repairs_cache'

function applyData(data) {
  repairs.value = data
  data.forEach(r => { showAfter[r._id] = false })
}

const fetching = ref(false)

async function fetchRepairs() {
  if (!repairs.value.length) {
    loading.value = true
  } else {
    fetching.value = true
  }
  error.value = null
  try {
    const res = await fetch('/api/repairs')
    if (!res.ok) throw new Error('Failed to fetch repairs')
    applyData(await res.json())
  } catch (err) {
    if (!repairs.value.length) error.value = err.message
  } finally {
    loading.value = false
    fetching.value = false
  }
}

const filteredRepairs = computed(() =>
  activeCategory.value === 'All'
    ? repairs.value
    : repairs.value.filter(r => r.category === activeCategory.value)
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

function openLightbox(src, alt) {
  lightboxSrc.value = src
  lightboxAlt.value = alt
}

function closeLightbox() {
  lightboxSrc.value = null
  lightboxAlt.value = ''
}

function onKeydown(e) {
  if (e.key === 'Escape') {
    if (lightboxSrc.value) { closeLightbox(); return }
    if (selectedIndex.value !== -1) closeModal()
  }
  if (lightboxSrc.value) return
  if (e.key === 'ArrowLeft') prevItem()
  if (e.key === 'ArrowRight') nextItem()
}

onMounted(() => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      applyData(JSON.parse(cached))
      loading.value = false
    }
  } catch { /* corrupted cache — fall through to fetch */ }

  fetchRepairs()
  window.addEventListener('keydown', onKeydown)
})
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
