<template>
    <div class="pad">
        <h3>默认</h3>
        <xy-lazyload
            width="200px"
            height="100px"
            :src="imgTest"
            class="sample"
        ></xy-lazyload>
        <h3>图片contain</h3>
        <xy-lazyload
            width="300px"
            height="200px"
            :src="imgTest"
            size="contain"
            class="sample"
        ></xy-lazyload>
        <xy-lazyload
            width="300px"
            height="200px"
            :src="imgTest2"
            size="contain"
            class="sample"
        ></xy-lazyload>
        <h3>图片cover</h3>
        <xy-lazyload
            :src="imgTest"
            size="cover"
            class="sample"
        ></xy-lazyload>
        <h3>加载失败</h3>
        <xy-lazyload
            src="xxx"
            size="contain"
            class="sample"
        ></xy-lazyload>
        <h3>自定义加载失败图片</h3>
        <xy-lazyload
            src="xxx"
            size="contain"
            class="sample"
            :error-img="errorImg"
        ></xy-lazyload>
        <xy-lazyload
            src="xxx"
            size="cover"
            class="sample"
            :error-img="errorImg"
        ></xy-lazyload>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            imgTest: 'https://st.be-linker.com/data2/var/upload/imgs/advertising/1584437942497.png',//'https://placeimg.com/200/100/any?' + (new Date()).getTime(),
            imgTest2: 'https://placeimg.com/100/200/any?' + (new Date()).getTime(),
            imgTest3: 'https://placeimg.com/300/100/any?' + (new Date()).getTime(),
            errorImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAACuCAIAAAAgbqG5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5NGRkNjU3MC0xNDk0LWIzNGEtOGVlNy02YWU3YTY4NWE5MGEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODYzNjBGMzQ2MUI3MTFFOUFFNkVGRDAwNTRBNzE2NUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODYzNjBGMzM2MUI3MTFFOUFFNkVGRDAwNTRBNzE2NUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk0ZGQ2NTcwLTE0OTQtYjM0YS04ZWU3LTZhZTdhNjg1YTkwYSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NGRkNjU3MC0xNDk0LWIzNGEtOGVlNy02YWU3YTY4NWE5MGEiLz4gPC9y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'
        }
    },
    methods: {
    },
    mounted: function () {
    }
}
</script>

<style lang="scss" scoped>
.sample {
  width: 300px;
  height: 150px;
  box-shadow: 0 0 5px 0 #999;
  margin: 10px auto;
}
</style>
