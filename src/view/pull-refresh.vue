<template>
  <div v-xy-pull-refresh="onPullRefresh">
    <div class="sample">
      pull me down{{status}}
    </div>
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
      onPullRefresh(stop) {
        var that = this
        this.status = '(loading)'
        setTimeout(function() {
          stop()
          that.status = ''
        }, 2000)
      }
    },
    mounted: function() {}
  }
</script>

<style lang="scss" scoped>
  .sample {
    height: 150vh;
    line-height: 100vh;
    text-align: center;
  }
</style>
