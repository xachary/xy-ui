<template>
  <div class="sample"
       v-xy-pull-refresh="onPullRefresh">
    <div style="background-color:rgba(0,0,255,0.3);height:4em;line-height:4em;">other</div>
    <div style="background-color:rgba(0,255,0,0.3);height:3em;line-height:3em;"
         v-xy-keep-top>Keep top</div>
    scroll me down
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        status: ''
      }
    },
    methods: {
      onBottom() {
        alert('bottom')
      },
      onPullRefresh(stop) {
        stop()
      }
    },
    mounted: function() {
      //   setTimeout(() => {
      //     window.scrollTo(0, 500)
      //   }, 500)
    }
  }
</script>

<style lang="scss" scoped>
  .sample {
    height: 200vh;
    line-height: 100vh;
    text-align: center;
    box-shadow: 0 0 50px 0 #333 inset;
  }
</style>
