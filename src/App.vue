<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import "regenerator-runtime/runtime";
import Vue from 'vue'
import VueRouter from 'vue-router'
//
import xyUi from '@/lib'
//
Vue.use(VueRouter)
Vue.use(xyUi)

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

<style src="../demo/iconfont/iconfont.css"></style>
<style src="../demo/demo.css"></style>