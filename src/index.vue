<template>
  <div>
    <div>
      <router-link to="/lazyload">lazyload</router-link>
    </div>
    <div>
      <router-link to="/slider">slider</router-link>
    </div>
    <div>
      <router-link to="/keep-top">keep-top</router-link>
    </div>
    <div>
      <router-link to="/pull-refresh">pull-refresh</router-link>
    </div>
    <div>
      <router-link to="/btn-act">btn-act</router-link>
    </div>
    <div>
      <router-link to="/time">time</router-link>
    </div>
    <div>
      <router-link to="/format-common">format-common</router-link>
    </div>
    <div>
      <router-link to="/format-date">format-date</router-link>
    </div>
    <div>
      <router-link to="/format-number">format-number</router-link>
    </div>
    <div>
      <router-link to="/list-status">list-status</router-link>
    </div>
    <div>
      <router-link to="/scroll-bottom">scroll-bottom</router-link>
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
