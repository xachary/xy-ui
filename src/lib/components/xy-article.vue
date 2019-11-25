<template>
  <div class="xy-article">
    <div id="xy-article__point"></div>
  </div>
</template>
<script>
import Vue from 'vue'

export default {
  name: 'xy-article',
  data() {
    return {
      done: false
    }
  },
  props: {
    des: {
      type: String,
      default: ''
    }
  },
  watch: {
    des: function (n) {
      let that = this
      that.update()
    }
  },
  computed: {
    html() {
      let that = this
      return that.array.join('')
    }
  },
  methods: {
    //      replace (txt) {
    //        return txt.replace(/(<img.*?)(src=")(.*?)(".*?>)/g, `<div class="lazy-load">$1v-lazy="'$3'$4</div>`)
    //      },
    update() {
      let that = this
      if (that.des && !that.done) {
        //          let start = 0
        //          that.array = []
        //          let ms = that.des.match(/(<img .*?>)/g)
        //          for (let i = 0; i < ms.length; i++) {
        //            let lc = that.des.indexOf(ms[i], start)
        //            if (start !== lc) {
        //              that.array.push(that.des.substr(start, lc))
        //            }
        //            that.array.push(that.replace(that.des.substr(lc, ms[i].length)))
        //            start = lc + ms[i].length
        //          }
        //          if (start < that.des.length) {
        //            that.array.push(that.replace(that.des.substring(start, that.des.length)))
        //          }

        //          console.log(that.array.map(function (item) {
        //            return item.value
        //          }))
        //          let ta = tmp.split('')
        //          for (let i = 0; i < ms.length; i++) {
        //            let lc = tmp.indexOf(ms[i])
        //            let txt = ''
        //            if (lc > 0) {
        //              //              debugger
        //              txt = ta.splice(0, lc)
        //                      .join('')
        //              that.array.push({
        //                type: 'txt',
        //                value: txt
        //              })
        //              tmp = tmp.replace(txt, '')
        //            }
        //            //            debugger
        //            txt = ta.splice(0, ms[i].length)
        //                    .join('')
        //            that.array.push({
        //              type: 'img',
        //              value: txt
        //            })
        //            tmp = tmp.replace(txt, '')
        //          }
        //          if (tmp) {
        //            that.array.push({
        //              type: 'txt',
        //              value: tmp
        //            })
        //          }
        //          let tpl = `<div>${that.des.replace(/(<img.*?)(src=["'])(.*?)(["'].*?)(.*?>)/g, '<div class="lazy-load">$1v-lazy="\'$3\'$4 v-xy-pop-image data-img="$3" data-index="0" $5</div>')}</div>`
        let tpl = `<div>${that.des.replace(/(<img.*?)(src=["'])(.*?)(["'])(.*?>)/g, '<div class="lazy-load"><img v-lazy="\'$3\'" v-xy-pop-image data-img="$3"></div>')}</div>`
        let ls = tpl.match(/v-lazy="'(.*?)'"/g)
        if (ls) {
          let imgs = []
          for (let i = 0; i < ls.length; i++) {
            let src = ls[i].replace(/v-lazy="'(.*?)'"/g, '$1')
            imgs.push(`'${src}'`)
            if (/\?[^?]*$/.test(src)) {
              tpl = tpl.replace(src, `${src}&idx=${i}`)
            } else {
              tpl = tpl.replace(src, `${src}?idx=${i}`)
            }
          }
          tpl = tpl.replace(/v-xy-pop-image/g, `v-xy-pop-image:imgs="[${imgs.join(',')}]"`)
        }
        //          let idx = tpl.indexOf('a',7)
        //          while (){
        //
        //          }
        //          console.log(tpl)
        var text = Vue.extend({
          template: tpl
        })
        new text().$mount('#xy-article__point')
        that.done = true
      }
    }
  },
  data() {
    return {
      array: []
    }
  },
  mounted: function () {
    let that = this
    that.update()
  }
}
</script>

<style>
.xy-article img {
  width: 100%;
  height: auto;
}
</style>