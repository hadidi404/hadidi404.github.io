<template>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
    <div
      v-for="(item, index) in services"
      :key="index"
      class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
    >
      <!-- Image -->
      <div class="aspect-4/3 overflow-hidden relative">
        <img
          :src="item.pic"
          :alt="item.desc"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        <div class="absolute top-4 left-4">
          <span
            class="bg-blue-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-lg"
          >
            {{ item.title }}
          </span>
        </div>
      </div>

      <div class="p-5">
        <p class="text-gray-700 text-left text-base leading-relaxed">
          {{ item.desc }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const services = [
  {
    "title": "Screen Repair",
    "desc": "iPhone screen replacement - restored like new",
    "pic": "https://images.unsplash.com/photo-1731391747600-4d0f478b2184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "title": "Battery Service",
    "desc": "Samsung battery swelling fix - safely resolved",
    "pic": "https://images.unsplash.com/photo-1735875530804-d661ca2001da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "title": "Hardware Upgrade",
    "desc": "MacBook Pro SSD upgrade - performance boost",
    "pic": "https://images.unsplash.com/photo-1709102884400-b50ca1a12bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "title": "Port Repair",
    "desc": "Tablet charging port repair - fully functional",
    "pic": "https://images.unsplash.com/photo-1735964366700-9eedefcf0065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "title": "Board Repair",
    "desc": "Laptop motherboard repair - brought back to life",
    "pic": "https://images.unsplash.com/photo-1560165143-fa7e2d9e594c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    "title": "Maintenance",
    "desc": "Desktop PC cleaning & optimization - runs like new",
    "pic": "https://images.unsplash.com/photo-1768633647910-7e6fb53e5b0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
  }
]

</script>

<style scoped></style>
