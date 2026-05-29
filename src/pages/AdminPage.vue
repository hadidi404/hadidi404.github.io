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

  <div v-else class="min-h-screen bg-gray-100">

    <div class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div class="flex items-center gap-3">
        <RouterLink to="/repairs" class="text-sm text-blue-600 hover:underline">Gallery</RouterLink>
        <span class="text-gray-300">/</span>
        <RouterLink to="/admin/manage" class="text-sm text-blue-600 hover:underline">Manage</RouterLink>
        <span class="text-gray-300">/</span>
        <span class="text-sm font-semibold text-gray-800">{{ editId ? 'Edit Repair' : 'New Repair' }}</span>
      </div>
      <button @click="logout" class="text-xs text-gray-400 hover:text-gray-700 transition-colors focus:outline-none">Log out</button>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-[1fr_340px] gap-8 items-start">

      <div class="space-y-6">

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 class="text-base font-bold text-gray-800 mb-2">Repair Info</h2>

          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Title</label>
              <input v-model="form.title" type="text" placeholder="e.g. Screen Replacement"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Device</label>
              <input v-model="form.device" type="text" placeholder="e.g. iPhone 14 Pro"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Category</label>
              <select v-model="form.category"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
                <option v-for="cat in categories" :key="cat">{{ cat }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Description</label>
              <input v-model="form.desc" type="text" placeholder="Short summary of the repair"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h2 class="text-base font-bold text-gray-800">Image Pairs</h2>

          <div
            v-for="(pair, i) in form.images"
            :key="i"
            class="border border-gray-200 rounded-xl p-4 space-y-3"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-gray-500 uppercase tracking-wide">Pair {{ i + 1 }}</span>
              <button
                v-if="form.images.length > 1"
                @click="removePair(i)"
                class="text-xs text-red-400 hover:text-red-600 transition-colors focus:outline-none"
              >Remove</button>
            </div>

            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Label <span class="normal-case font-normal text-gray-400">(optional — e.g. Screen, Frame)</span></label>
              <input v-model="pair.label" type="text" placeholder="Pair label"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="text-xs font-semibold text-orange-500 uppercase tracking-wide">Before</label>
                  <label class="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer select-none">
                    <input type="checkbox" :checked="pair.before === false" @change="toggleNoBefore(i, $event)" class="rounded" />
                    No before photo
                  </label>
                </div>
                <div
                  v-if="pair.before === false"
                  class="aspect-4/3 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center text-xs text-gray-400"
                >
                  Skipped
                </div>
                <label v-else :for="`before-${i}`" class="block cursor-pointer">
                  <div
                    class="aspect-4/3 rounded-xl overflow-hidden border-2 transition-colors"
                    :class="pair.before ? 'border-orange-200' : 'border-dashed border-gray-200 bg-gray-50 hover:border-blue-300'"
                  >
                    <img v-if="pair.before" :src="pair.before" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex flex-col items-center justify-center gap-1.5 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.338-2.32 5.25 5.25 0 0 1 1.13 10.392" />
                      </svg>
                      <span class="text-xs font-medium">Upload before</span>
                    </div>
                  </div>
                  <input :id="`before-${i}`" type="file" accept="image/*" class="hidden" @change="onFileSelect(i, 'before', $event)" />
                </label>
                <button v-if="pair.before && pair.before !== false" @click.prevent="clearImage(i, 'before')" class="mt-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors">Clear</button>
              </div>

              <div>
                <label class="block text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">After</label>
                <label :for="`after-${i}`" class="block cursor-pointer">
                  <div
                    class="aspect-4/3 rounded-xl overflow-hidden border-2 transition-colors"
                    :class="pair.after ? 'border-green-200' : 'border-dashed border-gray-200 bg-gray-50 hover:border-blue-300'"
                  >
                    <img v-if="pair.after" :src="pair.after" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex flex-col items-center justify-center gap-1.5 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.338-2.32 5.25 5.25 0 0 1 1.13 10.392" />
                      </svg>
                      <span class="text-xs font-medium">Upload after</span>
                    </div>
                  </div>
                  <input :id="`after-${i}`" type="file" accept="image/*" class="hidden" @change="onFileSelect(i, 'after', $event)" />
                </label>
                <button v-if="pair.after" @click.prevent="clearImage(i, 'after')" class="mt-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors">Clear</button>
              </div>
            </div>
          </div>

          <button
            @click="addPair"
            class="w-full py-2.5 rounded-xl border-2 border-dashed border-gray-200 text-sm font-medium text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors focus:outline-none"
          >
            + Add Image Pair
          </button>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div v-if="submitSuccess" class="mb-4 text-sm text-green-600 font-medium bg-green-50 rounded-xl px-4 py-3">
            {{ editId ? 'Repair updated!' : 'Repair saved successfully!' }}
          </div>
          <div v-if="submitError" class="mb-4 text-sm text-red-600 font-medium bg-red-50 rounded-xl px-4 py-3">
            {{ submitError }}
          </div>

          <div class="flex items-center gap-3 flex-wrap">
            <button
              @click="submit"
              :disabled="submitting || !canSubmit"
              class="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-500 transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {{ submitting ? 'Saving...' : editId ? 'Update Repair' : 'Publish Repair' }}
            </button>
            <button
              v-if="editId"
              @click="deleteRepair"
              :disabled="submitting"
              class="px-6 py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl font-semibold text-sm hover:bg-red-100 transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete
            </button>
            <button
              v-if="editId"
              @click="resetForm"
              class="px-4 py-3 text-sm text-gray-500 hover:text-gray-800 transition-colors focus:outline-none"
            >
              Cancel
            </button>
            <span v-if="!canSubmit && !editId" class="text-xs text-gray-400">Fill in title, device, and at least one after image.</span>
          </div>
        </div>

      </div>

      <div class="space-y-4 lg:sticky lg:top-20">
        <p class="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Live Preview</p>

        <div class="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 pointer-events-none select-none">
          <div class="relative aspect-4/3 overflow-hidden bg-gray-100">
            <img
              v-if="previewFirstPair.before && !previewShowAfter"
              :src="previewFirstPair.before"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <img
              v-if="previewFirstPair.after"
              :src="previewFirstPair.after"
              class="absolute inset-0 w-full h-full object-cover"
              :class="(!previewFirstPair.before || previewShowAfter) ? 'opacity-100' : 'opacity-0'"
            />
            <div v-if="!previewFirstPair.before && !previewFirstPair.after" class="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-300 text-xs">
              No image yet
            </div>

            <div class="absolute top-3 left-3">
              <span
                class="text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
                :class="!previewFirstPair.before ? 'bg-blue-500' : previewShowAfter ? 'bg-green-500' : 'bg-orange-500'"
              >
                {{ !previewFirstPair.before ? 'Fixed' : previewShowAfter ? 'After' : 'Before' }}
              </span>
            </div>
            <div class="absolute top-3 right-3 flex flex-col items-end gap-1.5">
              <span class="bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                {{ form.category || 'Phone' }}
              </span>
              <span v-if="form.images.length > 1" class="bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                {{ form.images.length }} fixes
              </span>
            </div>

            <div v-if="previewFirstPair.before" class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 bg-black/50 backdrop-blur-sm rounded-full p-1 pointer-events-auto">
              <button
                @click="previewShowAfter = false"
                class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none"
                :class="!previewShowAfter ? 'bg-white text-gray-900' : 'text-white/70'"
              >Before</button>
              <button
                @click="previewShowAfter = true"
                class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none"
                :class="previewShowAfter ? 'bg-white text-gray-900' : 'text-white/70'"
              >After</button>
            </div>
          </div>

          <div class="p-5 space-y-1">
            <h3 class="font-bold text-gray-900 text-lg leading-snug">{{ form.title || 'Repair Title' }}</h3>
            <p class="text-sm font-medium text-blue-600">{{ form.device || 'Device Name' }}</p>
            <p class="text-sm text-gray-500 leading-relaxed pt-1">{{ form.desc || 'Description will appear here.' }}</p>
          </div>
        </div>

        <p class="text-xs text-gray-400 px-1">Toggle Before/After above to test the card. The full modal view will match the gallery.</p>
      </div>

    </div>

    <Teleport to="body">
      <div
        v-if="cropModal"
        class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-2xl shadow-2xl flex flex-col w-full max-w-2xl max-h-[90vh]">
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <p class="font-semibold text-gray-800 text-sm">Crop Image</p>
              <p class="text-xs text-gray-400 mt-0.5">Drag to adjust. 4:3 ratio is fixed.</p>
            </div>
            <button @click="cancelCrop" class="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="overflow-hidden flex-1 min-h-0 bg-gray-50">
            <img ref="cropImgEl" :src="cropImgSrc" class="max-w-full block" style="max-height: 60vh;" />
          </div>

          <div class="flex gap-3 justify-end px-5 py-4 border-t border-gray-100">
            <button @click="cancelCrop" class="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none">
              Cancel
            </button>
            <button @click="applyCrop" class="px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors focus:outline-none">
              Use Crop
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

const savedSecret = sessionStorage.getItem('admin_secret')
const authed = ref(!!savedSecret)
const passwordInput = ref('')
const passwordError = ref(false)
const secret = ref(savedSecret || '')

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

const categories = ['Phone', 'Laptop', 'Tablet', 'Desktop']

const form = reactive({
  title: '',
  device: '',
  category: 'Phone',
  desc: '',
  images: [{ label: '', before: null, after: null }]
})

const previewShowAfter = ref(false)
const previewFirstPair = computed(() => form.images[0] ?? { before: null, after: null })

function addPair() {
  form.images.push({ label: '', before: null, after: null })
}

function removePair(i) {
  form.images.splice(i, 1)
}

function clearImage(pairIndex, field) {
  form.images[pairIndex][field] = null
}

function toggleNoBefore(i, event) {
  form.images[i].before = event.target.checked ? false : null
}

const cropModal = ref(false)
const cropImgSrc = ref('')
const cropImgEl = ref(null)
const cropTarget = ref(null)
let cropperInstance = null

function onFileSelect(pairIndex, field, event) {
  const file = event.target.files[0]
  event.target.value = ''
  if (!file) return

  const reader = new FileReader()
  reader.onload = async (e) => {
    cropImgSrc.value = e.target.result
    cropTarget.value = { pairIndex, field }
    cropModal.value = true

    await nextTick()
    if (cropperInstance) {
      cropperInstance.destroy()
      cropperInstance = null
    }
    cropperInstance = new Cropper(cropImgEl.value, {
      aspectRatio: 4 / 3,
      viewMode: 1,
      autoCropArea: 0.95,
      movable: true,
      zoomable: true,
      rotatable: false,
      scalable: false,
    })
  }
  reader.readAsDataURL(file)
}

function applyCrop() {
  if (!cropperInstance) return
  const canvas = cropperInstance.getCroppedCanvas({ maxWidth: 2000, maxHeight: 1500 })
  const dataUrl = canvas.toDataURL('image/jpeg', 0.95)
  const { pairIndex, field } = cropTarget.value
  form.images[pairIndex][field] = dataUrl
  closeCropModal()
}

function cancelCrop() {
  closeCropModal()
}

function closeCropModal() {
  cropModal.value = false
  cropImgSrc.value = ''
  cropTarget.value = null
  if (cropperInstance) {
    cropperInstance.destroy()
    cropperInstance = null
  }
}

const editId = ref(null)
const submitting = ref(false)
const submitError = ref(null)
const submitSuccess = ref(false)

const canSubmit = computed(() => {
  return form.title.trim() && form.device.trim() && form.images.some(p => p.after)
})

function loadForEdit(repair) {
  editId.value = repair._id
  submitSuccess.value = false
  submitError.value = null
  previewShowAfter.value = false
  Object.assign(form, {
    title: repair.title ?? '',
    device: repair.device ?? '',
    category: repair.category ?? 'Phone',
    desc: repair.desc ?? '',
    images: (repair.images ?? []).map(img => ({
      label: img.label ?? '',
      before: img.before ?? null,
      after: img.after ?? null,
    })),
  })
  if (form.images.length === 0) form.images.push({ label: '', before: null, after: null })
}

function resetForm() {
  editId.value = null
  submitSuccess.value = false
  submitError.value = null
  previewShowAfter.value = false
  Object.assign(form, {
    title: '',
    device: '',
    category: 'Phone',
    desc: '',
    images: [{ label: '', before: null, after: null }],
  })
}

function buildPayload() {
  return {
    title: form.title.trim(),
    device: form.device.trim(),
    category: form.category,
    desc: form.desc.trim(),
    images: form.images
      .filter(p => p.after)
      .map(p => ({
        label: p.label.trim() || null,
        before: p.before || null,
        after: p.after,
      })),
  }
}

async function submit() {
  submitting.value = true
  submitError.value = null
  submitSuccess.value = false
  try {
    const isEdit = !!editId.value
    const res = await fetch('/api/repairs', {
      method: isEdit ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${secret.value}` },
      body: JSON.stringify(isEdit ? { _id: editId.value, ...buildPayload() } : buildPayload()),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || 'Failed to save')
    }
    submitSuccess.value = true
    if (!isEdit) resetForm()
  } catch (err) {
    submitError.value = err.message
  } finally {
    submitting.value = false
  }
}

async function deleteRepair() {
  if (!editId.value) return
  if (!confirm(`Delete "${form.title}"? This cannot be undone.`)) return
  submitting.value = true
  submitError.value = null
  try {
    const res = await fetch('/api/repairs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${secret.value}` },
      body: JSON.stringify({ _id: editId.value }),
    })
    if (!res.ok) throw new Error('Failed to delete')
    resetForm()
  } catch (err) {
    submitError.value = err.message
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  const toEdit = sessionStorage.getItem('edit_repair')
  if (toEdit) {
    sessionStorage.removeItem('edit_repair')
    try { loadForEdit(JSON.parse(toEdit)) } catch { /* */ }
  }
})
</script>
