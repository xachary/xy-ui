<template>
    <div>
        <div
            class="pad"
            v-xy-pull-refresh
        >
            <h3>Image pop</h3>
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
        <xy-image-pop
            :visible.sync="visible"
            :imgs="imgs"
            :index="index"
            @on-change="onChange"
            @on-close="onClose"
        ></xy-image-pop>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        let imgs = [
            {
                src: 'http://dummyimage.com/300x300',
                // msrc: 'http://dummyimage.com/100x100=Origin+image',
                title: '标题：1',
                id: 'aaa'
            },
            {
                src: 'http://dummyimage.com/1000x600&text=1000x600(origin)',
                msrc: 'http://dummyimage.com/100x60&text=100x60(thumbnail)',
                title: '标题：2',
                id: 'bbb'
            },
            {
                src: 'http://dummyimage.com/2000x1000&text=2000x1000(origin)',
                msrc: 'http://dummyimage.com/200x100&text=200x100(thumbnail)'
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
