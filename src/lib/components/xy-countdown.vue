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
            this.now = (new Date()).getTime()
            let snap = this.tm - this.now
            if (snap >= 0) {
                this.day = Math.floor(snap / 86400000) // 1000 / 60 / 60 / 24
                this.hour = Math.floor((snap % 86400000) / 3600000) // 1000 / 60 / 60
                this.min = Math.floor((snap % 3600000) / 60000) // 1000 / 60
                this.sec = Math.floor((snap % 60000) / 1000) // 1000

                if (snap <= 1000) {
                    clearInterval(this.timer)
                    this.$emit('finish', this.now)
                }
                this.$emit('change', this.now)
            }
            //        console.log(snap)
        },
        start() {
            this.tm = this.tempTime.getTime()
            if (this.now < this.tm) {
                clearInterval(this.timer)
                this.timer = setInterval(() => {
                    this.update()
                }, 1000)
                this.update()
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
        if (this.showTime) {
            clearInterval(this.timer)
            this.timer = setInterval(() => {
                this.update()
            }, 1000)
            this.update()
        } else {
            this.start()
        }
    },
    beforeDestroy: function () {
        clearInterval(this.timer)
    }
}
</script>