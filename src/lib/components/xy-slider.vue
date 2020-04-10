<template>
  <div class="xy-slider" :style="{ width: width, 'padding-top': height }" ref="slider" @touchmove="onPrevent">
    <ul
      :style="{ 'min-width': width, left: left }"
      :class="{ 'xy-slider--touch': paused }"
      @touchstart="onTouchstart"
      @touchmove="onTouchmove"
      @touchend="onTouchend"
      ref="container"
    >
      <li
        v-for="(item, index) in parseData"
        :key="index"
        :style="{ width: `${itemWidth}px` }"
        :class="{
          'xy-slider__item--none': !scale,
          'xy-slider__item--current': scale && index === current2,
          'xy-slider__item--left': scale && index === current2 - 1,
          'xy-slider__item--right': scale && index === current2 + 1,
        }"
        @click="onClick(item, index)"
      >
        <slot v-bind="item"></slot>
      </li>
    </ul>
    <footer v-if="indicate && length > 1">
      <span v-for="(item, index) in data" :key="index" :class="{ 'xy-slider__indicator--cur': index === current }"> </span>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'xy-slider',
    props: {
      // 宽（样式值）
      width: {
        type: String,
        default: '100%',
      },
      // 高（样式值）
      height: {
        type: String,
        default: '50%',
      },
      // 数据数组
      data: {
        type: Array,
        default: () => [],
      },
      // 切换时间（毫秒）
      interval: {
        type: Number,
        default: 3000,
      },
      // 自动切换
      auto: {
        type: Boolean,
        default: true,
      },
      // 缩放特效
      scale: {
        type: Boolean,
        default: false,
      },
      // 是否限时下标
      indicate: {
        type: Boolean,
        default: true,
      },
      // 是否循环
      repeat: {
        type: Boolean,
        default: true,
      },
      // 是否阻止滚动事件传递
      prevent: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        // 上次坐标
        lastX: 0,
        // 开始坐标
        startX: 0,
        // 当前坐标
        curX: 0,
        // 当前位移
        curLen: 0,
        // 用于输出
        scrollLeft: 0,
        // 滑动速度
        speed: 0,
        // 上次位移
        lastCurX: 0,
        // 暂停动画
        paused: true,
        // 切换计时器
        timer: null,
        // 恢复动画计时器
        timer2: null,
        // 位移样式值
        left: 0,
        // 容器/项宽度
        itemWidth: 1,
        // 暂停
        pauseMark: false,
      }
    },
    computed: {
      length() {
        // 数据数组长度
        return this.data.length
      },
      length2() {
        // 效果数组长度
        return this.data.length * 3
      },
      parseData() {
        this.giveNum()
        let temp = JSON.parse(JSON.stringify([...this.data, ...this.data, ...this.data]))
        temp = temp.map((o, i) => {
          // if (i >= this.data.length) {
          o.imagePopId = `id${i}`
          // }
          // if (/\?[^?=]+=/.test()) {
          //   o.src = o.src + '&rand=' + Math.random()
          // } else {
          //   o.src = o.src + '?rand=' + Math.random()
          // }
          return o
        })
        return temp
      },
      current() {
        // 当前数据序号
        return Math.abs(Math.floor(this.lastX / this.itemWidth)) % this.length
      },
      current2() {
        // 当前效果序号
        return Math.abs(Math.floor(this.lastX / this.itemWidth))
      },
    },
    watch: {
      data() {
        this.init()
      },
      current() {
        if (this.data.length > 0) {
          this.$emit('on-change', this.data[this.current])
        }
      },
      scrollLeft() {
        let scrollWidth = this.data.length * this.itemWidth
        this.$emit('on-scroll', Math.abs(this.scrollLeft) % scrollWidth, scrollWidth)
      },
      curLen() {
        this.scrollLeft = this.curLen
      },
    },
    beforeMount() {},
    mounted() {
      this.itemWidth = this.$refs.slider ? this.$refs.slider.offsetWidth : 1
      this.init()
      window.addEventListener('resize', () => {
        // 修改itemWidth前记录序号
        let tempCurrent = this.current2
        this.itemWidth = this.$refs.slider ? this.$refs.slider.offsetWidth : 1
        // 暂停动画
        this.paused = true
        // 移至当前序号的位置
        this.lastX = -this.itemWidth * tempCurrent
        this.curLen = this.lastX
        // 位移样式值
        if (this.$refs.container) {
          this.left = `${this.lastX}px`
        }
        setTimeout(() => {
          // 恢复动画
          this.paused = false
        }, 300)
      })
    },
    methods: {
      // 初始化
      init() {
        // 暂停动画
        this.paused = true
        // 移至效果数组中间
        this.lastX = -this.itemWidth * this.length
        this.curLen = this.lastX
        // 位移样式值
        if (this.$refs.container) {
          this.left = `${this.lastX}px`
        }
        setTimeout(() => {
          // 恢复动画
          this.paused = false
          // 开始切换
          if (this.length > 1 && this.auto && this.repeat) {
            this.stop()
            this.start()
          }
        }, 300)
      },
      // 环形切换
      circle() {
        setTimeout(() => {
          // 暂停动画
          this.paused = true
          // 无感前进、回退
          let r = Math.floor(this.lastX / this.itemWidth)
          if (r === 0) {
            r = r - this.length
          } else if (r === 1 - this.length2) {
            r = r + this.length
          }
          this.lastX = this.itemWidth * r
          this.scrollLeft = this.lastX
          // 位移样式值
          if (this.$refs.container) {
            this.left = `${this.lastX}px`
          }
          this.timer2 = setTimeout(() => {
            // 恢复动画
            this.paused = false
          }, 300)
        }, 300)
      },
      // 开始自动切换
      start() {
        if (this.interval) {
          this.timer = setInterval(() => {
            if (!this.pauseMark) {
              let p = this.lastX / this.itemWidth
              let r = Math.floor(p)
              // 自动左划
              r = r - 1
              this.lastX = this.itemWidth * r
              this.curLen = this.lastX
              // 位移样式值
              if (this.$refs.container) {
                this.left = `${this.lastX}px`
              }
              //
              this.circle()
            }
          }, this.interval)
        }
      },
      // 停止自动切换
      stop() {
        clearTimeout(this.timer)
        clearTimeout(this.timer2)
        this.timer = null
        this.timer2 = null
      },
      // 暂停切换
      pause() {
        this.pauseMark = true
      },
      // 恢复切换
      resume() {
        this.pauseMark = false
      },
      // 防止序号超出边界
      fixed(r, length) {
        if (r > 0) {
          r = 0
        } else if (r <= -length) {
          r = 1 - length
        }
        return r
      },
      // 按下
      onTouchstart({ touches: [touch] }) {
        if (this.length > 1) {
          if (this.auto) {
            // 停止自动切换
            this.stop()
          }
          // 暂停动画
          this.paused = true
          //
          this.startX = touch.clientX
        }
      },
      // 滑动
      onTouchmove({ touches: [touch] }) {
        if (this.length > 1) {
          if (this.auto) {
            // 停止自动切换
            this.stop()
          }
          if (this.repeat) {
            this.curX = touch.clientX - this.startX
            this.speed = Math.abs(this.lastCurX - this.curX)
            this.lastCurX = this.curX
            this.curLen = this.curX + this.lastX

            // 位移样式值
            if (this.$refs.container) {
              this.left = `${this.curLen}px`
            }
          } else {
            let curXTemp = touch.clientX - this.startX
            let speedTemp = Math.abs(this.lastCurX - curXTemp)
            let curLenTemp = curXTemp + this.lastX
            if (curLenTemp < -(this.data.length * this.itemWidth) && curLenTemp > -((this.data.length * 2 - 1) * this.itemWidth)) {
              this.curX = curXTemp
              this.speed = speedTemp
              this.lastCurX = this.curX
              this.curLen = this.curX + this.lastX

              // 位移样式值
              if (this.$refs.container) {
                this.left = `${this.curLen}px`
              }
            }
          }
        }
      },
      // 释放
      onTouchend() {
        if (this.length > 1) {
          // 恢复动画
          this.paused = false

          this.lastX = this.curLen
          let p = this.lastX / this.itemWidth
          // let v = this.lastX % this.itemWidth
          let r1 = Math.floor(p)
          let r2 = Math.round(p)

          // 左、右划超过宽度20%或者速度超过给定值就切换
          if (Math.abs(this.curX / this.itemWidth) > 0.2 || Math.abs(this.speed / this.itemWidth) > 0.025) {
            if (this.curX >= 0) {
              // 右
              if (r1 === r2) {
                r2++
              }
            } else {
              // 左
              if (r1 !== r2) {
                r2--
              }
            }
          }
          r2 = this.fixed(r2, this.length2)
          this.speed = 0
          this.lastX = this.itemWidth * r2
          // 位移样式值
          if (this.$refs.container) {
            this.left = `${this.lastX}px`
          }
          // 环形切换
          this.circle()
          //
          if (this.auto && this.repeat) {
            // 恢复自动切换
            this.start()
          }
        }
      },
      onClick(item, index) {
        this.$emit('on-click', item, this.parseData, index)
      },
      giveNum() {
        // 制作效果数组
        for (let i = 0; i < this.data.length; i++) {
          this.data[i].$index = i
        }
      },
      onPrevent(e) {
        if (this.prevent) {
          e.stopPropagation()
          e.preventDefault()
          return false
        }
        return true
      },
    },
  }
