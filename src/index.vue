<template>
  <div>
    <h3>
      <router-link to="/lazyload"><span class="iconfont icon-image"></span>Lazyload</router-link>
    </h3>

    <h3>
      <router-link to="/slider"><span class="iconfont icon-Slide-LeftRight1"></span>Slider</router-link>
    </h3>

    <h3>
      <router-link to="/keep-top"><span class="iconfont icon-guding"></span>Keep-top</router-link>
    </h3>

    <h3>
      <router-link to="/pull-refresh"><span class="iconfont icon-down2"></span>Pull refresh</router-link>
    </h3>

    <h3>
      <router-link to="/btn-act"><span class="iconfont icon-anniu1"></span>Btn act</router-link>
    </h3>

    <h3>
      <router-link to="/time"><span class="iconfont icon-time1"></span>Time</router-link>
    </h3>

    <h3>
      <router-link to="/format-common"><span class="iconfont icon-text"></span>Format common</router-link>
    </h3>

    <h3>
      <router-link to="/format-date"><span class="iconfont icon-zifugeshizhuandatetimegeshi"></span>Format date</router-link>
    </h3>

    <h3>
      <router-link to="/format-number"><span class="iconfont icon-number"></span>Format number</router-link>
    </h3>

    <h3>
      <router-link to="/list-status"><span class="iconfont icon-icon37"></span>List status</router-link>
    </h3>

    <h3>
      <router-link to="/tool"><span class="iconfont icon-tool"></span>Tool</router-link>
    </h3>

    <h3>
      <router-link to="/validate"><span class="iconfont icon-check"></span>Validate</router-link>
    </h3>

    <h3>
      <router-link to="/scroll-bottom"><span class="iconfont icon-up"></span>Scroll bottom</router-link>
    </h3>

    <h3>
      <router-link to="/image-pop"><span class="iconfont icon-preview"></span>Image pop</router-link>
    </h3>

    <h3>
      <router-link to="/html-viewer"><span class="iconfont icon-html"></span>Html viewer</router-link>
    </h3>

    <h3>
      <router-link to="/pop"><span class="iconfont icon-popup"></span>Pop</router-link>
    </h3>
  </div>
</template>

<script>
  import Vue from 'vue'
  import xyUi from '@/lib'

  Vue.use(xyUi)

  export default {
    name: 'app',
    components: {},
    data() {
      return {}
    },
    methods: {},
    mounted: function() {}
  }
</script>

<style lang="scss">
</style>
