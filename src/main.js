import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)
app.use(router)

app.directive('animate', {
  mounted(el, binding) {
    const delay = binding.value ?? 0
    el.style.opacity = '0'
    el.style.transform = 'translateY(40px)'
    el.style.willChange = 'transform, opacity'
    el.style.transition = `opacity 0.65s ease-out ${delay}ms, transform 0.65s ease-out ${delay}ms`

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        observer.disconnect()
        setTimeout(() => {
          el.style.transition = ''
          el.style.transform = ''
          el.style.willChange = 'auto'
        }, delay + 700)
      }
    }, { threshold: 0.1 })

    observer.observe(el)
  }
})

app.mount('#app')
