<template>
    <div class="pad">
        <h3>当前时间</h3>

        <xy-timer></xy-timer>
        <h3>计时</h3>

        <xy-timing
            ref="timing"
            on-change="onChange"
        ></xy-timing>
        <div>
            <button @click="onStart">start</button>
            <button @click="onPause">pause</button>
            <button @click="onReset">reset</button>
        </div>
        <h3>从指定时间开始计时</h3>

        <xy-continue
            :time="new Date(1573009094357)"
            @on-change="onChange"
        >
        </xy-continue>
        <h3>倒计时</h3>

        <xy-countdown
            :time="new Date(Date.now() + 1000*10)"
            @on-finish="onFinish"
            @on-change="onChange"
        >
        </xy-countdown>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
        onChange() {
            // console.log(time)
        },
        onFinish() {
            console.log('Countdown finish')
        },
        onStart() {
            this.$refs.timing.start()
        },
        onPause() {
            this.$refs.timing.pause()
        },
        onReset() {
            this.$refs.timing.reset()
        }
    },
    mounted: function () {
    }
}
</script>

<style lang="scss" scoped>
.sample {
}
</style>
