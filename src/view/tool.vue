<template>
  <div class="sample">
    <h3>ScrollBottom</h3>
    <div><button @click="$xyTool.scrollBottom()">Click me</button></div>
    <h3>Delay</h3>
    <div>
      <button @click="onStart">Delay 2s</button>
    </div>
    <h3>Broswer</h3>
    {{$xyTool.browser()}}
    <h3>MoveTool</h3>
    <div style="border:1px solid blue;margin:10px;padding:100px 0;position:relative;">
      <i style="width:10px;height:10px;border-radius:50%;background:red;display:block;position:absolute;transform:translate(-5px,-5px);"
         :style="{top:top+'%',left:left+'%'}"></i>
    </div>
    <div>
      <button @click="onLinear">Linear</button><br><br>
      <button @click="onCircularEaseInOut">CircularEaseInOut</button><br><br>
      <button @click="onCubicEaseOut">CubicEaseOut</button><br><br>
      <button @click="onQuartEaseOut">QuartEaseOut</button><br><br>
      <button @click="onExpoEaseOut">ExpoEaseOut</button><br><br>
      <button @click="onLinearCircularEaseInOut">Linear + CircularEaseInOut</button><br><br>
      <button @click="onCubicEaseOutExpoEaseOut">CubicEaseOut + ExpoEaseOut</button><br><br>
    </div>
    <div style="height: 100vh"></div>
    <h3>ScrollTop</h3>
    <div><button @click="$xyTool.scrollTop()">Click me</button></div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        status: '',
        top: 0,
        left: 0
      }
    },
    methods: {
      onStart() {
        this.$xyTool.delay(2000).then(function() {
          alert('2s done')
        })
      },
      onLinear() {
        var that = this
        this.top = 0
        this.left = 0
        this.$xyTool.move(
          0,
          100,
          function(v) {
            that.left = v
          },
          function() {
            console.log('done')
          },
          1000,
          'Linear'
        )
      },
      onCircularEaseInOut() {
        var that = this
        this.top = 0
        this.left = 0
        this.$xyTool.move(
          0,
          100,
          function(v) {
            that.left = v
          },
          function() {
            console.log('done')
          },
          1000,
          'CircularEaseInOut'
        )
      },
      onCubicEaseOut() {
        var that = this
        this.top = 0
        this.left = 0
        this.$xyTool.move(
          0,
          100,
          function(v) {
            that.left = v
          },
          function() {
            console.log('done')
          },
          1000,
          'CubicEaseOut'
        )
      },
      onQuartEaseOut() {
        var that = this
        this.top = 0
        this.left = 0
        this.$xyTool.move(
          0,
          100,
          function(v) {
            that.left = v
          },
          function() {
            console.log('done')
          },
          1000,
          'QuartEaseOut'
        )
      },
      onExpoEaseOut() {
        var that = this
        this.top = 0
        this.left = 0
        this.$xyTool.move(
          0,
          100,
          function(v) {
            that.left = v
          },
          function() {
            console.log('done')
          },
          1000,
          'ExpoEaseOut'
        )
      },
      onLinearCircularEaseInOut() {
        var that = this
        this.top = 0
        this.left = 0
        this.$xyTool.move(
          0,
          100,
          function(v) {
            that.left = v
          },
          function() {
            console.log('done1')
          },
          1000,
          'Linear'
        )
        this.$xyTool.move(
          0,
          100,
          function(v) {
            that.top = v
          },
          function() {
            console.log('done2')
          },
          1000,
          'CircularEaseInOut'
        )
      },
      onCubicEaseOutExpoEaseOut() {
        var that = this
        this.top = 0
        this.left = 0
        this.$xyTool.move(
          0,
          100,
          function(v) {
            that.left = v
          },
          function() {
            console.log('done1')
          },
          1000,
          'CubicEaseOut'
        )
        this.$xyTool.move(
          0,
          100,
          function(v) {
            that.top = v
          },
          function() {
            console.log('done2')
          },
          1000,
          'ExpoEaseOut'
        )
      }
    },
    mounted: function() {}
  }
</script>

<style lang="scss" scoped>
  .sample {
  }
</style>
