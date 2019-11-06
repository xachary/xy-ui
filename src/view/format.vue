<template>
    <div>
        <h3>时间格式化</h3>
        <hr>
        <div>yyyy-MM-dd hh:mm:ss</div>
        <div>{{$xyFormat.date.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')}}</div>
        <div>hh:mm:ss</div>
        <div>{{$xyFormat.date.formatDate(new Date(), 'hh:mm:ss')}}</div>
        <h3>相对日期</h3>
        <hr>
        <div>{{$xyFormat.date.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')}}</div>
        <div>{{$xyFormat.date.relativeDate(new Date())}}</div>
        <br>
        <div>{{$xyFormat.date.formatDate(new Date() - 1000*60, 'yyyy-MM-dd hh:mm:ss')}}</div>
        <div>{{$xyFormat.date.relativeDate(new Date() - 1000*60)}}</div>
        <br>
        <div>{{$xyFormat.date.formatDate(new Date() - 1000*60*5, 'yyyy-MM-dd hh:mm:ss')}}</div>
        <div>{{$xyFormat.date.relativeDate(new Date() - 1000*60*5)}}</div>
        <br>
        <div>{{$xyFormat.date.formatDate(new Date() - 1000*60*30, 'yyyy-MM-dd hh:mm:ss')}}</div>
        <div>{{$xyFormat.date.relativeDate(new Date() - 1000*60*30)}}</div>
        <br>
        <div>{{$xyFormat.date.formatDate(new Date() - 1000*60*60, 'yyyy-MM-dd hh:mm:ss')}}</div>
        <div>{{$xyFormat.date.relativeDate(new Date() - 1000*60*60)}}</div>
        <br>
        <div>{{$xyFormat.date.formatDate(new Date() - 1000*60*60*24, 'yyyy-MM-dd hh:mm:ss')}}</div>
        <div>{{$xyFormat.date.relativeDate(new Date() - 1000*60*60*24)}}</div>
        <br>
        <div>{{$xyFormat.date.formatDate(new Date() - 1000*60*60*24*3, 'yyyy-MM-dd hh:mm:ss')}}</div>
        <div>{{$xyFormat.date.relativeDate(new Date() - 1000*60*60*24*3)}}</div>
        <br>
        <div>{{$xyFormat.date.formatDate(new Date() - 1000*60*60*24*4, 'yyyy-MM-dd hh:mm:ss')}}</div>
        <div>{{$xyFormat.date.relativeDate(new Date() - 1000*60*60*24*4)}}</div>
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
    },
    mounted: function () {
    }
}
</script>

<style lang="scss" scoped>
</style>
