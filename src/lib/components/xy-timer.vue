<style lang="scss"
       scoped>
.xy-timer {
  display: inline-block;
}
</style>
<template>
    <div class="xy-timer">
        <span v-text="current"></span>
    </div>
</template>

<script>
export default {
    name: 'xy-timer',
    props: {
    },
    computed: {
    },
    data() {
        return {
            current: '',
        }
    },
    methods: {
        update() {
            let that = this
            that.now = (new Date()).getTime()
            that.current = this.$xyFormat.date.format(new Date(), 'hh:mm:ss')
        }
    },
    beforeMount() {
    },
    mounted: function () {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
            this.update()
        }, 1000)
        this.update()
    },
    beforeDestroy: function () {
        clearInterval(this.timer)
    }
}
</script>