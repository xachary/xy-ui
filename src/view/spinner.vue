<template>
  <div class="sample">
    <h3>Button Loading</h3>
    <button @click="onClick">Submit</button>
    <h4>Default</h4>
    <div>
      测试测试测试测试测试测试测试测试测试Sphinx<xy-spinner v-model="loading"></xy-spinner>x测试测试测试
    </div>
    <p style="text-align:center">
      <xy-spinner v-model="loading"></xy-spinner>
    </p>
    <h4>Color</h4>
    <div>
      测试测试测试测试测试测试测试测试测试Sphinx<xy-spinner v-model="loading"
                  color="red"></xy-spinner>x测试测试测试
    </div>
    <div>
      测试测试测试测试测试测试测试测试测试Sphinx<xy-spinner v-model="loading"
                  color="green"></xy-spinner><span>x测试测试测试</span>
    </div>
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
