import Vue from 'vue'
import App from './App.vue'
import toast from './index.js'
Vue.use(toast)

new Vue({
  el: '#app',
  render: h => h(App)
})
