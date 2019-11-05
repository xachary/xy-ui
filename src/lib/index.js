import xyImagePop from '@/lib/components/xy-image-pop'
import xySlider from '@/lib/components/xy-slider'

// import xyImagePop from '@/lib/directives/xy-image-pop'

import xyLazyloadResize from '@/lib/plugins/xy-lazyload-resize'

const xyUI = {
  install(Vue) {
    Vue.component(xySlider.name, xySlider)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(xyUI)
  window.Vue.use(VueLazyload, xyLazyloadResize)
}

export default {
  components: { xySlider, xyImagePop },
  directives: {},
  plugins: { xyLazyloadResize }
}
