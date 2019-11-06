<template>
  <div>
    <div>
      <router-link to="/lazyload">lazyload</router-link>
    </div>
    <div>
      <router-link to="/slider">slider</router-link>
    </div>
    <div>
      <router-link to="/pull-refresh">pull-refresh</router-link>
    </div>
    <div>
      <router-link to="/time">time</router-link>
    </div>
    <div>
      <router-link to="/image-pop">image-pop</router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import xyUi from '@/lib'

Vue.use(xyUi)

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
  },
  mounted: function () {
  }
}
</script>

<style lang="scss">
</style>
