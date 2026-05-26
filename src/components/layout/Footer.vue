<template>
  <footer class="relative bg-[#101828] overflow-hidden">
    <div class="absolute w-full top-0 left-0 h-1 bg-linear-to-r from-[#155DFC] via-[#00B8DB] to-[#155DFC]"></div>
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-8 text-white">
      <div class="grid grid-cols-1 sm:grid-cols-3 items-start text-left mb-8 gap-8 w-full">
        <div>
          <div class="text-xl font-bold bg-linear-to-r from-[#51A2FF] to-[#00D3F2] bg-clip-text text-transparent mb-3">
            Rayson Tech Services
          </div>
          <p class="text-sm text-gray-300">Professional tech repair services for phones, laptops, and electronics. Quality repairs you can trust.</p>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:contents">
          <div class="flex flex-col">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Quick Links</h3>
            <nav>
              <ul class="space-y-2 text-sm text-gray-300">
                <li v-for="l in links" :key="l.id">
                  <button @click="scrollTo(l.id)" class="hover:text-white transition-colors focus:outline-none">
                    {{ l.label }}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div class="justify-self-center sm:justify-self-auto">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Contact</h3>
            <nav>
              <ul class="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="tel:+639489851500" class="flex items-center gap-2 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true">
                      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                    </svg>
                    <span>+63 948 985 1500</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:raysonbarnachia@gmail.com" class="flex items-center gap-2 min-w-0 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true">
                      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    </svg>
                    <span class="truncate">raysonbarnachia@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/profile.php?id=61586072831234&sk=about" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                    <span>Follow on Facebook</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div class="border-t text-gray-400 border-gray-700 text-center text-xs pt-8">
        <p>© 2026 <span class="text-white font-bold">Rayson Tech Services</span>. All rights reserved.</p>
        <p>Serving Baguio City, Benguet & Infanta, Pangasinan</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const links = [
  { label: 'Services', id: 'services' },
  { label: 'Our Work', id: 'recent-repairs' },
  { label: 'About Me', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

const route = useRoute()
const router = useRouter()

async function scrollTo(id) {
  if (route.path !== '/') {
    await router.push('/')
    await nextTick()
  }
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
