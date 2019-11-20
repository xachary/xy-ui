import xyPrototypes from '@/lib/prototypes'
//
import xyLazyload from '@/lib/components/xy-lazyload'
import xySlider from '@/lib/components/xy-slider'
import xyContinue from '@/lib/components/xy-continue'
import xyCountdown from '@/lib/components/xy-countdown'
import xyTimer from '@/lib/components/xy-timer'
import xyTiming from '@/lib/components/xy-timing'
import xyListStatus from '@/lib/components/xy-list-status'
import xyImagePop from '@/lib/components/xy-image-pop'
//
import xyPullRefresh from '@/lib/directives/xy-pull-refresh'
//

const xyUI = {
  install(Vue) {
    for (let p in xyPrototypes) {
      Vue.prototype[p] = xyPrototypes[p]
    }
    for (let f in xyPrototypes.$xyFormat) {
      for (let t in xyPrototypes.$xyFormat[f]) {
        Vue.filter(`$xyFormat.${f}.${t}`, xyPrototypes.$xyFormat[f][t])
      }
    }
    //
    Vue.component(xyLazyload.name, xyLazyload)
    Vue.component(xySlider.name, xySlider)
    Vue.component(xyContinue.name, xyContinue)
    Vue.component(xyCountdown.name, xyCountdown)
    Vue.component(xyTimer.name, xyTimer)
    Vue.component(xyTiming.name, xyTiming)
    Vue.component(xyListStatus.name, xyListStatus)
    Vue.component(xyImagePop.name, xyImagePop)
    //
    Vue.directive(xyPullRefresh.name, xyPullRefresh)
    //
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(xyUI)
}

export default xyUI
