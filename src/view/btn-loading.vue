<template>
  <div class="sample">
    <h3>Button Loading Default</h3>
    <button v-xy-btn-loading="loading"
            @click="onClick">Submit</button>
    <button v-xy-btn-loading="loading"
            @click="onClick"><i>Submit</i></button>
    <h3>Button Loading icon only</h3>
    <button v-xy-btn-loading.icon="loading"
            @click="onClick">Submit</button>
    <h3>Button Loading icon only and keep width</h3>
    <button v-xy-btn-loading.icon.keep="loading"
            @click="onClick"><i>Submit</i></button>
    <h3>Button Loading with act</h3>
    <button v-xy-btn-act:style.scale
            v-xy-btn-loading.icon.keep="loading"
            @click="onClick">scale</button>
    <button v-xy-btn-act:style.color="'rgba(0, 0, 255, 0.2)'"
            v-xy-btn-loading.icon.keep="loading"
            @click="onClick">color</button>
    <button v-xy-btn-act:style.grayscale
            style="background-color:yellow"
            v-xy-btn-loading.icon.keep="loading"
            @click="onClick">grayscale</button>
    <button v-xy-btn-act:style.wave="'rgba(255, 0, 0, 0.5)'"
            v-xy-btn-loading="loading"
            @click="onClick">wave</button>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        loading: false
      }
    },
    methods: {
      onClick() {
        var that = this
        this.loading = true
        console.log('loading')
        setTimeout(function() {
          that.loading = false
          console.log('loaded')
        }, 3000)
      }
    },
    mounted: function() {}
  }
</script>

<style lang="scss" scoped>
  .sample {
    button {
      padding: 1em 2em;
      border: 1px solid #333;
      margin: 1em;
      display: block;
      text-align: center;
    }
  }
</style>
