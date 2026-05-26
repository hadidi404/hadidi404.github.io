<template>
  <section id="home" class="hero relative overflow-hidden min-h-screen flex items-center justify-center py-28">

    <div class="dot-grid absolute inset-0 pointer-events-none"></div>

    <div class="absolute -top-32 -right-32 w-175 h-175 rounded-full bg-blue-600/30 blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-0 -left-32 w-125 h-125 rounded-full bg-indigo-600/25 blur-[100px] pointer-events-none"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-75 rounded-full bg-cyan-700/20 blur-[80px] pointer-events-none"></div>

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 w-full text-center">
      <div class="flex flex-col items-center space-y-6">

        <div v-animate class="w-fit flex items-center gap-2 border border-blue-500/30 py-2.5 px-5 rounded-full text-sm bg-blue-900/40">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
          <p class="text-[14px] font-medium text-blue-300">Trusted by hundreds of satisfied customers</p>
        </div>

        <h1 v-animate="100" class="font-bold text-[40px] sm:text-4xl md:text-6xl lg:text-6xl leading-tight text-white">
          Phone, Laptop &amp; Electronics Repair
          <span class="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400 whitespace-nowrap">
            — Done Right
          </span>
        </h1>

        <p v-animate="200" class="text-lg text-slate-400 max-w-xl leading-relaxed">
          Honest diagnostics and quality repairs for all your devices.
          Fixed right the first time, with no upselling and no guesswork.
        </p>

        <div v-animate="300" class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="scrollToSection('services')"
            class="group px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all
                   shadow-lg shadow-blue-900/50
                   flex items-center justify-center gap-2 font-medium text-sm sm:text-base">
            View Services
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
          <button
            @click="scrollToSection('contact')"
            class="px-6 py-3 sm:px-8 sm:py-4 bg-white/10 text-white rounded-xl hover:bg-white/20
                   transition-all border border-white/20 hover:border-white/30 font-medium text-sm sm:text-base">
            Contact Me
          </button>
        </div>

        <div v-animate="400" class="grid grid-cols-3 gap-4 sm:gap-12 max-w-xl mx-auto pt-10 mt-4 border-t border-white/10">
          <div>
            <div class="text-2xl sm:text-4xl font-bold text-white">7<span class="text-blue-400">+</span></div>
            <div class="text-xs sm:text-sm text-slate-400 mt-1 uppercase tracking-wide">Years Exp.</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-bold text-white">200<span class="text-blue-400">+</span></div>
            <div class="text-xs sm:text-sm text-slate-400 mt-1 uppercase tracking-wide">Repaired</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-bold text-white">98<span class="text-blue-400">%</span></div>
            <div class="text-xs sm:text-sm text-slate-400 mt-1 uppercase tracking-wide">Success Rate</div>
          </div>
        </div>

      </div>
    </div>

    <div class="absolute bottom-0 left-0 w-full leading-none pointer-events-none">
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
        <path
          d="M0 60L60 54C120 48 240 36 360 32C480 28 600 32 720 36C840 40 960 40 1080 38C1200 36 1320 32 1380 30L1440 28V60H0Z"
          fill="#f8fafc"></path>
      </svg>
    </div>
  </section>
</template>

<script setup>
function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #1e3a6e 0%, #152a50 100%);
}

.dot-grid {
  background-image: radial-gradient(circle, rgba(148, 163, 184, 0.12) 1px, transparent 1px);
  background-size: 28px 28px;
}
</style>
