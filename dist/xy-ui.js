!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("xy-ui",[],e):"object"==typeof exports?exports["xy-ui"]=e():t["xy-ui"]=e()}("undefined"!=typeof self?self:this,function(){return function(t){function e(n){if(i[n])return i[n].exports;var s=i[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var i={};return e.m=t,e.c=i,e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=4)}([function(t,e){t.exports=function(t,e,i,n,s,a){var r,o=t=t||{},A=typeof t.default;"object"!==A&&"function"!==A||(r=t,o=t.default);var c="function"==typeof o?o.options:o;e&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0),i&&(c.functional=!0),s&&(c._scopeId=s);var l;if(a?(l=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},c._ssrRegister=l):n&&(l=n),l){var u=c.functional,d=u?c.render:c.beforeCreate;u?(c._injectStyles=l,c.render=function(t,e){return l.call(e),d(t,e)}):c.beforeCreate=d?[].concat(d,l):[l]}return{esModule:r,exports:o,options:c}}},function(t,e,i){"use strict";e.a={name:"xy-lazyload",props:{width:{type:String,default:""},height:{type:String,default:""},src:{type:String,default:""},size:{type:String,default:""},errorImg:{type:String,default:""}},data:function(){return{}},computed:{},beforeMount:function(){},mounted:function(){},methods:{}}},function(t,e,i){"use strict";function n(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}var s=function(){function t(t,e){var i=[],n=!0,s=!1,a=void 0;try{for(var r,o=t[Symbol.iterator]();!(n=(r=o.next()).done)&&(i.push(r.value),!e||i.length!==e);n=!0);}catch(t){s=!0,a=t}finally{try{!n&&o.return&&o.return()}finally{if(s)throw a}}return i}return function(e,i){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.a={name:"xy-slider",props:{width:{type:String,default:"100%"},height:{type:String,default:"50%"},data:{type:Array,default:[]},interval:{type:Number,default:3e3},auto:{type:Boolean,default:!0},scale:{type:Boolean,default:!1}},data:function(){return{lastX:0,startX:0,curX:0,curLen:0,speed:0,lastCurX:0,paused:!0,timer:null,left:0,itemWidth:1}},computed:{length:function(){return this.data.length},length2:function(){return 3*this.data.length},parseData:function(){for(var t=0;t<this.data.length;t++)this.data[t].$index=t;return[].concat(n(this.data),n(this.data),n(this.data))},current:function(){return Math.abs(Math.floor(this.lastX/this.itemWidth))%this.length},current2:function(){return Math.abs(Math.floor(this.lastX/this.itemWidth))}},watch:{data:function(){this.init()},current:function(){this.data.length>0&&this.$emit("change",this.data[this.current])}},beforeMount:function(){},mounted:function(){var t=this;this.itemWidth=this.$refs.slider?this.$refs.slider.offsetWidth:1,this.init(),window.addEventListener("resize",function(){var e=t.current2;t.itemWidth=t.$refs.slider?t.$refs.slider.offsetWidth:1,t.paused=!0,t.lastX=-t.itemWidth*e,t.curLen=t.lastX,t.$refs.container&&(t.left=t.lastX+"px"),setTimeout(function(){t.paused=!1},300)})},methods:{init:function(){var t=this;this.paused=!0,this.lastX=-this.itemWidth*this.length,this.curLen=this.lastX,this.$refs.container&&(this.left=this.lastX+"px"),setTimeout(function(){t.paused=!1,t.length>1&&t.auto&&(t.stop(),t.start())},300)},circle:function(){var t=this;setTimeout(function(){t.paused=!0;var e=Math.floor(t.lastX/t.itemWidth);0===e?e-=t.length:e===1-t.length2&&(e+=t.length),t.lastX=t.itemWidth*e,t.$refs.container&&(t.left=t.lastX+"px"),setTimeout(function(){t.paused=!1},300)},300)},start:function(){var t=this;this.interval&&(this.timer=setInterval(function(){var e=t.lastX/t.itemWidth,i=Math.floor(e);i-=1,t.lastX=t.itemWidth*i,t.curLen=t.lastX,t.$refs.container&&(t.left=t.lastX+"px"),t.circle()},this.interval))},stop:function(){clearTimeout(this.timer),this.timer=null},fixed:function(t,e){return t>0?t=0:t<=-e&&(t=1-e),t},onTouchstart:function(t){var e=s(t.touches,1),i=e[0];this.length>1&&(this.auto&&this.stop(),this.paused=!0,this.startX=i.clientX)},onTouchmove:function(t){var e=s(t.touches,1),i=e[0];this.length>1&&(this.auto&&this.stop(),this.curX=i.clientX-this.startX,this.speed=Math.abs(this.lastCurX-this.curX),this.lastCurX=this.curX,this.curLen=this.curX+this.lastX,this.$refs.container&&(this.left=this.curLen+"px"))},onTouchend:function(){if(this.length>1){this.paused=!1,this.lastX=this.curLen;var t=this.lastX/this.itemWidth,e=(this.lastX,this.itemWidth,Math.floor(t)),i=Math.round(t);(Math.abs(this.curX/this.itemWidth)>.2||Math.abs(this.speed/this.itemWidth)>.025)&&(this.curX>=0?e===i&&i++:e!==i&&i--),i=this.fixed(i,this.length2),this.speed=0,this.lastX=this.itemWidth*i,this.$refs.container&&(this.left=this.lastX+"px"),this.circle(),this.auto&&this.start()}}}}},function(t,e,i){"use strict";e.a={name:"xy-image-pop",props:{visible:{type:Boolean,default:!1},imgs:{type:Array,default:function(){return[]}},cur:{type:String,default:""}},data:function(){return{closeTimer:null}},computed:{},watch:{},methods:{onStop:function(){},onClose:function(t){var e=t.currentTarget;e.classList.add("xy-image-pop__close--moving"),this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.closeTimer=setTimeout(function(){e.classList.remove("xy-image-pop__close--moving")},300),this.$emit("update:visible",!this.visible)}},mounted:function(){}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(5),s=i(8),a=i(11),r=i(14),o={install:function(t){t.component(n.a.name,n.a),t.component(s.a.name,s.a)}};"undefined"!=typeof window&&window.Vue&&(window.Vue.use(o),window.Vue.use(VueLazyload,r.a)),e.default={components:{xyLazyload:n.a,xySlider:s.a,xyImagePop:a.a},directives:{},plugins:{xyLazyloadResize:r.a}}},function(t,e,i){"use strict";function n(t){i(6)}var s=i(1),a=i(7),r=i(0),o=n,A=r(s.a,a.a,!1,o,null,null);e.a=A.exports},function(t,e){},function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"lazy-load",style:{width:t.width,height:t.height}},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.src,expression:"src"}],class:{"lazy-cover":"cover"===t.size,"lazy-contain":"contain"===t.size},attrs:{"error-img":t.errorImg}})])},s=[],a={render:n,staticRenderFns:s};e.a=a},function(t,e,i){"use strict";function n(t){i(9)}var s=i(2),a=i(10),r=i(0),o=n,A=r(s.a,a.a,!1,o,null,null);e.a=A.exports},function(t,e){},function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"slider",staticClass:"xy-slider",style:{width:t.width,"padding-top":t.height}},[i("ul",{ref:"container",class:{"xy-slider--touch":t.paused},style:{"min-width":t.width,left:t.left},on:{touchstart:t.onTouchstart,touchmove:t.onTouchmove,touchend:t.onTouchend}},t._l(t.parseData,function(e,n){return i("li",{key:n,class:{"xy-slider__item--none":!t.scale,"xy-slider__item--current":t.scale&&n===t.current2,"xy-slider__item--left":t.scale&&n===t.current2-1,"xy-slider__item--right":t.scale&&n===t.current2+1},style:{width:t.itemWidth+"px"}},[t._t("default",null,null,e)],2)}),0),t._v(" "),t.length>1?i("footer",t._l(t.data,function(e,n){return i("span",{key:n,class:{"xy-slider__indicator--cur":n===t.current}})}),0):t._e()])},s=[],a={render:n,staticRenderFns:s};e.a=a},function(t,e,i){"use strict";function n(t){i(12)}var s=i(3),a=i(13),r=i(0),o=n,A=r(s.a,a.a,!1,o,null,null);e.a=A.exports},function(t,e){},function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],staticClass:"xy-image-pop",on:{touchstart:function(t){t.stopPropagation()},touchmove:function(t){t.stopPropagation()}}},[i("div",{staticClass:"xy-image-pop__prevent",on:{touchstart:function(t){t.preventDefault(),t.stopPropagation()}}}),t._v(" "),i("div",{staticClass:"xy-image-pop__close",on:{click:function(e){return e.stopPropagation(),t.onClose(e)},touchmove:function(t){t.preventDefault(),t.stopPropagation()}}},[i("span"),i("span"),i("span"),i("span")]),t._v(" "),i("div",{staticClass:"xy-image-pop__slider"},[i("div",[t._v("visible: "+t._s(t.visible))]),t._v(" "),i("div",[t._v("imgs: "+t._s(t.imgs))]),t._v(" "),i("div",[t._v("cur: "+t._s(t.cur))])]),t._v(" "),t._m(0)])},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"xy-image-pop__indicator"},[i("span"),t._v(" "),i("span",{staticClass:"xy-image-pop__indicator--focus"}),t._v(" "),i("span"),t._v(" "),i("span")])}],a={render:n,staticRenderFns:s};e.a=a},function(t,e,i){"use strict";e.a={preLoad:2,attempt:1,adapter:{loaded:function(t,e){var i=t.el,n=i.parentElement;n.style.backgroundImage='url("'+i.src+'")',i.classList.contains("lazy-contain")?n.style.backgroundSize="contain":i.classList.contains("lazy-cover")?n.style.backgroundSize="cover":n.style.backgroundImage=null,n.classList.remove("loading"),n.classList.remove("error"),n.classList.add("loaded")},loading:function(t){var e=t.el,i=e.parentElement,n=i.offsetWidth>i.offsetHeight?i.offsetHeight:i.offsetWidth;i.style.backgroundImage='url("data:image/gif;base64,R0lGODlhEgASAIABAKa4zP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAwABACwAAAAAEgASAEACJwyOoYa3D6N8rVqgLp5M2+x9XcWBTTmGTqqa6qqxFInWUMzhk76TBQAh+QQJAwABACwAAAAAEgASAEACKQyOoYa3D6NUrdHqGJ44d3B9m1ZNZGZ+YXmKnsuq44qaNqSmnZ3rllIAACH5BAkDAAEALAAAAAASABIAQAIpDI6hhrcPo2zt0cRuvG5xoHxfyE2UZJWeKrLtmZ3aWqG2OaOjvfPwUgAAIfkECQMAAQAsAAAAABIAEgBAAigMjqGGtw8jbC3SxO67bnLFhQD4bZRkap4qli37qWSF1utZh7a+41ABACH5BAkDAAEALAAAAAASABIAQAIqDI6hhrcP42pNMgoUdpfanXVgJSaaZ53Yt6kj+a6lI7tcioN5m+o7KSkAACH5BAkDAAEALAAAAAASABIAQAIoDI6hhrcPI2tOKpom3vZyvVEeBgLdKHYhGjZsW63kMp/Sqn4WnrtnAQAh+QQJAwABACwAAAAAEgASAEACKAyOocvtCCN0TB5lM6Ar92hYmChxX2l6qRhqYAui8GTOm8rhlL6/ZgEAIfkECQMAAQAsAAAAABIAEgBAAigMjqHL7QgjdEyeJY2leHOdgZF4KdYJfGTynaq7XmGctuicwZy+j2oBACH5BAkDAAEALAAAAAASABIAQAInDI6hy+0II3RMHrosUFpjbmUROJFdiXmfmoafMZoodUpyLU5sO1MFACH5BAkDAAEALAAAAAASABIAQAImDI6hy+2GDozyKZrspBf7an1aFy2fuJ1Z6I2oho2yGqc0SYN1rRUAIfkECQMAAQAsAAAAABIAEgBAAiYMjqHL7W+QVLJaAOnVd+eeccliRaXZVSH4ee0Uxg+bevUJnuIRFAAh+QQJAwABACwAAAAAEgASAEACKoyBacvtnyI4EtH6QrV6X5l9UYgt2DZ1JRqqIOm1ZUszrIuOeM6x8x4oAAAh+QQJAwABACwAAAAAEgASAEACKIwNqcftryJAMrFqG55hX/wcnlN9UQeipZiGo9vCZ0hD6TbiN7hSZwEAIfkECQMAAQAsAAAAABIAEgBAAiiMH6CL7Z+WNHK2yg5WdLsNQB12VQgJjmZJiqnriZEl1y94423aqlwBACH5BAkDAAEALAAAAAASABIAQAIrjH+gi+2+IjCSvaoo1vUFPHnfxlllBp5mk4qt98KSSKvZCHZ4HtmTrgoUAAAh+QQFAwABACwAAAAAEgASAEACKIyPAcvpr5g0csJYc8P1cgtpwDceGblQmiey69W6oOfEon2f6KirUwEAIfkECQMAAQAsAAAPAAgAAwBAAgSMj6lXACH5BAkDAAEALAAAAAASABIAQAIYjI+JwK0Po5y02glUvrz7bzXiBpbLaD4FACH5BAkDAAEALAAAAAASABIAQAImjI8By8qfojQPTldzw/VymB3aCIidN6KaGl7kSnWpC6ftt00zDRUAIfkECQMAAQAsAAAAABIAEgBAAiaMjwHLyp+iNA9WcO6aVHOneWBYZeUXouJEiu1lWit7jhCX4rMEFwAh+QQJAwABACwAAAAAEgASAEACJ4yPAcvKn6I0r1pA78zWQX51XrWBSzl+Uxia7Jm+mEujW3trubg3BQAh+QQFAwABACwAAAAAEgASAEACJwyOoYa3D6N8rVqgLp5M2+x9XcWBTTmGTqqa6qqxFInWUMzhk76TBQA7")',i.style.backgroundSize=(n/3>18?18:n/3)+"px",i.classList.remove("loaded"),i.classList.remove("error"),i.classList.add("loading")},error:function(t){var e=t.el,i=e.parentElement,n=i.offsetWidth>i.offsetHeight?i.offsetHeight:i.offsetWidth,s=e.getAttribute("error-img");s?(i.style.backgroundImage='url("'+s+'")',e.classList.contains("lazy-contain")?i.style.backgroundSize="contain":e.classList.contains("lazy-cover")?i.style.backgroundSize="cover":i.style.backgroundImage=null):(i.style.backgroundImage='url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAQAAACSoYmJAAACwElEQVRo3u3b3VLaQBTA8Z1x5NoHo9f6OPgIouNb+BZFg1SBWlsL41dLK+FDW2UUEPj3AqEYErIJQfa0OXsN85vM2bN7IEepqWCVJFvsU6XNsqJNlX22SLKq/II1UtQwKeqkWJtF3qCKiVFlwx28wi4mxy4r0+Q9TI89B5ttJMTOJHkdKbH+t2LYYtD2SyUhhaRIKaVIGFaX/aJGQpFEWiQVaXHobcV7ceiMEpbRADVFRxy6oxAY/x56QIMyebLkKFKmycB09C0FLMcq0DQXPeB6Cjxa10t/3h5ob/KQbSC6OZNsYS05SZRbahz7oo+XmiLKrf21NFbdLHRJC10yC53XQufNQh9qobNmoXMS0QWJ6SFyI4oseXqHSz8+xv/XCxMMuPQkX5p6NR0mibAmYPS865TIkyVLnhL1yJ/xD66kNbY3LxW/Lwdtj5PulGcZ6NdHWDHQv39LQjfJOrb4ES2z0bdTZAuLHHfmon+5kofX3ZqZ6N8+TUbFPPSDRotx7nsavCm6pdkVndEzBf3IkRbZwuKEbnTob1o55xZPAcjDdu4xCvSAC+2t4oy2RmPhXB+4nxc9oBxoh09GR/O3FOc69LhTaqL7nAUuTKPoavb37usmLLrHaah6CvDMxznIFlY4dJeT0MdAz+OzC0Z3KIY+vXp8mpscAv3ks4UqM/fB5wjIgdEtjdpa8aw2XyIhB0Tfax66FVfy14jIgdB3mj/5urEna/obohued14d9nmEZG20HZD8mn0RKVkT/TPklw/ZVxGTNdHhv77C98jJC0cvZsXoGB2jY3SMjtExOkYvGy3yBVmRryJnxKEzQl+vlzfI8E6RoCEro0nIHM4RNgZVGw9UCho4mxymZEcEeUf+EKXIcdXxYLCZW9L2GAweD1RuGla3G2zOHMGeGHZPc4A987/exUYXmwPSJElMC/8AAsbzwJ8A0u0AAAAASUVORK5CYII=")',i.style.backgroundSize=(n/3>90?90:n/3)+"px"),i.classList.remove("loaded"),i.classList.remove("loading"),i.classList.add("error")}}}}])});
//# sourceMappingURL=xy-ui.js.map