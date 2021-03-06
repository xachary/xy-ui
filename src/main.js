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
import tool from '@/view/tools.vue'
import validate from '@/view/validate'

import imagePop from '@/view/image-pop.vue'
import htmlViewer from '@/view/html-viewer.vue'
import pop from '@/view/pop.vue'
import loading from '@/view/loading.vue'
import btnLoading from '@/view/btn-loading.vue'
import spinner from '@/view/spinner.vue'
import actionsheet from '@/view/actionsheet.vue'

import xyUi from '@/lib'

Vue.use(VueRouter)
Vue.use(xyUi)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '',
      redirect: '/index',
    },
    {
      path: '/lazyload',
      component: lazyload,
    },
    {
      path: '/slider',
      component: slider,
    },
    {
      path: '/keep-top',
      component: keepTop,
    },
    {
      path: '/pull-refresh',
      component: pullRefresh,
    },
    {
      path: '/btn-act',
      component: btnAct,
    },
    {
      path: '/time',
      component: time,
    },
    {
      path: '/format-common',
      component: formatCommon,
    },
    {
      path: '/format-date',
      component: formatDate,
    },
    {
      path: '/format-number',
      component: formatNumber,
    },
    {
      path: '/list-status',
      component: listStatus,
    },
    {
      path: '/scroll-bottom',
      component: scrollBottom,
    },
    {
      path: '/tool',
      component: tool,
    },
    {
      path: '/validate',
      component: validate,
    },
    {
      path: '/image-pop',
      component: imagePop,
    },
    {
      path: '/html-viewer',
      component: htmlViewer,
    },
    {
      path: '/pop',
      component: pop,
    },
    {
      path: '/loading',
      component: loading,
    },
    {
      path: '/btn-loading',
      component: btnLoading,
    },
    {
      path: '/spinner',
      component: spinner,
    },
    {
      path: '/actionsheet',
      component: actionsheet,
    },
  ],
})
new Vue({
  router,
  el: '#app',
  render: (h) => h(App),
})
