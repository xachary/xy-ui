<template>
  <div class="demo">
    <h3>Loading Default</h3>
    <ul>
      <li v-if="!load">
        <div v-xy-loading="!load"></div>
        <p v-xy-loading.multiple="{loading:!load}"></p>
      </li>
      <li v-if="!load">
        <p v-xy-loading.multiple="{loading:!load}"></p>
      </li>
      <li v-for="(item,index) in  listDefault"
          :key="index">
        <div v-if="item.img">
          <xy-lazyload width="100px"
                       height="100px"
                       :src="'http://dummyimage.com/100x100'"
                       size="cover"></xy-lazyload>
        </div>
        <p v-html="item.txt">
        </p>
      </li>
    </ul>
    <h3>Loading with max line and min line</h3>
    <ul>
      <li v-if="!load">
        <div v-xy-loading="!load"></div>
        <p v-xy-loading.multiple="{loading:!load,max:5,min:4}"></p>
      </li>
      <li v-if="!load">
        <p v-xy-loading.multiple="{loading:!load,max:5}"></p>
      </li>
      <li v-if="!load">
        <div v-xy-loading="!load"></div>
        <p v-xy-loading.multiple="{loading:!load,max:6,min:3}"></p>
      </li>
      <li v-if="!load">
        <p v-xy-loading.multiple="{loading:!load,max:10}"></p>
      </li>
      <li v-for="(item,index) in  listMaxMin"
          :key="index">
        <div v-if="item.img">
          <xy-lazyload width="100px"
                       height="100px"
                       :src="'http://dummyimage.com/100x100'"
                       size="cover"></xy-lazyload>
        </div>
        <p v-html="item.txt">
        </p>
      </li>
    </ul>
    <h3>Loading with other color</h3>
    <ul>
      <li v-if="!load">
        <div v-xy-loading="{loading:!load,color:'green'}"></div>
        <p v-xy-loading.multiple="{loading:!load,color:'green'}"></p>
      </li>
      <li v-if="!load">
        <div v-xy-loading="{loading:!load,color:'blue'}"></div>
        <p v-xy-loading.multiple="{loading:!load,color:'blue'}"></p>
      </li>
      <li v-for="(item,index) in  listColor"
          :key="index">
        <div v-if="item.img">
          <xy-lazyload width="100px"
                       height="100px"
                       :src="'http://dummyimage.com/100x100'"
                       size="cover"></xy-lazyload>
        </div>
        <p v-html="item.txt">
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    mixins: [],
    components: {},
    data() {
      return {
        load: false,
        listDefault: [],
        listMaxMin: [],
        listColor: []
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
      setTimeout(() => {
        this.listDefault = [
          {
            img: 'http://dummyimage.com/100x100',
            txt:
              '通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知'
          },
          {
            txt:
              '通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知'
          }
        ]
        this.listMaxMin = [
          {
            img: 'http://dummyimage.com/100x100',
            txt:
              '通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知'
          },
          {
            txt:
              '通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知'
          },
          {
            img: 'http://dummyimage.com/100x100',
            txt:
              '通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知'
          },
          {
            txt:
              '通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知'
          }
        ]
        this.listColor = [
          {
            img: 'http://dummyimage.com/100x100',
            txt:
              '通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知'
          },
          {
            txt:
              '通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知'
          }
        ]
        // console.log(JSON.stringify(this.list))
        // this.$nextTick(() => {
        this.load = true
        // })
      }, 6000)
    },
    beforeDestroy() {},
    methods: {},
    provide() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .demo {
    & > ul {
      & > li {
        display: flex;
        margin: 0 5px;
        padding: 5px 0;
        &:not(:first-child) {
          border-top: 1px dashed #efefef;
        }
        & > div {
          margin-right: 5px;
          width: 100px;
          height: 100px;
          flex-shrink: 0;
        }
        & > p {
          width: 0;
          flex-grow: 1;
          font-size: 14px;
          color: #666;
          min-height: 100px;
        }
      }
    }
  }
</style>