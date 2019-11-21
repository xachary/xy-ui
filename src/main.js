import Vue from 'vue'
import VueRouter from 'vue-router'
//
import App from '@/App.vue'
//
import Index from '@/index.vue'
import lazyload from '@/view/lazyload.vue'
import slider from '@/view/slider.vue'
import keepTop from '@/view/keep-top.vue'
import pullRefresh from '@/view/pull-refresh.vue'
import btnAct from '@/view/btn-act.vue'
import time from '@/view/time.vue'
import formatCommon from '@/view/format-common.vue'
import formatDate from '@/view/format-date.vue'
import formatNumber from '@/view/format-number.vue'
import listStatus from '@/view/list-status.vue'
import scrollBottom from '@/view/scroll-bottom.vue'
import tool from '@/view/tool.vue'

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
      path: '/keep-top',
      component: keepTop
    },
    {
      path: '/pull-refresh',
      component: pullRefresh
    },
    {
      path: '/btn-act',
      component: btnAct
    },
    {
      path: '/time',
      component: time
    },
    {
      path: '/format-common',
      component: formatCommon
    },
    {
      path: '/format-date',
      component: formatDate
    },
    {
      path: '/format-number',
      component: formatNumber
    },
    {
      path: '/list-status',
      component: listStatus
    },
    {
      path: '/scroll-bottom',
      component: scrollBottom
    },
    {
      path: '/tool',
      component: tool
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
