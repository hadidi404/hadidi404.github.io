<template>
  <section id="home" class="relative overflow-hidden min-h-screen pt-[80px] flex items-center justify-center
           bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950">

    <div id="page-container" class="max-w-7xl px-5">
      <div class="relative z-10 w-full text-center text-lg font-medium text-gray-200 pb-28">
        <div class="flex flex-col items-center space-y-6">
          <div class="flex items-center gap-2 outline outline-2 outline-white/20 py-2.5 px-4 max-w-[460px]
                  rounded-full text-sm leading-tight bg-white/5 backdrop-blur">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check w-4 h-4 text-blue-300" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>

            <p class="font-xl text-xl text-white/90">Trusted by hundreds of satisfied customers</p>
          </div>

          <h1 class="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-tight text-white">
            Phone, Laptop, and Tech Repair<br />— <span class="bg-linear-to-r from-[#51A2FF] to-[#00D3F2]">Done Right</span>
          </h1>

          <h2 class="text-2xl text-white/75 max-w-4xl leading-normal">  
            Get honest diagnostics and quality repairs for your devices. I take the time<br />
            to assess your tech properly and fix it right, so you can trust your device is<br />
            in good hands.
          </h2>

          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button class="group px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/50 flex items-center justify-center gap-2">
              <span>View Services</span>

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5
                        transition-transform
                        group-hover:translate-x-1" aria-hidden="true">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>


            <button
              class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all border border-white/20 hover:border-white/40">
              Contact Me
            </button>
          </div>

          <div class="grid grid-cols-3 gap-12 max-w-2xl mx-auto pt-10 mt-10 border-t border-white/15">
            <div>
              <div class="text-4xl font-bold text-sky-300 mb-1">7+</div>
              <div class="text-md text-white/70">Years Experience</div>
            </div>
            <div>
              <div class="text-4xl font-bold text-sky-300 mb-1">200+</div>
              <div class="text-md text-white/70">Devices Repaired</div>
            </div>
            <div>
              <div class="text-4xl font-bold text-sky-300 mb-1">98%</div>
              <div class="text-md text-white/70">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- <div class="absolute bottom-0 left-0 w-full leading-none">
      <svg
        class="block w-full h-[90px] md:h-[130px]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1440, 100 
            C1200,120 960,120 720,80 
            C480,40 240,20 0,40 
            L0,120 
            L1440,120 
            Z"
          fill="#ffffff"
        />

      </svg>
    </div> -->
  </section>
</template>

<script setup></script>
<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
  background: linear-gradient(to bottom,
      #020617,
      /* blue-950 */
      #0f172a,
      /* blue-900 */
      #020617);
}

/* grid overlay */
.hero-section::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.2;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.10) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.10) 1px, transparent 1px);
  background-size: 64px 64px;
}
</style>
