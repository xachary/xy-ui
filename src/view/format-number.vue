<template>
    <div class="pad">
        <h3>Format</h3>
        
        <div>'100.1234' -> {{'100.1234' | $xyFormat.number.format}}</div>
        <div>'0' -> {{'0' | $xyFormat.number.format}}</div>
        <div>'0001234' -> {{'0001234' | $xyFormat.number.format}}</div>
        <div>'00.123' -> {{'00.123' | $xyFormat.number.format}}</div>
        <div>'...1234' -> {{'...1234' | $xyFormat.number.format}}</div>
        <div>'.1.2..3' -> {{'.1.2..3' | $xyFormat.number.format}}</div>
        <div>'123..31' -> {{'123..31' | $xyFormat.number.format}}</div>
        <div>'abc' -> {{'abc' | $xyFormat.number.format}}</div>
        <div>'123abc' -> {{'123abc' | $xyFormat.number.format}}</div>
        <div>'abc123' -> {{'abc123' | $xyFormat.number.format}}</div>
        <div>'-1a2b3c2.34' -> {{'-1a2b3c2.34' | $xyFormat.number.format}}</div>
        <div>'123.0000' -> {{'123.0000' | $xyFormat.number.format}}</div>
        <div>'123.0012' -> {{'123.0012' | $xyFormat.number.format}}</div>
        <div>'123.' -> {{'123.' | $xyFormat.number.format}}</div>

        <h4>Show fixed</h4>
        <div>'123.5678' -> '{{'123.5678' | $xyFormat.number.format({fixed:1})}}'</div>
        <div>'123.5678' -> '{{'123.5678' | $xyFormat.number.format({fixed:2})}}'</div>
        <div>'123.5678' -> '{{'123.5678' | $xyFormat.number.format({fixed:6})}}'</div>

        <h4>Show comma</h4>
        <div>'123456789.1234' -> '{{'123456789.1234' | $xyFormat.number.format({comma:true})}}'</div>
        <div>'-123456789.1234' -> '{{'-123456789.1234' | $xyFormat.number.format({comma:true})}}'</div>

        <h4>Show plus</h4>
        <div>'1234.5678' -> '{{'1234.5678' | $xyFormat.number.format({plus:true})}}'</div>
        <div>'-1234.5678' -> '{{'-1234.5678' | $xyFormat.number.format({plus:true})}}'</div>

        <h4>Mixed</h4>
        <div>'-123456--789.01-2.3' -> '{{'-123456--789.01-2.3' | $xyFormat.number.format({fixed:2,comma:true,plus:true})}}'</div>
        <div>'123456--789.01-2.3' -> '{{'123456--789.01-2.3' | $xyFormat.number.format({fixed:2,comma:true,plus:true})}}'</div>

        <h3>Number after point</h3>
        
        <div>100.2345 -> '{{100.1234 | $xyFormat.number.numberAfterPoint}}'</div>
        <div>'100.1200' -> '{{'100.1200' | $xyFormat.number.numberAfterPoint}}'</div>
        <div>100 -> '{{100 | $xyFormat.number.numberAfterPoint}}'</div>
        <div>0.1 -> '{{0.1 | $xyFormat.number.numberAfterPoint}}'</div>

        <h4>Show fixed</h4>
        <div>100.2345 -> '{{100.2345 | $xyFormat.number.numberAfterPoint(2)}}'</div>
        <div>100 -> '{{100 | $xyFormat.number.numberAfterPoint(2)}}'</div>
        <br />
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
