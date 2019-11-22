<template>
  <div>
    <h3>
      <router-link to="/lazyload">Lazyload</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/slider">Slider</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/keep-top">Keep-top</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/pull-refresh">Pull refresh</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/btn-act">Btn act</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/time">Time</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/format-common">Format common</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/format-date">Format date</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/format-number">Format number</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/list-status">List status</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/scroll-bottom">Scroll bottom</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/tool">Tool</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/validate">Validate</router-link>
    </h3>
    <hr />
    <h3>
      <router-link to="/image-pop">Image pop</router-link>
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
