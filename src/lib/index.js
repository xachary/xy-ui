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
//
import xyKeepTop from '@/lib/directives/xy-keep-top'
import xyPullRefresh from '@/lib/directives/xy-pull-refresh'
import xyBtnAct from '@/lib/directives/xy-btn-act'
// import xyImagePopDirectives from '@/lib/directives/xy-btn-act'
// 迁移，待重构
import xyArticle from './components/xy-article.vue'
import xyPopImage from './directives/xy-pop-image'

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
    Vue.component(xyScrollBottom.name, xyScrollBottom)
    Vue.component(xyImagePop.name, xyImagePop)
    Vue.component(xyHtmlViewer.name, xyHtmlViewer)
    //
    Vue.directive(xyKeepTop.name, xyKeepTop)
    Vue.directive(xyPullRefresh.name, xyPullRefresh)
    Vue.directive(xyBtnAct.name, xyBtnAct)
    // 迁移，待重构
    Vue.component(xyArticle.name, xyArticle)
    Vue.directive(xyPopImage.name, xyPopImage)
  },
  $xyFormat: xyPrototypes.$xyFormat,
  $xyTool: xyPrototypes.$xyTool,
  $xyValidate: xyPrototypes.$xyValidate,
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
  //
  xyKeepTop,
  xyPullRefresh,
  xyBtnAct,
  // 迁移，待重构
  xyArticle,
  xyPopImage
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(xyUI)
}

export default xyUI
