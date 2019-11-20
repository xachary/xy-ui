<template>
    <div class="pad">
        <h3>Default value</h3>
        <hr />
        <div>'' -> '{{'' | $xyFormat.common.def('Empty')}}'</div>
        <div>0 -> {{0 | $xyFormat.common.def('Empty')}}</div>
        <h3>Combine filters</h3>
        <div>(number.numberAfterPoint + common.def):</div>
        <div>100 -> '{{100 | $xyFormat.tool.combine([$xyFormat.tool.currying($xyFormat.number.numberAfterPoint),$xyFormat.tool.currying($xyFormat.common.def,'Empty')])}}'</div>
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
