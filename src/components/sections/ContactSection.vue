<template>
  <section id="contact" class="flex flex-col items-center justify-center">
    <div class="mx-auto w-full max-w-5xl px-4 sm:px-8 space-y-4 sm:space-y-6 py-8 sm:py-20">

      <div v-animate class="flex flex-col space-y-4 justify-center items-center">
        <SectionTitle
          badge="LET'S CONNECT"
          title="Get In Touch"
          subtitle="Ready to get your device repaired? Reach out for a quick assessment"
        />
      </div>
      <div v-animate="150"
        class="flex flex-col items-center justify-center w-full shadow-2xl rounded-3xl p-4 sm:p-12 border border-gray-200 bg-white/8 space-y-3 sm:space-y-4 bg-linear-to-br from-white to-[#F9FAFB]">
        <div class="w-fit flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 bg-[#155DFC] rounded-full gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send w-4 h-4 sm:w-5 sm:h-5 shrink-0"
            aria-hidden="true">
            <path
              d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z">
            </path>
            <path d="m21.854 2.147-10.94 10.939"></path>
          </svg>
          <p class="text-sm sm:text-base text-white">Message me for assessment</p>
        </div>
        <p class="text-sm sm:text-base text-gray-600">I'll get back to you as soon as possible with an honest diagnosis</p>
        <div class="w-full flex flex-col gap-3 sm:gap-7">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 w-full">
            <a href="tel:+639489851500" target="_blank" rel="noopener noreferrer"
              class="group flex items-center gap-4 p-4 sm:p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-500 transition-[box-shadow,border-color] duration-700 ease-in-out hover:shadow-lg">
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 bg-[#DBEAFE] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-phone w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover:text-white transition-colors"
                  aria-hidden="true">
                  <path
                    d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384">
                  </path>
                </svg>
              </div>
              <div class="flex flex-col items-start">
                <div class="text-sm font-semibold text-gray-600 mb-1">Call or Text</div>
                <div class="text-base sm:text-lg font-bold text-gray-900">0948 985 1500</div>
                <div class="text-sm text-gray-500 mt-1">Available 9AM - 6PM</div>
              </div>
            </a>
            <a href="https://www.messenger.com/t/941767919020399" target="_blank" rel="noopener noreferrer"
              class="group flex items-center gap-4 p-4 sm:p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-500 transition-[box-shadow,border-color] duration-700 ease-in-out hover:shadow-lg">
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 bg-[#DBEAFE] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-message-circle w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover:text-white transition-colors"
                  aria-hidden="true">
                  <path
                    d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719">
                  </path>
                </svg>
              </div>
              <div class="flex flex-col items-start">
                <div class="text-sm font-semibold text-gray-600 mb-1">Messenger</div>
                <div class="text-base sm:text-lg font-bold text-gray-900">Send Message</div>
                <div class="text-sm text-gray-500 mt-1">Usually replies in minutes</div>
              </div>
            </a>
          </div>
          <div class="w-full text-center bg-[#FEFCE8] rounded-xl p-4 border border-[#FFF085]">
            <p class="text-sm text-gray-700"><span class="font-semibold text-gray-900">💡 Tip:</span> Include your device
              model and issue description for faster assessment</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import SectionTitle from '../ui/SectionTitle.vue'
</script>