</script>

<style lang="scss">
  @import '~@/lib/scss/style';

  .xy-slider {
    position: relative;
    margin: 0 auto;
    overflow: hidden;
    & > ul {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      height: 100%;
      white-space: nowrap;
      word-break: keep-all;
      transition: left 0.3s ease-in-out;
      &.xy-slider--touch {
        transition: none;
        & > li {
          transition: none;
        }
      }
      & > li {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        height: 100%;
        overflow: hidden;
        transition: transform 0.3s ease-in-out;
        transform: scale(0.6);
        //
        &.xy-slider__item--none {
          transform: none;
        }
        &.xy-slider__item--current {
          transform: scale(0.8);
        }
        &.xy-slider__item--left {
          transform: scale(0.6) translate(40vw, 0);
        }
        &.xy-slider__item--right {
          transform: scale(0.6) translate(-40vw, 0);
        }
        & > * {
          width: 100%;
          height: 100%;
        }
      }
    }
    & > footer {
      font-size: 0;
      text-align: center;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 3;
      width: 100%;
      height: 8%;
      min-height: rsh(28);
      & > span {
        display: inline-block;
        vertical-align: middle;
        width: 2%;
        margin: 0 1%;
        padding-top: 2%;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 50%;

        box-shadow: 0 0 2px 0 #000;
        box-sizing: border-box;
        &.xy-slider__indicator--cur {
          background-color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
</style>
