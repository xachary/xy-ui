<template>
    <div class="sample">
        <h3>Sleep</h3>
        <div>
            <button @click="onStart">start pause 2s</button>
        </div>
        <h3>Broswer</h3>
        {{$xyTool.browser()}}
        <h3>ScrollBottom</h3>
        <button @click="$xyTool.scrollBottom()">Click me</button>
        <div style="height: 300vh"></div>
        <h3>ScrollTop</h3>
        <button @click="$xyTool.scrollTop()">Click me</button>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            status: ''
        }
    },
    methods: {
        async onStart() {
            await this.$xyTool.sleep(2000)
            alert('2s done')
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
