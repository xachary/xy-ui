<template>
    <div>
        <h3>时间格式化</h3>
        <hr>
        <div>yyyy-MM-dd hh:mm:ss</div>
        <div>{{$xyFormat.date.formatDate(new Date())}}</div>
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
        <h3>今天开始时间</h3>
        <hr>
        <div>{{$xyFormat.date.today('yyyy-MM-dd hh:mm:ss')}}</div>
        <h3>日期开始时间</h3>
        <hr>
        <div>{{$xyFormat.date.startTime(new Date(),'yyyy-MM-dd hh:mm:ss')}}</div>
        <h3>日期结束时间</h3>
        <hr>
        <div>{{$xyFormat.date.endTime(new Date(),'yyyy-MM-dd hh:mm:ss')}}</div>
        <h3>本周开始时间</h3>
        <hr>
        <div>{{$xyFormat.date.weekStartTime(new Date(),'yyyy-MM-dd hh:mm:ss')}}</div>
        <h3>本周结束时间</h3>
        <hr>
        <div>{{$xyFormat.date.weekEndTime(new Date(),'yyyy-MM-dd hh:mm:ss')}}</div>
        <h3>本月开始时间</h3>
        <hr>
        <div>{{$xyFormat.date.monthStartTime(new Date(),'yyyy-MM-dd hh:mm:ss')}}</div>
        <h3>本月结束时间</h3>
        <hr>
        <div>{{$xyFormat.date.monthEndTime(new Date(),'yyyy-MM-dd hh:mm:ss')}}</div>
        <h3>当年开始时间</h3>
        <hr>
        <div>{{$xyFormat.date.yearStartTime(new Date(),'yyyy-MM-dd hh:mm:ss')}}</div>
        <h3>当年结束时间</h3>
        <hr>
        <div>{{$xyFormat.date.yearEndTime(new Date(),'yyyy-MM-dd hh:mm:ss')}}</div>
        <h3>时间相差秒</h3>
        <hr>
        <div>{{$xyFormat.date.formatDate(new Date('2019/11/20'))}}</div>
        <div>{{$xyFormat.date.formatDate(new Date())}}</div>
        <div>{{$xyFormat.date.timeSpanSecond(new Date('2019/11/20'),new Date())}} seconds</div>
        <h3>时间相差小时</h3>
        <hr>
        <div>{{$xyFormat.date.formatDate(new Date('2019/11/20'))}}</div>
        <div>{{$xyFormat.date.formatDate(new Date())}}</div>
        <div>{{$xyFormat.date.timeSpanHour(new Date('2019/11/20'),new Date())}} hours</div>
        <h3>时间相差日</h3>
        <hr>
        <div>{{$xyFormat.date.formatDate(new Date('2019/11/11'))}}</div>
        <div>{{$xyFormat.date.formatDate(new Date())}}</div>
        <div>{{$xyFormat.date.timeSpanDay(new Date('2019/11/11'),new Date())}} days</div>
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
