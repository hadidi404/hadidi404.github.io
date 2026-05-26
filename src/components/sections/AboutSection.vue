<template>
  <section id="about">
   <div class="mx-auto max-w-7xl px-4 sm:px-8 py-12 sm:py-20">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 items-start">

      <div v-animate class="flex flex-col space-y-2 order-1 lg:col-start-1 lg:row-start-1">
        <p class="w-fit rounded-full px-5 py-2 bg-blue-200 text-sm sm:text-base font-semibold">
          GET TO KNOW ME
        </p>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-left">About Me</h2>
      </div>

      <div v-animate="150" class="flex items-center justify-center py-6 lg:py-10 order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
        <div class="relative">
          <div class="ripple-ring absolute inset-0 rounded-full border-2 border-blue-300"></div>
          <div class="ripple-ring ripple-ring-2 absolute inset-0 rounded-full border-2 border-blue-200"></div>
          <div class="ripple-ring ripple-ring-3 absolute inset-0 rounded-full border-2 border-cyan-200"></div>

          <div class="absolute inset-0 rounded-full bg-linear-to-br from-blue-300 to-cyan-300 opacity-20 blur-xl scale-110"></div>

          <a @click.prevent="scrollToContact" href="#" class="block relative w-55 h-55 sm:w-72 sm:h-72 lg:w-88 lg:h-88 rounded-full overflow-hidden shadow-2xl border-4 border-white cursor-pointer group">
            <img
              class="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 group-hover:opacity-0"
              src="/about.jpg"
              alt="Rayson — tech repair professional"
              loading="lazy"
              decoding="async"
            />
            <img
              class="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              src="/sunglass.png"
              alt="Rayson with sunglasses"
              loading="lazy"
              decoding="async"
            />
          </a>

          <div class="absolute -bottom-4 -right-6 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-2.5 flex items-center gap-2">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
            </span>
            <div class="text-left">
              <div class="text-xs font-bold text-gray-900">Available Now</div>
              <div class="text-xs text-gray-400">Ready to help</div>
            </div>
          </div>
        </div>
      </div>

      <div v-animate="100" class="flex flex-col space-y-5 order-3 lg:col-start-1 lg:row-start-2">
        <div class="rounded-2xl py-6 px-5 sm:py-8 sm:px-7 text-left space-y-4 text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 border-gray-100 border-2 shadow-sm">
          <p>
            Hi, I'm Rayson. I've been repairing phones, laptops, and electronics for several years,
            and I take pride in doing careful, reliable work.
          </p>

          <p>
            I started fixing devices because I wanted to help people save money and extend the life
            of their tech. I know how frustrating it can be when something stops working.
          </p>

          <p>
            Every device I work on gets my full attention. I don't rush repairs, and I always test
            everything thoroughly before returning it to you.
          </p>

          <p>
            Whether it's a cracked screen, a slow laptop, or something more complicated,
            I'm here to help.
          </p>
        </div>
        <AboutCard />
      </div>

    </div>
  </div>

  </section>
</template>

<script setup>
import AboutCard from '../ui/AboutCard.vue'

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
@keyframes ripple {
  0%   { transform: scale(1);    opacity: 0.5; }
  100% { transform: scale(1.55); opacity: 0; }
}
.ripple-ring   { animation: ripple 2.8s ease-out infinite; }
.ripple-ring-2 { animation: ripple 2.8s ease-out infinite 0.9s; }
.ripple-ring-3 { animation: ripple 2.8s ease-out infinite 1.8s; }
</style>
