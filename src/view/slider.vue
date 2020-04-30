<template>
  <div class="pad">
    <h3>Slider(Extend)</h3>
    <div>
      <xy-slider :data="data4" :interval="3000" :auto="false" width="100%" :height="height + 'px'" @on-change="onChange2" @on-scroll="onScroll">
        <template v-slot="item">
          <div
            :style="{ 'background-image': `url(${item.src})` }"
            style="background-repeat: no-repeat; background-size: cover; background-position: center; display: flex;">
            <img
              :src="item.src"
              alt=""
              style="width: 100%; display: block; visibility: hidden; border: 1px solid yellow;"
              @load="onImgLoad"
              :data-index="item.$index"
            />
            <xy-spinner :show="!item.loaded" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" color="#666">
            </xy-spinner>
          </div>
        </template>
        <template v-slot:footer="status">
          <div style="position: absolute; background: yellow; z-index: 100; bottom: 0; right: 0;">{{ status.index + 1 }}/{{ status.total }}</div>
        </template>
      </xy-slider>
    </div>
    <h3>没有数据</h3>
    <xy-slider :data="data0" @on-change="onChange">
      <template v-slot="item">
        <img :src="item.src" :alt="item.name" />
      </template>
    </xy-slider>
    <h3>只有1个数据</h3>
    <xy-slider :data="data1" @on-change="onChange">
      <template v-slot="item">
        <img :src="item.src" :alt="item.name" />
      </template>
    </xy-slider>
    <h3>2个数据</h3>
    <xy-slider :data="data2" @on-change="onChange">
      <template v-slot="item">
        <img :src="item.src" :alt="item.name" />
      </template>
    </xy-slider>
    <h3>3个数据</h3>
    <xy-slider ref="slider3" :data="data3" @on-change="onChange" @on-click="onClick">
      <template v-slot="item">
        <img :src="item.src" :alt="item.name" />
      </template>
    </xy-slider>
    <h3>用background-image优化</h3>
    <div>
      <xy-slider :data="data4" @on-change="onChange" height="300px">
        <template v-slot="item">
          <div :style="{ 'background-image': `url('${item.src}')`, 'background-size': 'cover', 'background-position': 'center' }"></div>
        </template>
      </xy-slider>
    </div>
    <h3>用lazyload组件</h3>
    <div>
      <xy-slider :data="data4" @on-change="onChange">
        <template v-slot="item">
          <xy-lazyload :src="item.src" size="cover" class="sample" :id="item.imagePopId"></xy-lazyload>
        </template>
      </xy-slider>
    </div>
    <h3>缩放特效</h3>
    <xy-slider :data="data4" :scale="true" @on-change="onChange">
      <template v-slot="item">
        <div :style="{ 'background-image': `url(${item.src})`, 'background-size': 'cover', 'background-position': 'center' }"></div>
      </template>
    </xy-slider>
    <h3>自定义大小</h3>
    <xy-slider :data="data4" width="200px" height="100px" @on-change="onChange">
      <template v-slot="item">
        <div :style="{ 'background-image': `url(${item.src})`, 'background-size': 'cover', 'background-position': 'center' }"></div>
      </template>
    </xy-slider>
    <h3>不自动切换</h3>
    <xy-slider :data="data4" :auto="false" @on-change="onChange">
      <template v-slot="item">
        <div :style="{ 'background-image': `url(${item.src})`, 'background-size': 'cover', 'background-position': 'center' }"></div>
      </template>
    </xy-slider>
    <h3>所有属性（默认值）</h3>
    <xy-slider :data="data4" :interval="3000" :auto="true" :scale="false" width="100%" height="50%" @on-change="onChange">
      <template v-slot="item">
        <xy-lazyload :src="item.src" size="cover" class="sample"></xy-lazyload>
      </template>
    </xy-slider>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        data0: [],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        height: 200,
      }
    },
    methods: {
      onChange(item) {
        console.log('change', item)
      },
      onChange2(item, index) {
        this.height = this.data4[index].height ? this.data4[index].height : this.height
      },
      onImgLoad({ target, target: { dataset } }) {
        this.data4[dataset.index].height = target.naturalHeight
        this.data4[dataset.index].loaded = true
        if (dataset.index === '0') {
          this.height = this.data4[dataset.index].height < 200 ? 200 : this.data4[dataset.index].height
        }
      },
      onScroll({ ratio, index, touching }) {
        if (touching) {
          let to = 0
          if (ratio > 0) {
            to = this.data4[index >= this.data4.length - 1 ? 0 : index + 1].height
            this.height = this.data4[index].height + (to - this.data4[index].height) * ratio
          } else if (ratio < 0) {
            to = this.data4[index <= 0 ? this.data4.length - 1 : index - 1].height
            this.height = this.data4[index].height - (to - this.data4[index].height) * ratio
          }
        }
      },
      onClick() {
        this.$refs.slider3.pause()
        setTimeout(() => {
          this.$refs.slider3.resume()
        }, 3000)
      },
    },
    mounted: function () {
      setTimeout(() => {
        this.data0 = []
        this.data1 = [
          {
            id: '1',
            name: '300*400',
            src: 'https://placeimg.com/300/400/any?rand=' + Math.random(),
            href: '#',
          },
        ]
        this.data2 = [
          {
            id: '1',
            name: '300*400',
            src: 'https://placeimg.com/300/400/any?rand=' + Math.random(),
            href: '#',
          },
          {
            id: '2',
            name: '400*300',
            src: 'https://placeimg.com/400/300/any?rand=' + Math.random(),
            href: 'https://www.baidu.com/',
          },
        ]
        this.data3 = [
          {
            id: '1',
            name: '300*400',
            src: 'https://placeimg.com/300/400/any?rand=' + Math.random(),
            href: '#',
          },
          {
            id: '2',
            name: '400*300',
            src: 'https://placeimg.com/400/300/any?rand=' + Math.random(),
            href: 'https://www.baidu.com/',
          },
          {
            id: '3',
            name: '300*300',
            src: 'https://placeimg.com/300/300/any?rand=' + Math.random(),
            href: 'https://www.baidu.com/',
          },
        ]
        this.data4 = [
          {
            id: '3',
            name: '300*300',
            src: 'https://placeimg.com/300/400/any',
            href: 'https://www.baidu.com/',
            height: 0,
          },
          {
            id: '1',
            name: '300*400',
            src: 'http://dummyimage.com/300x400?',
            href: '#',
            height: 0,
          },
          {
            id: '2',
            name: '400*300',
            src: 'http://dummyimage.com/400x300?',
            href: 'https://www.baidu.com/',
            height: 0,
          },
          {
            id: '4',
            name: '400*200',
            src: 'http://dummyimage.com/400x200?',
            href: 'https://www.baidu.com/',
            height: 0,
          },
        ]
      }, 500)
    },
  }
</script>

<style lang="scss"></style>
