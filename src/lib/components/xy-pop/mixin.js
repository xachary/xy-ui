export default {
    model: {
        prop: 'show',
        event: 'change'
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '提示'
        },
        showTitle: {
            type: Boolean,
            default: true
        },
        msg: {
            type: String,
            default: ''
        },
        confirmText: {
            type: String,
            default: '确定'
        },
        // 确认手动隐藏弹窗
        confirmNotHide: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        }
    },
    computed: {

    },
    watch: {
        show(v) { }
    },
    created() {

    },
    mounted() {
        this.$emit('on-mounted')
    },
    beforeDestory() {

    },
    methods: {
        onTouchstart: function (e) {
            clearInterval(this.time)
            this.startY = e.touches[0].clientY
            this.speedY = 0
        },
        onTouchmove: function (e) {
            this.speedY = this.moveY - e.touches[0].clientY
            this.moveY = e.touches[0].clientY
            this.$refs.ct.scrollTo(0, this.lastH + this.startY - e.touches[0].clientY)
        },
        onTouchend: function (e) {
            let that = this
            this.lastH = this.$refs.ct.scrollTop + this.speedY * Math.abs(this.speedY)
            if (
                this.lastH >
                this.$refs.ct.scrollHeight - this.$refs.ct.offsetHeight
            ) {
                this.lastH = this.$refs.ct.scrollHeight - this.$refs.ct.offsetHeight
            }
            if (this.lastH < 0) {
                this.lastH = 0
            }
            this.time = this.$xyTool.move(
                this.$refs.ct.scrollTop,
                this.lastH,
                function (v) {
                    that.$refs.ct.scrollTo(0, v)
                },
                function () { },
                800,
                'ExpoEaseOut'
            )
        },
        onPrevent: function (e) { },
    },
    provide() {
        return {

        }
    }
}