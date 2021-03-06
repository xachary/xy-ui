<template>
  <div class="pswp xy-image-pop" tabindex="-1" role="dialog" aria-hidden="true" ref="pswp">
    <div class="pswp__bg"></div>
    <div class="pswp__scroll-wrap">
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <div class="custom">
            {{ counter }}
          </div>
          <div class="pswp__counter"></div>
          <slot name="button-after"></slot>
          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
          <button class="pswp__button pswp__button--share" title="Share"></button>
          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
          <slot name="button-before"></slot>
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>
        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PhotoSwipe from 'x-photoswipe/dist/photoswipe'
  import UI from 'x-photoswipe/dist/photoswipe-ui-default'

  export default {
    name: 'xy-image-pop',
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      imgs: {
        type: Array,
        default: () => [],
      },
      index: {
        type: Number,
        default: 0,
      },
      scale: {
        type: Boolean,
        default: true,
      },
      times: {
        type: Number,
        default: 1,
      },
    },
    data() {
      return {
        gallery: null,
        imgsParsed: [],
        idx: 0,
      }
    },
    computed: {
      counter() {
        let len = this.imgs.length / this.times
        let idx = this.idx + 1
        let num = idx % len
        return this.times > 1 ? `${num === 0 ? len : num} / ${len}` : `${idx} / ${this.imgs.length}`
      },
    },
    watch: {
      visible() {
        this.showOrHide()
      },
      index(v) {
        this.idx = v
      },
      idx() {
        // console.log(v)
      },
    },
    methods: {
      parse() {
        this.imgsParsed = this.imgs.map((o) => {
          let base = Object.assign({ w: 0, h: 0 }, o)
          if (!base.msrc) {
            base.msrc = base.src
          }
          return base
        })
      },
      init() {
        let that = this
        let config = {
          index: this.idx === 0 ? this.index : this.idx,
          maxSpreadZoom: 3,
          bgOpacity: 0.8,
          history: false,
          shareEl: false,
          shareButtons: [
            {
              id: 'download',
              label: 'Open image',
              url: '{{raw_image_url}}',
              download: true,
            },
          ],
          zoomEl: false,
          fullscreenEl: false,
          arrowEl: false,
        }
        if (this.scale) {
          // 实现打开放大、关闭缩小效果（预览图 <-> 缩略图）。
          // 如果设置了“Disable cache”，打开放大效果无法出现。
          config.getThumbBoundsFn = function (index) {
            // 查找缩略图元素
            // 优先级依次为：data-id===item.id、src===item.msrc、src===item.src、id===item.id
            let thumbnail = document.querySelector(`[data-id="${that.imgsParsed[index].shadowId}"]:not(.pswp__img)`)
            if (!thumbnail) {
              thumbnail = document.querySelector(`[src="${that.imgsParsed[index].msrc}"]:not(.pswp__img)`)
            }
            if (!thumbnail) {
              thumbnail = document.querySelector(`[src="${that.imgsParsed[index].src}"]:not(.pswp__img)`)
            }
            if (!thumbnail) {
              thumbnail = document.querySelector(`#${that.imgsParsed[index].id}:not(.pswp__img)`)
            }
            if (thumbnail) {
              // get window scroll Y
              let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
              // optionally get horizontal scroll
              // get position of element relative to viewport
              let rect = thumbnail.getBoundingClientRect()
              // w = width
              return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
              // Good guide on how to get element coordinates:
              // http://javascript.info/tutorial/coordinates
            }
          }
        }
        this.gallery = new PhotoSwipe(this.$refs.pswp, UI, this.imgsParsed, config)
        this.gallery.listen('close', () => {
          this.$emit('update:visible', false)
        })
        this.gallery.listen('afterChange', () => {
          this.$emit('update:index', this.gallery.getCurrentIndex())
          this.$emit('on-change', this.gallery.getCurrentIndex())
          this.idx = this.gallery.getCurrentIndex()
        })
        // 加载原图的尺寸
        this.gallery.listen('gettingData', (index, item) => {
          if (!item.w || !item.h || item.w < 5 || item.h < 5) {
            const img = new Image()
            img.onload = function () {
              // item.w = this.width
              // item.h = this.height

              // contain效果
              let size = that.contain(this.width, this.height)
              item.w = size.w
              item.h = size.h

              that.gallery.updateSize(true)
            }
            img.src = item.src
          }
        })
        this.gallery.listen('close', () => {
          this.$emit('on-close')
        })

        this.gallery.init()
      },
      showOrHide() {
        if (this.visible && this.imgs.length > 0) {
          this.parse()
          // 首张图片下载完成再进行打开放大效果
          const that = this
          const item = this.imgsParsed[this.index]
          if (!item.w || !item.h || item.w < 5 || item.h < 5) {
            const img = new Image()
            img.onload = function () {
              // item.w = this.width
              // item.h = this.height

              // contain效果
              let size = that.contain(this.width, this.height)
              item.w = size.w
              item.h = size.h

              that.init()
            }
            img.src = item.src
          } else {
            this.init()
          }
        } else {
          if (this.gallery) {
            this.gallery.close()
            this.idx = 0
            this.$emit('update:visible', false)
          }
        }
      },
      contain(width, height) {
        let size = {
          w: 0,
          h: 0,
        }
        let max = window.innerWidth >= window.innerHeight ? window.innerWidth : window.innerHeight
        if (width >= height) {
          size.w = (width / (height / max)) * 2
          size.h = max * 2
        } else {
          size.w = max * 2
          size.h = (height / (width / max)) * 2
        }
        return size
      },
      onStop() {},
    },
    mounted() {},
    beforeDestroy() {},
  }
</script>

<style src="x-photoswipe/dist/photoswipe.css"></style>
<style src="x-photoswipe/dist/default-skin/default-skin.css"></style>

<style lang="scss" scoped>
  .xy-image-pop {
    .pswp {
      .pswp__caption__center {
        max-width: none;
      }
    }

    .pswp__counter {
      display: none;
    }

    .custom {
      font-size: 13px;
      color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      height: 44px;
      padding: 0 10px;
      background-color: transparent;
      opacity: 0.75;

      line-height: 44px;
    }
  }
</style>
