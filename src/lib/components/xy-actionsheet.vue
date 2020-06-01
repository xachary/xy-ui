<template>
  <div class="xy-actionsheet" :class="{ 'xy-actionsheet--show': value }" @click="onMashClick">
    <div :style="{ height: `${height}px`, opacity: opacity }">
      <ul ref="menu">
        <li
          v-for="item in menus"
          v-text="item.name"
          :key="item.code"
          @click.stop="onSelect(item)"
          v-xy-btn-act:style.color="'rgba(229,229,229,0.5)'">
          </li>
        <li v-if="showCancel" v-xy-btn-act:style.color="'rgba(229,229,229,0.5)'" @click.stop="onCancel">取消</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'xy-actionsheet',
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      menus: {
        type: Array,
        default: () => [],
      },
      'show-cancel': {
        type: Boolean,
        default: true,
      },
      'cancel-text': {
        type: String,
        default: '取消',
      },
      'close-on-click-mask': {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        height: 0,
        opacity: 0,
      }
    },
    computed: {},
    watch: {
      value(v) {
        this.$nextTick(() => {
          if (v) {
            this.height = this.$refs.menu.offsetHeight
            this.opacity = 1
          } else {
            this.height = 0
            this.opacity = 0
          }
        })
      },
    },
    created() {},
    mounted() {},
    beforeDestroy() {},
    methods: {
      onSelect(item) {
        setTimeout(() => {
          this.$emit('on-select', item)
          this.$emit('change', false)
        }, 300)
      },
      onCancel() {
        setTimeout(() => {
          this.$emit('change', false)
        }, 300)
      },
      onMashClick() {
        if (this.closeOnClickMask) {
          this.$emit('change', false)
        }
      },
    },
    inject: [],
  }
</script>

<style lang="scss" scoped>
  @import '~@/lib/scss/style';
  .xy-actionsheet {
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: none;
    align-items: flex-end;
    &.xy-actionsheet--show {
      display: flex;
      animation: bg 0.3s ease-in-out;
    }

    @keyframes bg {
      0% {
        background: rgba(0, 0, 0, 0);
      }
      100% {
        background: rgba(0, 0, 0, 0.4);
      }
    }

    & > div {
      width: 0;
      flex-grow: 1;
      height: 0;
      transition: height 0.3s ease-in-out, opacity 0.3s ease-in-out;
      overflow: hidden;
      opacity: 0;
      & > ul {
        background: #fff;
        & > li {
          line-height: rsh(40);
          font-size: rsh(32);
          padding: rsh((100 - 40) * 0.5) 1em;
          text-align: center;
          color: #333;
          &:nth-child(n + 2) {
            border-top: 1px solid #f2f2f2;
          }
        }
      }
    }
  }
</style>
