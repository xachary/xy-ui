<template>
    <div class="pad">
        <xy-image-pop
            :visible.sync="visible"
            :imgs="imgs"
            :index="index"
            @on-change="onChange"
            @on-close="onClose"
        ></xy-image-pop>
        <h3>sample</h3>
        <section>
            <img
                v-for="(item,index) in imgs"
                :src="item.msrc||item.src"
                :key="index"
                @click="onImagePop(index)"
                :data-id="item.id"
                :id="item.id"
            >
        </section>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        let imgs = [
            {
                src: 'http://dummyimage.com/100x100',
                // msrc: 'http://dummyimage.com/100x100',
                title: '标题：1',
                id: 'aaa'
            },
            {
                src: 'http://dummyimage.com/500x3000',
                msrc: 'http://dummyimage.com/50x300',
                title: '标题：2',
                id: 'bbb'
            },
            {
                src: 'http://dummyimage.com/2000x1000',
                msrc: 'http://dummyimage.com/200x100',
                // title: '标题：3'
            }
        ]
        return {
            visible: false,
            //
            imgs: imgs,
            index: 0
        }
    },
    methods: {
        onChange(index) {
            console.log(index)
        },
        onClose() {
            console.log('close')
        },
        onImagePop(index) {
            this.index = index
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
