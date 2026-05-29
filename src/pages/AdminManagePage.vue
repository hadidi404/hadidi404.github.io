<template>
  <div v-if="!authed" class="min-h-screen bg-gray-100 flex items-center justify-center">
    <form @submit.prevent="checkPassword" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm space-y-4">
      <h1 class="text-lg font-bold text-gray-800">Admin Access</h1>
      <div>
        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Password</label>
        <input
          v-model="passwordInput"
          type="password"
          autofocus
          class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          :class="passwordError ? 'border-red-300 focus:ring-red-300' : ''"
        />
        <p v-if="passwordError" class="mt-1.5 text-xs text-red-500">Incorrect password.</p>
      </div>
      <button type="submit" class="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-500 transition-colors focus:outline-none">
        Enter
      </button>
    </form>
  </div>

  <div v-else class="min-h-screen bg-gray-50">

    <div class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div class="flex items-center gap-3">
        <RouterLink to="/repairs" class="text-sm text-blue-600 hover:underline">Gallery</RouterLink>
        <span class="text-gray-300">/</span>
        <span class="text-sm font-semibold text-gray-800">Manage Repairs</span>
      </div>
      <div class="flex items-center gap-4">
        <RouterLink to="/admin" class="text-sm text-blue-600 hover:underline">+ New Repair</RouterLink>
        <button @click="logout" class="text-xs text-gray-400 hover:text-gray-700 transition-colors focus:outline-none">Log out</button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8">

      <div class="flex items-center justify-between mb-6">
        <p class="text-xs font-bold text-gray-500 uppercase tracking-widest">
          {{ repairs.length }} repair{{ repairs.length !== 1 ? 's' : '' }}
        </p>
        <div class="flex items-center gap-3">
          <span v-if="saveSuccess" class="text-xs text-green-600 font-medium">Order saved!</span>
          <span v-if="saveError" class="text-xs text-red-500">{{ saveError }}</span>
          <button
            @click="saveOrder"
            :disabled="saving"
            class="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ saving ? 'Saving...' : 'Save Order' }}
          </button>
        </div>
      </div>

      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="n in 8" :key="n" class="bg-white rounded-2xl overflow-hidden border border-gray-100">
          <div class="aspect-4/3 bg-gray-200 animate-pulse"></div>
          <div class="p-3 space-y-1.5">
            <div class="h-3.5 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div class="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </div>
      </div>

      <div v-else-if="repairs.length === 0" class="text-center py-16 text-gray-400 text-sm">
        No repairs yet.
        <RouterLink to="/admin" class="text-blue-600 hover:underline">Add one.</RouterLink>
      </div>

      <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" @dragover.prevent>
        <div
          v-for="(repair, i) in repairs"
          :key="repair._id"
          draggable="true"
          @dragstart="dragStart(i)"
          @dragover.prevent="dragOver(i)"
          @dragend="dragEnd"
          class="bg-white rounded-2xl overflow-hidden border cursor-grab active:cursor-grabbing select-none transition-all duration-150"
          :class="dragIndex === i
            ? 'opacity-50 scale-95 shadow-xl border-blue-300'
            : 'border-gray-200 hover:shadow-lg hover:border-gray-300'"
        >
          <div class="relative aspect-4/3 overflow-hidden bg-gray-100">
            <img
              v-if="repair.images[0].before"
              :src="repair.images[0].before"
              :alt="`${repair.title} — before`"
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              :class="showAfter[repair._id] ? 'opacity-0' : 'opacity-100'"
            />
            <img
              :src="repair.images[0].after"
              :alt="`${repair.title} — after`"
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              :class="(!repair.images[0].before || showAfter[repair._id]) ? 'opacity-100' : 'opacity-0'"
            />

            <div class="absolute top-2 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 flex gap-1 items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/>
                <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
                <circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/>
              </svg>
            </div>

            <div class="absolute top-2 left-2 pointer-events-none">
              <span
                class="text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider"
                :class="!repair.images[0].before ? 'bg-blue-500' : showAfter[repair._id] ? 'bg-green-500' : 'bg-orange-500'"
              >
                {{ !repair.images[0].before ? 'Fixed' : showAfter[repair._id] ? 'After' : 'Before' }}
              </span>
            </div>

            <div class="absolute top-2 right-2 pointer-events-none">
              <span class="bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
                {{ repair.category }}
              </span>
            </div>

            <div v-if="repair.images[0].before" class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-0.5 bg-black/50 backdrop-blur-sm rounded-full p-0.5">
              <button
                @click.stop="showAfter[repair._id] = false"
                class="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none"
                :class="!showAfter[repair._id] ? 'bg-white text-gray-900' : 'text-white/70 hover:text-white'"
              >Before</button>
              <button
                @click.stop="showAfter[repair._id] = true"
                class="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none"
                :class="showAfter[repair._id] ? 'bg-white text-gray-900' : 'text-white/70 hover:text-white'"
              >After</button>
            </div>
          </div>

          <div class="px-3 py-2.5 flex items-center justify-between gap-2">
            <div class="min-w-0">
              <p class="text-sm font-bold text-gray-800 truncate leading-snug">{{ repair.title }}</p>
              <p class="text-xs text-blue-500 truncate mt-0.5">{{ repair.device }}</p>
            </div>
            <button
              @click.stop="editRepair(repair)"
              class="shrink-0 text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg transition-colors focus:outline-none"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      <p v-if="repairs.length > 1" class="text-xs text-gray-400 mt-6 text-center">Drag to reorder · Save Order to apply</p>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const savedSecret = sessionStorage.getItem('admin_secret')
