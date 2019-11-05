<template>
    <div>
        <h3>没有数据</h3>
        <xy-slider
            :data="data0"
            @on-change="onchange"
        >
            <template v-slot="item">
                <img
                    :src="item.src"
                    :alt="item.name"
                >
            </template>
        </xy-slider>
        <h3>只有1个数据</h3>
        <xy-slider
            :data="data1"
            @on-change="onchange"
        >
            <template v-slot="item">
                <img
                    :src="item.src"
                    :alt="item.name"
                >
            </template>
        </xy-slider>
        <h3>2个数据</h3>
        <xy-slider
            :data="data2"
            @on-change="onchange"
        >
            <template v-slot="item">
                <img
                    :src="item.src"
                    :alt="item.name"
                >
            </template>
        </xy-slider>
        <h3>3个数据</h3>
        <xy-slider
            :data="data3"
            @on-change="onchange"
        >
            <template v-slot="item">
                <img
                    :src="item.src"
                    :alt="item.name"
                >
            </template>
        </xy-slider>
        <h3>用background-image优化</h3>
        <xy-slider
            :data="data4"
            @on-change="onchange"
        >
            <template v-slot="item">
                <div :style="{'background-image':`url(${item.src})`,'background-size':'cover','background-position':'center'}">
                </div>
            </template>
        </xy-slider>
        <h3>用lazyload组件</h3>
        <xy-slider
            :data="data4"
            @on-change="onchange"
        >
            <template v-slot="item">
                <div class="lazy-load">
                    <img
                        v-lazy="item.src"
                        class="lazy-cover"
                        :alt="item.name"
                    >
                </div>
            </template>
        </xy-slider>
        <h3>缩放特效</h3>
        <xy-slider
            :data="data4"
            :scale="true"
            @on-change="onchange"
        >
            <template v-slot="item">
                <div :style="{'background-image':`url(${item.src})`,'background-size':'cover','background-position':'center'}">
                </div>
            </template>
        </xy-slider>
        <h3>自定义大小</h3>
        <xy-slider
            :data="data4"
            width="200px"
            height="100px"
            @on-change="onchange"
        >
            <template v-slot="item">
                <div :style="{'background-image':`url(${item.src})`,'background-size':'cover','background-position':'center'}">
                </div>
            </template>
        </xy-slider>
        <h3>不自动切换</h3>
        <xy-slider
            :data="data4"
            :auto="false"
            @on-change="onchange"
        >
            <template v-slot="item">
                <div :style="{'background-image':`url(${item.src})`,'background-size':'cover','background-position':'center'}">
                </div>
            </template>
        </xy-slider>
        <h3>所有属性（默认值）</h3>
        <xy-slider
            :data="data4"
            :interval="3000"
            :auto="true"
            :scale="false"
            width="100%"
            height="50%"
            @on-change="onchange"
        >
            <template v-slot="item">
                <div class="lazy-load">
                    <img
                        v-lazy="item.src"
                        class="lazy-cover"
                        :alt="item.name"
                    >
                </div>
            </template>
        </xy-slider>
    </div>
</template>

<script>
import Vue from 'vue'
import xyUi from '@/lib'

export default {
    components: {
        xySlider: xyUi.components.xySlider
    },
    data() {
        return {
            data0: [],
            data1: [],
            data2: [],
            data3: [],
            data4: []
        }
    },
    methods: {
        onchange(item, index, total) {
            console.log('onchange', item, index, total)
        }
    },
    mounted: function () {
        setTimeout(() => {
            this.data0 = []
            this.data1 = [
                {
                    id: '1',
                    name: '300*600',
                    src: 'http://dummyimage.com/300x600',
                    href: '#'
                }
            ]
            this.data2 = [
                {
                    id: '1',
                    name: '300*600',
                    src: 'http://dummyimage.com/300x600',
                    href: '#'
                }, {
                    id: '2',
                    name: '600*300',
                    src: 'http://dummyimage.com/600x300',
                    href: 'https://www.baidu.com/'
                }
            ]
            this.data3 = [
                {
                    id: '1',
                    name: '300*600',
                    src: 'http://dummyimage.com/300x600',
                    href: '#'
                }, {
                    id: '2',
                    name: '600*300',
                    src: 'http://dummyimage.com/600x300',
                    href: 'https://www.baidu.com/'
                }, {
                    id: '3',
                    name: '300*300',
                    src: 'http://dummyimage.com/300x300',
                    href: 'https://www.baidu.com/'
                }
            ]
            this.data4 = [
                {
                    id: '1',
                    name: '300*600',
                    src: 'http://dummyimage.com/300x600',
                    href: '#'
                }, {
                    id: '2',
                    name: '600*300',
                    src: 'http://dummyimage.com/600x300',
                    href: 'https://www.baidu.com/'
                }, {
                    id: '3',
                    name: '300*300',
                    src: 'http://dummyimage.com/300x300',
                    href: 'https://www.baidu.com/'
                }, {
                    id: '4',
                    name: '400*400',
                    src: 'http://dummyimage.com/400x400',
                    href: 'https://www.baidu.com/'
                }
            ]
        }, 500)
    }
}
</script>

<style lang="scss">
@import '~@/lib/scss/mixin';
@import '~@/lib/scss/xy-lazyload-resize';
</style>
