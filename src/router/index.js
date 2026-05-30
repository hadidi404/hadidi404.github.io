import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior(to) {
    if (to.hash) return new Promise(resolve => setTimeout(() => resolve({ el: to.hash, behavior: 'smooth' }), 50))
    return { top: 0 }
  },
  routes: [
    { path: '/', component: HomePage },
    { path: '/repairs', component: () => import('../pages/GalleryPage.vue') },
    { path: '/admin', component: () => import('../pages/AdminPage.vue') },
    { path: '/admin/manage', component: () => import('../pages/AdminManagePage.vue') }
  ]
})
