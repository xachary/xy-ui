<template>
    <div>
        <xy-image-pop
            :visible.sync="visible"
            :imgs="imgs"
            :cur="cur"
            @change="onChange"
        ></xy-image-pop>
        <h3>sample</h3>
        <section>
            <img
                v-for="item in imgs"
                :src="item"
                :key="item"
                @click="onImagePop(item)"
            >
        </section>
        <h3>auto iteration, for html content</h3>
        <section v-html="html">
        </section>
    </div>
</template>

<script>
import Vue from 'vue'
import xyUi from '@/lib'

export default {
    components: {
        xyImagePop: xyUi.components.xyImagePop
    },
    data() {
        let now = (new Date()).getTime()
        let imgs = [`http://dummyimage.com/100x100`, `http://dummyimage.com/100x200`, `http://dummyimage.com/200x100`]
        return {
            visible: false,
            //
            imgs: imgs,
            cur: '',
            //
            html: `<img src="http://dummyimage.com/100x100">
      <img src="http://dummyimage.com/100x200">
      <img src="http://dummyimage.com/200x100">`
        }
    },
    methods: {
        onChange(type, data) {
            // let that = this
            // //        debugger
            // // 这里有setter, 可以改变预览图
            // data.img = this.imgTest3
            console.log([type, data])
        },
        onImagePop(cur) {
            this.cur = cur
            this.visible = !this.visible
        }
    },
    mounted: function () {
    }
}
</script>

<style lang="scss">
@import '~@/lib/scss/mixin';

h3 {
  margin: 5px;
}

section {
  display: flex;
  align-items: flex-start;
  background-color: #eee;
  img {
    width: 0;
    flex-grow: 1;
    margin: 5px;
  }
}
</style>
