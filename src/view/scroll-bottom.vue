<template>
    <div class="sample">
        <xy-scroll-bottom
            threshold="0"
            @on-bottom="onBottom"
        ></xy-scroll-bottom>
        scroll me down
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
        onBottom() {
            alert('bottom')
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
  box-shadow: 0 0 50px 0 #333 inset;
}
</style>
