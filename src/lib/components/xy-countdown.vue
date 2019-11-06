<style lang="scss"
       scoped>
.xy-timing {
  display: inline-block;
}
</style>
<template>
    <div class="xy-timing">
        <template v-if="showTime">
            <span v-text="current"></span>
        </template>
        <template v-if="!showTime">
            <span v-if="day>0">{{day}}</span><label v-if="day>0">天</label><span>{{hourStr}}</span><label for="">:</label><span>{{minStr}}</span><label for="">:</label><span>{{secStr}}</span>
        </template>
    </div>
</template>

<script>
export default {
    name: 'xy-countdown',
    props: {
        time: {
            type: Date,
            default: function () { return new Date() }
        },
        showTime: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        hourStr() {
            let that = this
            return that.hour.toString()
                .padStart(2, '0')
        },
        minStr() {
            let that = this
            return that.min.toString()
                .padStart(2, '0')
        },
        secStr() {
            let that = this
            return that.sec.toString()
                .padStart(2, '0')
        }
    },
    data() {
        let now = (new Date()).getTime()
        return {
            day: 0,
            hour: 0,
            min: 0,
            sec: 0,
            tm: 0,
            now: now,
            timer: null,
            current: '',
            tempTime: null
        }
    },
    methods: {
        update() {
            let that = this
            that.now = (new Date()).getTime()
            if (that.showTime) {
                that.current = this.$xyFormat.date.formatDate(new Date(), 'hh:mm:ss')
                that.$emit('change', that.now)
            } else {
                let snap = that.now - that.tm
                if (snap >= 0) {
                    that.day = Math.floor(snap / 86400000) // 1000 / 60 / 60 / 24
                    that.hour = Math.floor((snap % 86400000) / 3600000) // 1000 / 60 / 60
                    that.min = Math.floor((snap % 3600000) / 60000) // 1000 / 60
                    that.sec = Math.floor((snap % 60000) / 1000) // 1000

                    that.$emit('change', that.now)
                }
            }
        },
        update2() {
            let that = this
            that.now = (new Date()).getTime()
            let snap = that.tm - that.now
            if (snap >= 0) {
                that.day = Math.floor(snap / 86400000) // 1000 / 60 / 60 / 24
                that.hour = Math.floor((snap % 86400000) / 3600000) // 1000 / 60 / 60
                that.min = Math.floor((snap % 3600000) / 60000) // 1000 / 60
                that.sec = Math.floor((snap % 60000) / 1000) // 1000

                if (snap <= 1000) {
                    clearInterval(that.timer)
                    that.$emit('finish', that.now)
                }
                that.$emit('change', that.now)
            }
            //        console.log(snap)
        },
        start() {
            let that = this
            that.tm = that.tempTime.getTime()
            if (that.now >= that.tm) {
                clearInterval(that.timer)
                that.timer = setInterval(function () {
                    that.update()
                }, 1000)
                that.update()
            } else {
                clearInterval(that.timer)
                that.timer = setInterval(function () {
                    that.update2()
                }, 1000)
                that.update()
            }
        },
        pause() {
            clearInterval(this.timer)
        },
        reset() {

        }
    },
    beforeMount() {
        this.tempTime = this.time
    },
    mounted: function () {
        let that = this
        if (that.showTime) {
            clearInterval(that.timer)
            that.timer = setInterval(function () {
                that.update()
            }, 1000)
            that.update()
        } else {
            // that.start()
        }
    },
    beforeDestroy: function () {
        let that = this
        clearInterval(that.timer)
    }
}
</script>