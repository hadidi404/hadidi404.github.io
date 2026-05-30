<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const links = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Repairs', id: 'recent-repairs' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' }
]

const routeLinks = [
  { label: 'Gallery', path: '/repairs' }
]

const menuOpen = ref(false)
const activeSection = ref('home')
const navVisible = ref(true)
const route = useRoute()
const router = useRouter()

let scrollHandler = null
let lastScrollY = 0

onMounted(() => {
  scrollHandler = () => {
    const scrollY = window.scrollY

    const isMobile = window.innerWidth < 768
    navVisible.value = !isMobile || scrollY < lastScrollY || scrollY < 80
    if (menuOpen.value && !navVisible.value) menuOpen.value = false
    lastScrollY = scrollY

    const offsetY = scrollY + 80
    let current = links[0].id
    for (const { id } of links) {
      const el = document.getElementById(id)
      if (el && el.offsetTop <= offsetY) current = id
    }
    activeSection.value = current
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })
  scrollHandler()
})

onBeforeUnmount(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})

function scrollTo(id) {
  menuOpen.value = false
  router.push({ path: '/', hash: '#' + id })
}

function navigateTo(path) {
  menuOpen.value = false
  router.push(path)
}
</script>

<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 bg-white/85 backdrop-blur-md border-b border-gray-200/60 shadow-sm transition-transform duration-300"
    :class="navVisible ? 'translate-y-0' : '-translate-y-full'"
  >
    <div class="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 sm:px-8">

      <div class="font-bold text-xl text-blue-600">
        Rayson Tech Services
      </div>

      <div class="hidden md:flex gap-6">
        <button
          v-for="l in links"
          :key="l.id"
          @click="scrollTo(l.id)"
          :class="[
            'text-base font-medium transition-colors duration-200 focus:outline-none',
            route.path === '/' && activeSection === l.id
              ? 'text-blue-600 font-semibold'
              : 'text-gray-600 hover:text-blue-600'
          ]"
        >
          {{ l.label }}
        </button>
        <button
          v-for="l in routeLinks"
          :key="l.path"
          @click="router.push(l.path)"
          :class="[
            'text-base font-medium transition-colors duration-200 focus:outline-none',
            route.path === l.path
              ? 'text-blue-600 font-semibold'
              : 'text-gray-600 hover:text-blue-600'
          ]"
        >
          {{ l.label }}
        </button>
      </div>

      <button
        class="md:hidden p-2 text-gray-600 focus:outline-none"
        @click="menuOpen = !menuOpen"
        aria-label="Toggle menu"
      >
        <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div v-if="menuOpen" class="md:hidden bg-white border-t border-gray-100 px-8 pb-4 flex flex-col">
      <button
        v-for="l in links"
        :key="l.id"
        @click="scrollTo(l.id)"
        :class="[
          'text-left py-3 text-base font-medium border-b border-gray-100 focus:outline-none transition-colors duration-200',
          route.path === '/' && activeSection === l.id
            ? 'text-blue-600 font-semibold'
            : 'text-gray-600 hover:text-blue-600'
        ]"
      >
        {{ l.label }}
      </button>
      <button
        v-for="l in routeLinks"
        :key="l.path"
        @click="navigateTo(l.path)"
        :class="[
          'text-left py-3 text-base font-medium border-b border-gray-100 last:border-0 focus:outline-none transition-colors duration-200',
          route.path === l.path
            ? 'text-blue-600 font-semibold'
            : 'text-gray-600 hover:text-blue-600'
        ]"
      >
        {{ l.label }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
button:focus,
button:focus-visible {
  outline: none;
  box-shadow: none;
}
</style>
