import xyImagePop from '@/lib/components/xy-image-pop'
import xySlider from '@/lib/components/xy-slider'

// import xyImagePop from '@/lib/directives/xy-image-pop'

import xyLazyloadResize from '@/lib/plugins/xy-lazyload-resize'

export default {
  components: { xySlider, xyImagePop },
  directives: {},
  plugins: { xyLazyloadResize }
}
