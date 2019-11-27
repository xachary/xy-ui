<template>
  <div class="xy-html-viewer">
    <xy-image-pop
      :visible.sync="visible"
      :imgs="imgs"
      :index="index"
      @on-change="onChange"
      @on-close="onClose"
    ></xy-image-pop>
    <div
      id="xy-html-viewer__point"
      ref="html"
    ></div>
  </div>
</template>
<script>
import Vue from 'vue'

export default {
  name: 'xy-html-viewer',
  props: {
    html: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      imgs: [],
      index: 0,
      //
      done: false
    }
  },
  watch: {
    html: function () {
      this.done = false
      this.update()
    }
  },
  computed: {
  },
  methods: {
    onChange(index) {
      console.log(index)
    },
    onClose() {
      console.log('close')
    },
    update() {
      let that = this
      if (this.html && !this.done) {
        let tpl = this.html.replace(/\n/g, '')
        let reg = ''
        this.imgs = []
        let imgs = tpl.match(/<img[^<>]*?src=["'].*?["'][^<>]*?>/g)
        if (imgs) {
          for (let i = 0; i < imgs.length; i++) {
            let info = {
              src: imgs[i].match(/<img[^<>]*?src=["'](.*?)["'][^<>]*?>/)[1],
              msrc: imgs[i].match(/<img[^<>]*?src=["'](.*?)["'][^<>]*?>/)[1],
              index: i
            }

            let tryLsrc = imgs[i].match(/<img[^<>]*?data-lsrc=["'](.*?)["'][^<>]*?>/)
            if (tryLsrc) {
              info.src = tryLsrc[1]
            }
            let tryTitle = imgs[i].match(/<img[^<>]*?data-title=["'](.*?)["'][^<>]*?>/)
            if (tryTitle) {
              info.title = tryTitle[1]
            }
            let tryId = imgs[i].match(/<img[^<>]*?id=["'](.*?)["'][^<>]*?>/) || imgs[i].match(/<img[^<>]*?data-id=["'](.*?)["'][^<>]*?>/)
            if (tryId) {
              info.id = tryId[1]
            }
            this.imgs.push(info)
            reg = new RegExp(`<img[^<>]*?src=["']${info.msrc.replace(/([()])/g, '\\$1')}["'][^<>]*?>`)
            tpl = tpl.replace(reg, `<div class="lazy-load"><img v-lazy="'${info.msrc}'" @click="onImagePop(${i})"></div>`)
          }
        }

        tpl = `<div>${tpl}</div>`

        var text = Vue.extend({
          template: tpl,
          methods: {
            onImagePop(index) {
              that.index = index
              that.visible = !that.visible
            }
          }
        })
        var instance = new text().$mount('#xy-html-viewer__point')
        instance.$el.id = "xy-html-viewer__point"
        that.done = true
      }
    }
  },
  mounted: function () {
    let that = this
    that.update()
  }
}
</script>

<style>
.xy-html-viewer img {
  width: 100%;
  height: auto;
}
</style>