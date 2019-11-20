<template>
    <div class="pad">
        <h3>Format</h3>
        <hr />
        <div>yyyy-MM-dd hh:mm:ss</div>
        <div>{{new Date() | $xyFormat.date.format}}</div>
        <!-- <div>{{$xyFormat.date.format(new Date())}}</div> -->
        <div>hh:mm:ss</div>
        <div>{{new Date() | $xyFormat.date.format('hh:mm:ss')}}</div>
        <!-- <div>{{$xyFormat.date.format(new Date(), 'hh:mm:ss')}}</div> -->
        <h3>Relative date</h3>
        <hr />
        <div>
            {{new Date() | $xyFormat.date.format('yyyy-MM-dd hh:mm:ss')}}
        </div>
        <div>{{new Date() | $xyFormat.date.relativeDate}}</div>
        <br />
        <div>
            {{new Date() - 1000*60 | $xyFormat.date.format('yyyy-MM-dd hh:mm:ss')}}
        </div>
        <div>{{new Date() - 1000*60 | $xyFormat.date.relativeDate}}</div>
        <br />
        <div>
            {{new Date() - 1000*60*5 | $xyFormat.date.format('yyyy-MM-dd hh:mm:ss')}}
        </div>
        <div>{{new Date() - 1000*60*5 | $xyFormat.date.relativeDate}}</div>
        <br />
        <div>
            {{new Date() - 1000*60*30 | $xyFormat.date.format('yyyy-MM-dd hh:mm:ss')}}
        </div>
        <div>{{new Date() - 1000*60*30 | $xyFormat.date.relativeDate}}</div>
        <br />
        <div>
            {{new Date() - 1000*60*60 | $xyFormat.date.format('yyyy-MM-dd hh:mm:ss')}}
        </div>
        <div>{{new Date() - 1000*60*60 | $xyFormat.date.relativeDate}}</div>
        <br />
        <div>
            {{new Date() - 1000*60*60*24 | $xyFormat.date.format('yyyy-MM-dd hh:mm:ss')}}
        </div>
        <div>{{new Date() - 1000*60*60*24 | $xyFormat.date.relativeDate}}</div>
        <br />
        <div>
            {{new Date() - 1000*60*60*24*3 | $xyFormat.date.format('yyyy-MM-dd hh:mm:ss')}}
        </div>
        <div>{{new Date() - 1000*60*60*24*3 | $xyFormat.date.relativeDate}}</div>
        <br />
        <div>
            {{new Date() - 1000*60*60*24*4 | $xyFormat.date.format('yyyy-MM-dd hh:mm:ss')}}
        </div>
        <div>{{new Date() - 1000*60*60*24*4 | $xyFormat.date.relativeDate}}</div>
        <h3>Today</h3>
        <hr />
        <div>{{ $xyFormat.date.today('yyyy-MM-dd hh:mm:ss') }}</div>
        <h3>Start date</h3>
        <hr />
        <div>
            {{new Date() | $xyFormat.date.startTime('yyyy-MM-dd hh:mm:ss')}}
        </div>
        <h3>End date</h3>
        <hr />
        <div>{{new Date() | $xyFormat.date.endTime('yyyy-MM-dd hh:mm:ss')}}</div>
        <h3>Week start date</h3>
        <hr />
        <div>
            {{new Date() | $xyFormat.date.weekStartTime('yyyy-MM-dd hh:mm:ss')}}
        </div>
        <h3>Week end date</h3>
        <hr />
        <div>
            {{new Date() | $xyFormat.date.weekEndTime('yyyy-MM-dd hh:mm:ss')}}
        </div>
        <h3>Month start date</h3>
        <hr />
        <div>
            {{new Date() | $xyFormat.date.monthStartTime('yyyy-MM-dd hh:mm:ss')}}
        </div>
        <h3>Month end date</h3>
        <hr />
        <div>
            {{new Date() | $xyFormat.date.monthEndTime('yyyy-MM-dd hh:mm:ss')}}
        </div>
        <h3>Year start date</h3>
        <hr />
        <div>
            {{new Date() | $xyFormat.date.yearStartTime('yyyy-MM-dd hh:mm:ss')}}
        </div>
        <h3>Year end date</h3>
        <hr />
        <div>
            {{new Date() | $xyFormat.date.yearEndTime('yyyy-MM-dd hh:mm:ss')}}
        </div>
        <h3>Span seconds</h3>
        <hr />
        <div>{{new Date('2019/11/20') | $xyFormat.date.format}}</div>
        <div>{{new Date() | $xyFormat.date.format}}</div>
        <div>
            {{$xyFormat.date.timeSpanSecond(new Date('2019/11/20'),new Date())}}
            seconds
        </div>
        <h3>Span hours</h3>
        <hr />
        <div>{{new Date('2019/11/20') | $xyFormat.date.format}}</div>
        <div>{{new Date() | $xyFormat.date.format}}</div>
        <div>
            {{$xyFormat.date.timeSpanHour(new Date('2019/11/20'),new Date())}} hours
        </div>
        <h3>Span days</h3>
        <hr />
        <div>{{new Date('2019/11/11') | $xyFormat.date.format}}</div>
        <div>{{new Date() | $xyFormat.date.format}}</div>
        <div>
            {{$xyFormat.date.timeSpanDay(new Date('2019/11/11'),new Date())}} days
        </div>
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
