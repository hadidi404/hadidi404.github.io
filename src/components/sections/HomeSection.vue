<template>
  <section class="min-h-[80vh] flex items-center justify-center">
    <div class="w-full text-center text-lg font-medium text-gray-600">
      <div class="flex flex-col items-center space-y-6">

        <div class="flex items-center gap-2 outline outline-2 outline-gray-300 py-2.5 px-4 max-w-[460px] rounded-full text-sm leading-tight">
          <!-- Check icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-green-600 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>

          <!-- Text pill -->
          <p class="text-xl">
            Trusted by hundreds of satisfied customers
          </p>
        </div>


        <h1
          class="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-tight"
        >
          Phone, Laptop, and Tech Repair<br />— Done Right
        </h1>

        <h2 class="text-2xl">
          Get honest diagnostics and quality repairs for your devices. I take
          the time<br />to assess your tech properly and fix it right, so you
          can trust your device is<br />in good hands.
        </h2>

        <div class="flex justify-center gap-4 pt-2">
          <button
            class="h-15 w-50 rounded-2xl bg-black text-white font-semibold transition hover:opacity-90"
          >
            View Services
          </button>

          <button
            class="h-15 w-50 rounded-2xl border border-gray-300 font-semibold transition hover:bg-gray-50"
          >
            Contact Me
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>
