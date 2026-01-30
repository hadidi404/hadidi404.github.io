<template>
  <section id="about">
   <div class="mx-auto max-w-7xl px-4">
    <div class="w-full grid lg:grid-cols-2 items-center gap-12">

      <!-- LEFT COLUMN -->
      <div class="flex flex-col space-y-5 text-sm">
        <p class="w-fit rounded-full px-5 py-2 bg-blue-200 text-lg font-semibold">
          GET TO KNOW ME
        </p>

        <h1 class="text-5xl font-bold text-left">About Me</h1>

        <div class="rounded-2xl border py-8 px-7 text-left space-y-4 text-lg leading-8 border border-gray-100 border-2 shadow-sm">
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

      <!-- RIGHT COLUMN -->
      <div class="items-center">
        <img
          class="rounded-2xl w-full object-cover"
          src="https://images.unsplash.com/photo-1768633647910-7e6fb53e5b0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Tech repair professional"
        />
      </div>
      <div class="h-50"></div> 
    </div>
  </div>

  </section>
</template>

<script setup>
  import AboutCard from '../ui/AboutCard.vue';
</script>

<style scoped>
</style>
