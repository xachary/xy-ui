<template>
    <div
        class="xy-image-pop"
        v-show="visible"
        @touchstart.stop
        @touchmove.stop
    >
        <div
            class="xy-image-pop__prevent"
            v-on:touchstart.prevent.stop
        ></div>
        <div
            class="xy-image-pop__close"
            @click.stop="onClose"
            v-on:touchmove.prevent.stop
        ><span></span><span></span><span></span><span></span></div>
        <div class="xy-image-pop__slider">
            <div>visible: {{visible}}</div>
            <div>imgs: {{imgs}}</div>
            <div>cur: {{cur}}</div>
        </div>
        <div class="xy-image-pop__indicator">
            <span></span>
            <span class="xy-image-pop__indicator--focus"></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'xy-image-pop',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        imgs: {
            type: Array,
            default: () => []
        },
        cur: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            closeTimer: null
        }
    },
    computed: {
    },
    watch: {

    },
    methods: {
        onStop() { debugger },
        onClose({ currentTarget }) {
            currentTarget.classList.add('xy-image-pop__close--moving')
            if (this.closeTimer) {
                clearTimeout(this.closeTimer)
                this.closeTimer = null
            }
            this.closeTimer = setTimeout(function () {
                currentTarget.classList.remove('xy-image-pop__close--moving')
            }, 300)

            this.$emit('update:visible', !this.visible)
        }
    },
    mounted: function () {
    }
}
</script>

<style lang="scss">
.xy-image-pop {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  &__prevent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    margin: 10px;
    border-radius: 15px;
    z-index: 4;
    overflow: hidden;
    transform: rotate(45deg);
    font-size: 0;
    & > span {
      display: inline-block;
      width: 50%;
      height: 50%;
      vertical-align: middle;
      box-sizing: border-box;
      &:nth-child(1) {
        box-shadow: -1px -1px 0 0 #fff inset, 1px 0 0 0 #fff, 0 1px 0 0 #fff;
      }
      &:nth-child(4) {
        box-shadow: 1px 1px 0 0 #fff inset, -1px 0 0 0 #fff, 0 -1px 0 0 #fff;
      }
    }
    @keyframes moving {
      0% {
        transform: rotate(45deg) scale(1);
      }
      50% {
        transform: rotate(45deg) scale(0.6);
      }
      100% {
        transform: rotate(45deg) scale(1);
      }
    }
    &--moving {
      animation: moving 0.2s ease-in-out;
    }
  }
  &__indicator {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3vw 0;
    & > span {
      width: 1vw;
      padding-top: 1vw;
      border-radius: 50%;
      box-shadow: 0 0 0 0.2vw #999;
      margin: 1vw;
      box-sizing: content-box;
      border: 0.2vw solid rgba(0, 0, 0, 0.8);
    }
    &--focus {
      background-color: #fff;
    }
  }
}
</style>