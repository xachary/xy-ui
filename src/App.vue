<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
//
import xyUi from '@/lib'
//
Vue.use(VueRouter)

export default {
  name: 'app',
  data() {
    return {}
  },
  methods: {},
  mounted: function () {
    console.log('app mounted')
  }
}
</script>

<style lang="scss">
</style>
