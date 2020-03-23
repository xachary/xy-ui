<template>
  <div class="xy-pop-toast"
       :class="{'xy-pop-toast--show':show}">
    <main>
      <slot name="icon">
        <i class="xy-pop-toast__icon xy-pop-toast__icon--success"
           v-if="type==='success'&&show2"></i>
        <i class="xy-pop-toast__icon xy-pop-toast__icon--fail"
           v-if="type==='fail'&&show2"></i>
        <i class="xy-pop-toast__icon xy-pop-toast__icon--warn"
           v-if="type==='warn'&&show2"></i>
        <img :src="img"
             v-if="img"
             alt="">
      </slot>
      <slot>
        <p v-html="msg"></p>
      </slot>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'xy-toast',
    mixins: [],
    model: {
      prop: 'show',
      event: 'change'
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      msg: {
        type: String,
        default: ''
      },
      time: {
        type: Number,
        default: 1500
      },
      type: {
        type: String,
        default: ''
      },
      img: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        show2:false
      }
    },
    computed: {},
    watch: {
      show(){
        let that = this
        // 解决部分垃圾手机浏览器核心有病，icon阻塞了p标签的显示
        if(this.show){
          setTimeout(function(){
            that.show2 = true
          },100)
        }else{
          setTimeout(function(){
            that.show2 = false
          },300)
        }
      }
    },
    created() {},
    mounted() {
      this.$emit('on-mounted')
    },
    beforeDestory() {},
    methods: {
      // 用于prototype式打开
      open: function(msg, opt) {
        this.msg = msg
        if (typeof opt.time !== 'undefined') {
          this.time = opt.time
        }
        if (typeof opt.type !== 'undefined') {
          this.type = opt.type
        }
        if (typeof opt.img !== 'undefined') {
          this.img = opt.img
        }
        this.$emit('change', true)
        setTimeout(() => {
          this.$emit('change', false)
        }, this.time)
      }
    },
    inject: []
  }
</script>

<style lang="scss" scoped>
</style>