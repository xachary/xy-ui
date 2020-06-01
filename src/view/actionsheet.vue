<template>
  <div class="sample">
    <button @click="onShow" v-xy-btn-act:style.scale>Show</button>
    <xy-actionsheet v-model="showMenus" :menus="menus" @on-select="onMenuSelect"></xy-actionsheet>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        showMenus: false,
        menus: [],
      }
    },
    methods: {
      onShow() {
        this.showMenus = true
      },
      onMenuSelect(item) {
        console.log(item)
      },
    },
    mounted: function () {
      this.menus = [
        {
          code: 'code1',
          name: '高德地图',
        },
        {
          code: 'code2',
          name: '百度地图',
        },
        {
          code: 'code3',
          name: '腾讯地图',
        },
      ]
    },
  }
</script>

<style lang="scss" scoped>
  .sample {
    display: flex;
    flex-direction: column;
    button {
      padding: 1em 2em;
      border: 1px solid #333;
      margin: 1em;
      display: block;
      text-align: center;
    }
    [xy-btn-act][disabled] {
      filter: grayscale(1);
      background-color: rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.2);
      border-color: rgba(0, 0, 0, 0.2);
    }
  }
</style>
