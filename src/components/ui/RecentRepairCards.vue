<template>
  <div v-if="loading">
    <div class="sm:hidden flex gap-4 overflow-x-auto pb-4 px-1">
      <div v-for="n in 3" :key="n" class="snap-start shrink-0 w-[78%] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div class="aspect-4/3 bg-gray-200 animate-pulse"></div>
        <div class="p-4 space-y-2">
          <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div class="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
          <div class="h-3 bg-gray-200 rounded animate-pulse w-full mt-1"></div>
          <div class="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
        </div>
      </div>
    </div>
    <div class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      <div v-for="n in 3" :key="n" class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div class="aspect-4/3 bg-gray-200 animate-pulse"></div>
        <div class="p-5 space-y-2">
          <div class="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          <div class="h-3 bg-gray-200 rounded animate-pulse w-full mt-2"></div>
          <div class="h-3 bg-gray-200 rounded animate-pulse w-4/5"></div>
        </div>
      </div>
    </div>
  </div>

  <template v-else-if="repairs.length">
    <div class="sm:hidden">
      <div class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth px-1">
        <div
          v-for="item in repairs"
          :key="item._id"
          @click="$router.push('/repairs')"
          class="snap-start shrink-0 w-[78%] group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
        >
          <div class="relative aspect-4/3 overflow-hidden bg-gray-100">
            <img
              v-if="item.images[0].before"
              :src="item.images[0].before"
              :alt="`${item.title} — before`"
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              :class="showAfter[item._id] ? 'opacity-0' : 'opacity-100'"
            />
            <img
              :src="item.images[0].after"
              :alt="`${item.title} — after`"
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              :class="(!item.images[0].before || showAfter[item._id]) ? 'opacity-100' : 'opacity-0'"
            />

            <div class="absolute top-3 left-3 pointer-events-none">
              <span
                class="text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
                :class="!item.images[0].before ? 'bg-blue-500' : showAfter[item._id] ? 'bg-green-500' : 'bg-orange-500'"
              >
                {{ !item.images[0].before ? 'Fixed' : showAfter[item._id] ? 'After' : 'Before' }}
              </span>
            </div>

            <div class="absolute top-3 right-3 pointer-events-none">
              <span class="bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                {{ item.category }}
              </span>
            </div>

            <div v-if="item.images[0].before" class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 bg-black/50 backdrop-blur-sm rounded-full p-1">
              <button
                @click.stop="showAfter[item._id] = false"
                class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none"
                :class="!showAfter[item._id] ? 'bg-white text-gray-900' : 'text-white/70 hover:text-white'"
              >Before</button>
              <button
                @click.stop="showAfter[item._id] = true"
                class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none"
                :class="showAfter[item._id] ? 'bg-white text-gray-900' : 'text-white/70 hover:text-white'"
              >After</button>
            </div>
          </div>

          <div class="p-4">
            <h3 class="font-bold text-gray-900 text-base leading-snug">{{ item.title }}</h3>
            <p class="text-sm font-medium text-blue-600 mt-0.5">{{ item.device }}</p>
            <p class="text-sm text-gray-500 leading-relaxed pt-1 line-clamp-2">{{ item.desc }}</p>
          </div>
        </div>
      </div>

      <RouterLink
        to="/repairs"
        class="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-blue-200 text-blue-600 font-medium text-sm hover:bg-blue-50 transition-colors"
      >
        View All Repairs
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </RouterLink>
    </div>

    <div class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      <div
        v-for="(item, index) in visibleRepairs"
        :key="item._id"
        v-animate="index * 100"
        @click="$router.push('/repairs')"
        class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-blue-100 cursor-pointer group"
      >
        <div class="relative aspect-4/3 overflow-hidden bg-gray-100">
          <img
            v-if="item.images[0].before"
            :src="item.images[0].before"
            :alt="`${item.title} — before`"
            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            :class="showAfter[item._id] ? 'opacity-0' : 'opacity-100'"
          />
          <img
            :src="item.images[0].after"
            :alt="`${item.title} — after`"
            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            :class="(!item.images[0].before || showAfter[item._id]) ? 'opacity-100' : 'opacity-0'"
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
              class="text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
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
            >Before</button>
            <button
              @click.stop="showAfter[item._id] = true"
              class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none"
              :class="showAfter[item._id] ? 'bg-white text-gray-900' : 'text-white/70 hover:text-white'"
            >After</button>
          </div>
        </div>

        <div class="p-5 space-y-1.5">
          <h3 class="font-bold text-gray-900 text-lg leading-snug">{{ item.title }}</h3>
          <p class="text-sm font-medium text-blue-600">{{ item.device }}</p>
          <p class="text-sm text-gray-500 leading-relaxed pt-1">{{ item.desc }}</p>
        </div>
      </div>

      <RouterLink
        to="/repairs"
        v-animate="visibleRepairs.length * 100"
        class="group flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-blue-200 bg-linear-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 hover:border-blue-400 transition-all duration-500 min-h-50 p-8 text-center"
      >
        <div class="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h8" />
          </svg>
        </div>
        <div>
          <p class="font-bold text-gray-900 text-lg">View All Repairs</p>
          <p class="text-sm text-gray-500 mt-1">{{ repairs.length }}+ before &amp; after photos</p>
        </div>
        <div class="flex items-center gap-1.5 text-blue-600 text-sm font-medium group-hover:gap-3 transition-all duration-300">
          Browse gallery
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </RouterLink>
    </div>
  </template>

  <div v-else class="text-center py-12 text-gray-400 text-sm">No repairs yet.</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const CACHE_KEY = 'repairs_cache'

const repairs = ref([])
const showAfter = reactive({})
const loading = ref(true)

const visibleRepairs = computed(() => repairs.value.slice(0, 5))

function applyData(data) {
  repairs.value = data
  data.forEach(r => { showAfter[r._id] = false })
}

onMounted(async () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      applyData(JSON.parse(cached))
      loading.value = false
    }
  } catch { /* corrupted cache — fall through to fetch */ }

  try {
    const res = await fetch('/api/repairs')
    if (!res.ok) throw new Error()
    const data = await res.json()
    applyData(data)
    localStorage.setItem(CACHE_KEY, JSON.stringify(data.slice(0, 5)))
  } catch {
    //
  } finally {
    loading.value = false
  }
})
</script>
