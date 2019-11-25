<style lang="scss"
       scoped>
.xy-timing {
  display: inline-block;
}
</style>
<template>
  <div class="xy-timing">
    <span v-if="day>0">{{day}}</span><label v-if="day>0">天</label><span>{{hourStr}}</span><label for="">:</label><span>{{minStr}}</span><label for="">:</label><span>{{secStr}}</span>
  </div>
</template>

<script>
export default {
  name: 'xy-timing',
  props: {
    auto: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    hourStr() {
      return this.hour.toString()
        .padStart(2, '0')
    },
    minStr() {
      return this.min.toString()
        .padStart(2, '0')
    },
    secStr() {
      return this.sec.toString()
        .padStart(2, '0')
    }
  },
  data() {
    let now = new Date()
    return {
      day: 0,
      hour: 0,
      min: 0,
      sec: 0,
      tm: 0,
      now: now,
      timer: null,
      tempTime: null,
      pauseTime: now,
      pauseLong: 0,
      time: now
    }
  },
  methods: {
    update() {
      let snap = this.now - this.tm
      if (snap >= 0) {
        this.day = Math.floor(snap / 86400000) // 1000 / 60 / 60 / 24
        this.hour = Math.floor((snap % 86400000) / 3600000) // 1000 / 60 / 60
        this.min = Math.floor((snap % 3600000) / 60000) // 1000 / 60
        this.sec = Math.floor((snap % 60000) / 1000) // 1000

        this.$emit('on-change', this.now)
      }
    },
    start() {
      this.now = Date.now()
      this.pauseLong = this.now - this.pauseTime
      this.tempTime = new Date(this.tempTime.getTime() + this.pauseLong)
      this.tm = this.tempTime.getTime()// + temp
      if (this.now >= this.tm) {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          this.now = Date.now()
          this.update()
        }, 1000)
        this.now = Date.now()
        this.update()
      }
    },
    pause() {
      this.pauseTime = this.now
      clearInterval(this.timer)
    },
    reset() {
      clearInterval(this.timer)

      this.now = Date.now()
      this.pauseTime = Date.now()
      this.time = new Date()
      this.tempTime = new Date()
      this.tm = this.tempTime.getTime()
      this.pauseLong = 0
      this.update()
    }
  },
  mounted: function () {
    this.tempTime = this.time
    if (this.auto) {
      this.pauseTime = Date.now()
      this.start()
    }
  },
  beforeDestroy: function () {
    clearInterval(this.timer)
  }
}
</script>