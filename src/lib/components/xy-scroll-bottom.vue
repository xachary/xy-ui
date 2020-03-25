<template>
</template>

<script>
export default {
    name: 'xy-scroll-bottom',
    props: {
        threshold: {
            type: String,
            default: '0'
        },
        paused: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            done: true,
            onScroll: null
        }
    },
    methods: {
    },
    mounted: function () {
        let that = this
        that.onScroll = function () {
            let threshold = parseInt(that.threshold)
            threshold = isNaN(threshold) ? 0 : threshold
            // console.log(`${window.scrollY} + ${threshold} >= ${document.body.scrollHeight} - ${window.innerHeight} = ${document.body.scrollHeight - window.innerHeight}`)
            if (window.scrollY + threshold >= document.body.scrollHeight - window.innerHeight) {
                if (!that.done) {
                    that.done = true
                    if (!that.paused) {
                        that.$emit('on-bottom')
                        console.log('reach bottom')
                    }
                }
            } else {
                that.done = false
            }
        }
        window.addEventListener('scroll', that.onScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll)
    }
}
</script>