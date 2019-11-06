<template>
    <div
        class="lazy-load"
        :style="{'width':width,'height':height}"
    >
        <img
            v-lazy="src"
            :class="{'lazy-cover':size==='cover','lazy-contain':size==='contain'}"
            :error-img="errorImg"
        >
    </div>
</template>

<script>
export default {
    name: 'xy-lazyload',
    props: {
        // 宽（样式值）
        width: {
            type: String,
            default: ''
        },
        // 高（样式值）
        height: {
            type: String,
            default: ''
        },
        // 图片地址
        src: {
            type: String,
            default: ''
        },
        // 尺寸
        size: {
            type: String,
            default: ''
        },
        // 自定义错误图片
        errorImg: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
        }
    },
    computed: {
    },
    beforeMount() {
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<style lang="scss">
@import '~@/lib/scss/style';
</style>