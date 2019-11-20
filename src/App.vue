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
table {
  width: 96vw;
  margin: 2vw auto;
  table-layout: fixed;
  font-size: 12px;
  color: #333;
}
table th,
table td {
  border: 1px solid #999;
  padding: 0.5em;
  text-align: center;
  word-break: break-all;
}

h3 {
  padding: 0 0.5em;
  background-color: rgba(0, 255, 0, 0.2);
}

h4 {
  background-color: #eee;
  padding: 0 1em;
}

a {
  cursor: pointer;
}

button {
  border: 1px solid #666;
  padding: 5px;
  cursor: pointer;
}

.pad > div {
  padding: 0 1em;
}
</style>
