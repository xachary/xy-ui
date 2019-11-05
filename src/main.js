import Vue from 'vue'
import VueRouter from 'vue-router'
//
import App from '@/App.vue'
//
import Index from '@/index.vue'
import lazyload from '@/view/lazyload.vue'
import slider from '@/view/slider.vue'
import imagePop from '@/view/image-pop.vue'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '',
      redirect: '/index'
    },
    {
      path: '/lazyload',
      component: lazyload
    },
    {
      path: '/slider',
      component: slider
    },
    {
      path: '/image-pop',
      component: imagePop
    }
  ]
})
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
