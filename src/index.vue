<template>
  <div>
    <h3>
      <router-link to="/lazyload">lazyload</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/slider">slider</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/keep-top">keep-top</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/pull-refresh">pull-refresh</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/btn-act">btn-act</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/time">time</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/format-common">format-common</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/format-date">format-date</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/format-number">format-number</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/list-status">list-status</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/scroll-bottom">scroll-bottom</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/tool">tool</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/image-pop">image-pop</router-link>
    </h3>
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