const authed = ref(!!savedSecret)
const secret = ref(savedSecret || '')
const passwordInput = ref('')
const passwordError = ref(false)

const repairs = ref([])
const showAfter = reactive({})
const loading = ref(true)
const saving = ref(false)
const saveSuccess = ref(false)
const saveError = ref(null)
const dragIndex = ref(null)

async function checkPassword() {
  try {
    const res = await fetch('/api/repairs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${passwordInput.value}` },
      body: JSON.stringify({ _authCheck: true }),
    })
    if (res.status === 401) {
      passwordError.value = true
      passwordInput.value = ''
    } else {
      secret.value = passwordInput.value
      sessionStorage.setItem('admin_secret', passwordInput.value)
      authed.value = true
      passwordError.value = false
      passwordInput.value = ''
      fetchRepairs()
    }
  } catch {
    passwordError.value = true
  }
}

function logout() {
  sessionStorage.removeItem('admin_secret')
  sessionStorage.removeItem('edit_repair')
  authed.value = false
  secret.value = ''
}

async function fetchRepairs() {
  loading.value = true
  try {
    const res = await fetch('/api/repairs')
    const data = await res.json()
    repairs.value = data
    data.forEach(r => { showAfter[r._id] = false })
  } finally {
    loading.value = false
  }
}

function dragStart(i) {
  dragIndex.value = i
}

function dragOver(i) {
  if (dragIndex.value === null || dragIndex.value === i) return
  const items = [...repairs.value]
  const [moved] = items.splice(dragIndex.value, 1)
  items.splice(i, 0, moved)
  repairs.value = items
  dragIndex.value = i
}

function dragEnd() {
  dragIndex.value = null
}

async function saveOrder() {
  saving.value = true
  saveError.value = null
  try {
    const updates = repairs.value.map((r, i) => ({ _id: r._id, sortOrder: i }))
    const res = await fetch('/api/repairs', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${secret.value}` },
      body: JSON.stringify({ _reorder: true, updates }),
    })
    if (!res.ok) throw new Error('Failed to save order')
    saveSuccess.value = true
    setTimeout(() => { saveSuccess.value = false }, 2000)
  } catch (err) {
    saveError.value = err.message
    setTimeout(() => { saveError.value = null }, 3000)
  } finally {
    saving.value = false
  }
}

function editRepair(repair) {
  sessionStorage.setItem('edit_repair', JSON.stringify(repair))
  router.push('/admin')
}

onMounted(() => {
  if (authed.value) fetchRepairs()
})
</script>
