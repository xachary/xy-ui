<template>
  <div class="xy-pop-loading"
       :class="{'xy-pop-loading--show':show}">
    <div class="xy-pop-loading__mask"
         :class="{'xy-pop-loading__mask--show':mask}"
         @touchmove.stop.prevent="onPrevent">
      <main ref="ct"
            @touchstart.stop="onTouchstart"
            @touchmove.stop.prevent="onTouchmove"
            @touchend.stop="onTouchend">
        <slot>
          <slot name="icon">
            <i class="xy-pop-loading__mask__icon"
               :class="{'xy-pop-loading__mask__icon--msg':msg}"
               v-if="!img"></i>
          </slot>
          <img :src="img"
               v-if="img"
               alt="">
          <p v-html="msg"></p>
        </slot>
      </main>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'xy-alert',
    model: {
      prop: 'show',
      event: 'change'
    },
    mixins: [],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      msg: {
        type: String,
        default: ''
      },
      mask: {
        type: Boolean,
        default: false
      },
      img: {
        type: String,
        default: ''
      }
    },
    data() {
      return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
      this.$emit('on-mounted')
    },
    beforeDestory() {},
    methods: {
      onTouchstart: function(e) {
        clearInterval(this.time)
        this.startY = e.touches[0].clientY
        this.speedY = 0
      },
      onTouchmove: function(e) {
        this.speedY = this.moveY - e.touches[0].clientY
        this.moveY = e.touches[0].clientY
        this.$refs.ct.scrollTo(0, this.lastH + this.startY - e.touches[0].clientY)
      },
      onTouchend: function() {
        let that = this
        this.lastH = this.$refs.ct.scrollTop + this.speedY * Math.abs(this.speedY)
        if (
          this.lastH >
          this.$refs.ct.scrollHeight - this.$refs.ct.offsetHeight
        ) {
          this.lastH = this.$refs.ct.scrollHeight - this.$refs.ct.offsetHeight
        }
        if (this.lastH < 0) {
          this.lastH = 0
        }
        this.time = this.$xyTools.move(
          this.$refs.ct.scrollTop,
          this.lastH,
          function(v) {
            that.$refs.ct.scrollTo(0, v)
          },
          function() {},
          800,
          'ExpoEaseOut'
        )
      },
      onPrevent: function() {},
      // 用于prototype式打开
      open: function(opt = {}) {
        if (typeof opt.msg !== 'undefined') {
          this.msg = opt.msg
        } else {
          this.msg = ''
        }
        if (typeof opt.mask !== 'undefined') {
          this.mask = opt.mask
        } else {
          this.mask = false
        }
        if (typeof opt.img !== 'undefined') {
          this.img = opt.img
        } else {
          this.img = ''
        }
        this.$emit('change', true)
      }
    },
    inject: []
  }
</script>

<style lang="scss" scoped>
</style>