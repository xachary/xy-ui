<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import 'regenerator-runtime/runtime'
  export default {
    name: 'app',
    data() {
      return {}
    },
    methods: {},
    mounted: function() {
      console.log('app mounted')
    }
  }
</script>

<style src="../demo/iconfont/iconfont.css"></style>
<style src="../demo/demo.css"></style>