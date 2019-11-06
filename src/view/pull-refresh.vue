<template>
    <div v-xy-pull-refresh="onPullRefresh">
        <div class="sample">
            pull me down{{status}}
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import xyUi from '@/lib'

Vue.directive(xyUi.directives.xyPullRefresh.name, xyUi.directives.xyPullRefresh)

export default {
    components: {
    },
    data() {
        return {
            status: ''
        }
    },
    methods: {
        onPullRefresh(stop) {
            let that = this
            this.status = '(loading)'
            setTimeout(function () {
                stop()
                that.status = ''
            }, 2000)
        }
    },
    mounted: function () {
    }
}
</script>

<style lang="scss" scoped>
.sample {
  height: 150vh;
  line-height: 100vh;
  text-align: center;
}
</style>
