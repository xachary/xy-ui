<template>
  <i class="xy-spinner"
     :class="{'xy-spinner--show':show}"
     ref="spinner">
    <span :style="{'border-left-color':parseColor,'border-right-color':parseColor}"></span>
    <span :style="{'border-left-color':parseColor,'border-right-color':parseColor}"></span>
  </i>
</template>

<script>
  export default {
    name: 'xy-spinner',
    model: {
      prop: 'show',
      event: 'change'
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        fontColor: ''
      }
    },
    computed: {
      parseColor() {
        return this.color ? this.color : this.fontColor
      }
    },
    watch: {},
    created() {},
    mounted() {
      let style = getComputedStyle(this.$refs.spinner.parentElement)
      this.fontColor = style.color
    },
    beforeDestroy() {},
    methods: {},
    inject: []
  }
</script>

<style lang="scss" scoped>
</style>