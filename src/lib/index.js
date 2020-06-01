import xyPrototypes from '@/lib/prototypes'
//
import xyLazyload from '@/lib/components/xy-lazyload'
import xySlider from '@/lib/components/xy-slider'
import xyContinue from '@/lib/components/xy-continue'
import xyCountdown from '@/lib/components/xy-countdown'
import xyTimer from '@/lib/components/xy-timer'
import xyTiming from '@/lib/components/xy-timing'
import xyListStatus from '@/lib/components/xy-list-status'
import xyScrollBottom from '@/lib/components/xy-scroll-bottom'
import xyImagePop from '@/lib/components/xy-image-pop'
import xyHtmlViewer from './components/xy-html-viewer.vue'
import xyConfirm from './components/xy-pop/confirm.vue'
import xyAlert from './components/xy-pop/alert.vue'
import xySpinner from './components/xy-spinner.vue'
import xyActionsheet from './components/xy-actionsheet.vue'
//
import xyKeepTop from '@/lib/directives/xy-keep-top'
import xyPullRefresh from '@/lib/directives/xy-pull-refresh'
import xyBtnAct from '@/lib/directives/xy-btn-act'
import xyLoading from '@/lib/directives/xy-loading'
import xyBtnLoading from '@/lib/directives/xy-btn-loading'
// import xyImagePopDirectives from '@/lib/directives/xy-btn-act'
//

const xyUI = {
  install(Vue) {
    for (let p in xyPrototypes) {
      Vue.prototype['$' + p] = xyPrototypes[p]
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
    Vue.component(xyScrollBottom.name, xyScrollBottom)
    Vue.component(xyImagePop.name, xyImagePop)
    Vue.component(xyHtmlViewer.name, xyHtmlViewer)
    Vue.component(xyConfirm.name, xyConfirm)
    Vue.component(xyAlert.name, xyAlert)
    Vue.component(xySpinner.name, xySpinner)
    Vue.component(xyActionsheet.name,xyActionsheet)
    //
    Vue.directive(xyKeepTop.name, xyKeepTop)
    Vue.directive(xyPullRefresh.name, xyPullRefresh)
    Vue.directive(xyBtnAct.name, xyBtnAct)
    Vue.directive(xyLoading.name, xyLoading)
    Vue.directive(xyBtnLoading.name, xyBtnLoading)
  },
  //
  xyLazyload,
  xySlider,
  xyContinue,
  xyCountdown,
  xyTimer,
  xyTiming,
  xyListStatus,
  xyScrollBottom,
  xyImagePop,
  xyHtmlViewer,
  xySpinner,
  xyActionsheet,
  //
  xyKeepTop,
  xyPullRefresh,
  xyBtnAct,
  //
  xyFormat: xyPrototypes.xyFormat,
  xyTools: xyPrototypes.xyTools,
  xyValidate: xyPrototypes.xyValidate,
  xyPop: xyPrototypes.xyPop,
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(xyUI)
}

export default xyUI
