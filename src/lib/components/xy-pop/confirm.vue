<template>
  <div class="xy-pop"
       :class="{'xy-pop--show':show}">
    <div class="xy-pop__mask"
         @touchmove.stop.prevent="onPrevent">
      <header :class="{'xy-pop__mask__header--hideTitle':!showTitle}">
        <slot name="title">
          {{title}}
        </slot>
      </header>
      <main :class="{'xy-pop__mask__main--hideTitle':!showTitle}"
            ref="ct"
            @touchstart.stop="onTouchstart"
            @touchmove.stop.prevent="onTouchmove"
            @touchend.stop="onTouchend">
        <slot>
          <p v-html="msg"></p>
        </slot>
      </main>
      <footer>
        <slot name="btns">
          <button class="xy-pop__mask__footer__btn"
                  v-text="cancelText"
                  v-xy-btn-act:style.color="'#B1E2F4'"
                  @click="onCancel"></button>
          <button class="xy-pop__mask__footer__btn xy-pop__mask__footer__btn--confirm"
                  @click="onConfirm"
                  v-text="confirmText"
                  v-xy-btn-act:style.color="'#B1E2F4'"></button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
  import popMixin from './mixin'
  export default {
    name: 'xy-confirm',
    mixins: [popMixin],
    props: {
      cancelText: {
        type: String,
        default: '取消'
      }
    },
    data() {
      return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    beforeDestory() {},
    methods: {
      onConfirm: function(e) {
        let that = this
        let currentTarget = e.currentTarget
        // 让确认按钮失效
        currentTarget.disabled = true

        this.$emit('on-confirm', {
          currentTarget: e.currentTarget,
          hide: function() {
            // 恢复确认按钮有效
            currentTarget.disabled = false
            that.$emit('change', false)
          }
        })
        if (!this.confirmNotHide) {
          // 恢复确认按钮有效
          currentTarget.disabled = false
          this.$emit('change', false)
        }
      },
      onCancel: function(e) {
        this.$emit('on-cancel')
        this.$emit('change', false)
      },
      // 用于prototype式打开
      open: function(msg, opt) {
        this.msg = msg
        if (typeof opt.title !== 'undefined') {
          this.title = opt.title
        }
        if (typeof opt.showTitle !== 'undefined') {
          this.showTitle = opt.showTitle
        }
        if (typeof opt.cancelText !== 'undefined') {
          this.cancelText = opt.cancelText
        }
        if (typeof opt.confirmText !== 'undefined') {
          this.confirmText = opt.confirmText
        }
        if (typeof opt.confirmNotHide !== 'undefined') {
          this.confirmNotHide = opt.confirmNotHide
        }

        this.$emit('change', true)
      }
    },
    inject: []
  }
</script>

<style lang="scss" scoped>
</style>