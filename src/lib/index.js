import xyLazyload from '@/lib/components/xy-lazyload'
import xySlider from '@/lib/components/xy-slider'
import xyImagePop from '@/lib/components/xy-image-pop'
//
import xyPullRefresh from '@/lib/directives/xy-pull-refresh'
//
import xyLazyloadResize from '@/lib/plugins/xy-lazyload-resize'

const xyUI = {
  install(Vue) {
    Vue.component(xyLazyload.name, xyLazyload)
    Vue.component(xySlider.name, xySlider)
    //
    Vue.directive(xyPullRefresh.name, xyPullRefresh)
    //
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(xyUI)
  window.Vue.use(VueLazyload, xyLazyloadResize)
}

export default {
  components: { xyLazyload, xySlider, xyImagePop },
  directives: { xyPullRefresh },
  plugins: { xyLazyloadResize }
}
