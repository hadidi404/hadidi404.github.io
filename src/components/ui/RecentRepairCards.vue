<template>
  <div class="sm:hidden">
    <div class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth px-1">
      <div
        v-for="(item, index) in services"
        :key="index"
        class="snap-start shrink-0 w-[78%] group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
      >
        <div class="aspect-4/3 overflow-hidden relative">
          <img
            :src="item.pic"
            :alt="item.desc"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            loading="lazy"
            decoding="async"
          />
          <div class="absolute top-3 left-3">
            <span class="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
              {{ item.title }}
            </span>
          </div>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-left text-sm leading-relaxed">{{ item.desc }}</p>
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
      v-for="(item, index) in visibleServices"
      :key="index"
      v-animate="index * 100"
      class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-[box-shadow,border-color] duration-700 ease-in-out border border-gray-100 hover:border-blue-200"
    >
      <div class="aspect-4/3 overflow-hidden relative">
        <img
          :src="item.pic"
          :alt="item.desc"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          loading="lazy"
          decoding="async"
        />
        <div class="absolute top-4 left-4">
          <span class="bg-blue-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-lg">
            {{ item.title }}
          </span>
        </div>
      </div>
      <div class="p-5">
        <p class="text-gray-700 text-left text-base leading-relaxed">{{ item.desc }}</p>
      </div>
    </div>

    <RouterLink
      to="/repairs"
      v-animate="visibleServices.length * 100"
      class="group flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-blue-200 bg-linear-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 hover:border-blue-400 transition-all duration-500 min-h-50 p-8 text-center"
    >
      <div class="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h8" />
        </svg>
      </div>
      <div>
        <p class="font-bold text-gray-900 text-lg">View All Repairs</p>
        <p class="text-sm text-gray-500 mt-1">{{ services.length }}+ before &amp; after photos</p>
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

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const services = [
  {
    title: 'Screen Repair',
    desc: 'iPhone screen replacement - restored like new',
    pic: 'https://images.unsplash.com/photo-1731391747600-4d0f478b2184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    title: 'Battery Service',
    desc: 'Samsung battery swelling fix - safely resolved',
    pic: 'https://images.unsplash.com/photo-1735875530804-d661ca2001da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    title: 'Hardware Upgrade',
    desc: 'MacBook Pro SSD upgrade - performance boost',
    pic: 'https://images.unsplash.com/photo-1709102884400-b50ca1a12bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    title: 'Port Repair',
    desc: 'Tablet charging port repair - fully functional',
    pic: 'https://images.unsplash.com/photo-1735964366700-9eedefcf0065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    title: 'Board Repair',
    desc: 'Laptop motherboard repair - brought back to life',
    pic: 'https://images.unsplash.com/photo-1560165143-fa7e2d9e594c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    title: 'Maintenance',
    desc: 'Desktop PC cleaning & optimization - runs like new',
    pic: 'https://images.unsplash.com/photo-1768633647910-7e6fb53e5b0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
  }
]

const visibleServices = computed(() => services.slice(0, 5))
</script>
