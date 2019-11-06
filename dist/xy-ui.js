!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("xy-ui",[],e):"object"==typeof exports?exports["xy-ui"]=e():t["xy-ui"]=e()}("undefined"!=typeof self?self:this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=4)}([function(t,e){t.exports=function(t,e,n,i,r,s){var a,o=t=t||{},l=typeof t.default;"object"!==l&&"function"!==l||(a=t,o=t.default);var u="function"==typeof o?o.options:o;e&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0),n&&(u.functional=!0),r&&(u._scopeId=r);var c;if(s?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},u._ssrRegister=c):i&&(c=i),c){var A=u.functional,d=A?u.render:u.beforeCreate;A?(u._injectStyles=c,u.render=function(t,e){return c.call(e),d(t,e)}):u.beforeCreate=d?[].concat(d,c):[c]}return{esModule:a,exports:o,options:u}}},function(t,e,n){"use strict";e.a={name:"xy-lazyload",props:{width:{type:String,default:""},height:{type:String,default:""},src:{type:String,default:""},size:{type:String,default:""},errorImg:{type:String,default:""}},data:function(){return{}},computed:{},beforeMount:function(){},mounted:function(){},methods:{}}},function(t,e,n){"use strict";function i(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}var r=function(){function t(t,e){var n=[],i=!0,r=!1,s=void 0;try{for(var a,o=t[Symbol.iterator]();!(i=(a=o.next()).done)&&(n.push(a.value),!e||n.length!==e);i=!0);}catch(t){r=!0,s=t}finally{try{!i&&o.return&&o.return()}finally{if(r)throw s}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.a={name:"xy-slider",props:{width:{type:String,default:"100%"},height:{type:String,default:"50%"},data:{type:Array,default:[]},interval:{type:Number,default:3e3},auto:{type:Boolean,default:!0},scale:{type:Boolean,default:!1}},data:function(){return{lastX:0,startX:0,curX:0,curLen:0,speed:0,lastCurX:0,paused:!0,timer:null,left:0,itemWidth:1}},computed:{length:function(){return this.data.length},length2:function(){return 3*this.data.length},parseData:function(){for(var t=0;t<this.data.length;t++)this.data[t].$index=t;return[].concat(i(this.data),i(this.data),i(this.data))},current:function(){return Math.abs(Math.floor(this.lastX/this.itemWidth))%this.length},current2:function(){return Math.abs(Math.floor(this.lastX/this.itemWidth))}},watch:{data:function(){this.init()},current:function(){this.data.length>0&&this.$emit("change",this.data[this.current])}},beforeMount:function(){},mounted:function(){var t=this;this.itemWidth=this.$refs.slider?this.$refs.slider.offsetWidth:1,this.init(),window.addEventListener("resize",function(){var e=t.current2;t.itemWidth=t.$refs.slider?t.$refs.slider.offsetWidth:1,t.paused=!0,t.lastX=-t.itemWidth*e,t.curLen=t.lastX,t.$refs.container&&(t.left=t.lastX+"px"),setTimeout(function(){t.paused=!1},300)})},methods:{init:function(){var t=this;this.paused=!0,this.lastX=-this.itemWidth*this.length,this.curLen=this.lastX,this.$refs.container&&(this.left=this.lastX+"px"),setTimeout(function(){t.paused=!1,t.length>1&&t.auto&&(t.stop(),t.start())},300)},circle:function(){var t=this;setTimeout(function(){t.paused=!0;var e=Math.floor(t.lastX/t.itemWidth);0===e?e-=t.length:e===1-t.length2&&(e+=t.length),t.lastX=t.itemWidth*e,t.$refs.container&&(t.left=t.lastX+"px"),setTimeout(function(){t.paused=!1},300)},300)},start:function(){var t=this;this.interval&&(this.timer=setInterval(function(){var e=t.lastX/t.itemWidth,n=Math.floor(e);n-=1,t.lastX=t.itemWidth*n,t.curLen=t.lastX,t.$refs.container&&(t.left=t.lastX+"px"),t.circle()},this.interval))},stop:function(){clearTimeout(this.timer),this.timer=null},fixed:function(t,e){return t>0?t=0:t<=-e&&(t=1-e),t},onTouchstart:function(t){var e=r(t.touches,1),n=e[0];this.length>1&&(this.auto&&this.stop(),this.paused=!0,this.startX=n.clientX)},onTouchmove:function(t){var e=r(t.touches,1),n=e[0];this.length>1&&(this.auto&&this.stop(),this.curX=n.clientX-this.startX,this.speed=Math.abs(this.lastCurX-this.curX),this.lastCurX=this.curX,this.curLen=this.curX+this.lastX,this.$refs.container&&(this.left=this.curLen+"px"))},onTouchend:function(){if(this.length>1){this.paused=!1,this.lastX=this.curLen;var t=this.lastX/this.itemWidth,e=(this.lastX,this.itemWidth,Math.floor(t)),n=Math.round(t);(Math.abs(this.curX/this.itemWidth)>.2||Math.abs(this.speed/this.itemWidth)>.025)&&(this.curX>=0?e===n&&n++:e!==n&&n--),n=this.fixed(n,this.length2),this.speed=0,this.lastX=this.itemWidth*n,this.$refs.container&&(this.left=this.lastX+"px"),this.circle(),this.auto&&this.start()}}}}},function(t,e,n){"use strict";e.a={name:"xy-image-pop",props:{visible:{type:Boolean,default:!1},imgs:{type:Array,default:function(){return[]}},cur:{type:String,default:""}},data:function(){return{closeTimer:null}},computed:{},watch:{},methods:{onStop:function(){},onClose:function(t){var e=t.currentTarget;e.classList.add("xy-image-pop__close--moving"),this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null),this.closeTimer=setTimeout(function(){e.classList.remove("xy-image-pop__close--moving")},300),this.$emit("update:visible",!this.visible)}},mounted:function(){}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=n(8),s=n(11),a=n(14),o=n(15),l={install:function(t){t.component(i.a.name,i.a),t.component(r.a.name,r.a),t.directive(a.a.name,a.a)}};"undefined"!=typeof window&&window.Vue&&(window.Vue.use(l),window.Vue.use(VueLazyload,o.a)),e.default={components:{xyLazyload:i.a,xySlider:r.a,xyImagePop:s.a},directives:{xyPullRefresh:a.a},plugins:{xyLazyloadResize:o.a}}},function(t,e,n){"use strict";function i(t){n(6)}var r=n(1),s=n(7),a=n(0),o=i,l=a(r.a,s.a,!1,o,null,null);e.a=l.exports},function(t,e){},function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"lazy-load",style:{width:t.width,height:t.height}},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.src,expression:"src"}],class:{"lazy-cover":"cover"===t.size,"lazy-contain":"contain"===t.size},attrs:{"error-img":t.errorImg}})])},r=[],s={render:i,staticRenderFns:r};e.a=s},function(t,e,n){"use strict";function i(t){n(9)}var r=n(2),s=n(10),a=n(0),o=i,l=a(r.a,s.a,!1,o,null,null);e.a=l.exports},function(t,e){},function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"slider",staticClass:"xy-slider",style:{width:t.width,"padding-top":t.height}},[n("ul",{ref:"container",class:{"xy-slider--touch":t.paused},style:{"min-width":t.width,left:t.left},on:{touchstart:t.onTouchstart,touchmove:t.onTouchmove,touchend:t.onTouchend}},t._l(t.parseData,function(e,i){return n("li",{key:i,class:{"xy-slider__item--none":!t.scale,"xy-slider__item--current":t.scale&&i===t.current2,"xy-slider__item--left":t.scale&&i===t.current2-1,"xy-slider__item--right":t.scale&&i===t.current2+1},style:{width:t.itemWidth+"px"}},[t._t("default",null,null,e)],2)}),0),t._v(" "),t.length>1?n("footer",t._l(t.data,function(e,i){return n("span",{key:i,class:{"xy-slider__indicator--cur":i===t.current}})}),0):t._e()])},r=[],s={render:i,staticRenderFns:r};e.a=s},function(t,e,n){"use strict";function i(t){n(12)}var r=n(3),s=n(13),a=n(0),o=i,l=a(r.a,s.a,!1,o,null,null);e.a=l.exports},function(t,e){},function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],staticClass:"xy-image-pop",on:{touchstart:function(t){t.stopPropagation()},touchmove:function(t){t.stopPropagation()}}},[n("div",{staticClass:"xy-image-pop__prevent",on:{touchstart:function(t){t.preventDefault(),t.stopPropagation()}}}),t._v(" "),n("div",{staticClass:"xy-image-pop__close",on:{click:function(e){return e.stopPropagation(),t.onClose(e)},touchmove:function(t){t.preventDefault(),t.stopPropagation()}}},[n("span"),n("span"),n("span"),n("span")]),t._v(" "),n("div",{staticClass:"xy-image-pop__slider"},[n("div",[t._v("visible: "+t._s(t.visible))]),t._v(" "),n("div",[t._v("imgs: "+t._s(t.imgs))]),t._v(" "),n("div",[t._v("cur: "+t._s(t.cur))])]),t._v(" "),t._m(0)])},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"xy-image-pop__indicator"},[n("span"),t._v(" "),n("span",{staticClass:"xy-image-pop__indicator--focus"}),t._v(" "),n("span"),t._v(" "),n("span")])}],s={render:i,staticRenderFns:r};e.a=s},function(t,e,n){"use strict";function i(t,e){t.call({},function(){p=0,m=0,l(),c.style.height=m})}function r(t,e){var n=u(e.touches,1),i=n[0];t.classList.add("xy-pull-refresh");var r=i.clientY;y=Math.round(r),v=y,E="",b=!1,w=!1,I=!0}function s(t,e){var n=u(e.touches,1),i=n[0],r=i.clientY;v=Math.round(r),E=y>v?"up":y<v?"down":"";var s=v-y+p;0===g&&I?s<0?s=0:s>h&&(s=h):s=0,"down"===E?(m=b?0:s,0===g&&e.preventDefault(),w=!0):"up"===E&&(m=w?0:s,b=!0),c.style.height=m+"px"}function a(t,e){var n=u(e.changedTouches,1),i=n[0],r=i.clientY;y=Math.round(r),v=y,m>f?(m=h,L()):m=0,p=m,E="",l(),c.style.height=m+"px"}function o(){g=window.scrollY,g>0&&(I=!1),E=g>x?"up":g<x?"down":"",x=g}function l(){c.classList.add("xy-pull-refresh__bar--auto"),clearTimeout(d),d=setTimeout(function(){c.classList.remove("xy-pull-refresh__bar--auto")},300)}var u=function(){function t(t,e){var n=[],i=!0,r=!1,s=void 0;try{for(var a,o=t[Symbol.iterator]();!(i=(a=o.next()).done)&&(n.push(a.value),!e||n.length!==e);i=!0);}catch(t){r=!0,s=t}finally{try{!i&&o.return&&o.return()}finally{if(r)throw s}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),c=document.createElement("div"),A=document.createElement("div");A.style.position="fixed",A.style.zIndex="100",A.style.bottom=0,A.style.left=0,A.style.width="100%",A.style.backgroundColor="rgba(0,0,0,0.6)",A.style.fontSize="14px",A.style.color="#fff",A.style.minHeight="16px",A.style.maxHeight="160px",A.style.lineHeight="16px",A.style.padding="0 5px",A.style.overflow="auto",A.addEventListener("touchstart",function(t){t.stopPropagation()},!0),A.addEventListener("touchmove",function(t){t.stopPropagation()},!0),A.addEventListener("touchend",function(t){t.stopPropagation()},!0),A.innerHTML="";var d=null,h=70,f=60,p=0,m=0,y=0,v=0,g=0,x=0,E="",b=!1,w=!1,I=!0,L=function(){},C=function(){},_=function(){},B=function(){},S=function(){};e.a={name:"xy-pull-refresh",bind:function(t,e){var n=e.value;e.arg;n&&(L=i.bind({},n,t)),t.classList.add("xy-pull-refresh"),c.style.height="0",c.classList.add("xy-pull-refresh__bar"),c.innerHTML="<span></span><span></span><span></span>",t.insertBefore(c,t.children[0]),C=r.bind({},t),_=s.bind({},t),B=a.bind({},t),S=o.bind({},t),t.addEventListener("touchstart",C),t.addEventListener("touchmove",_),t.addEventListener("touchend",B),window.addEventListener("scroll",S)},unbind:function(t){t.removeEventListener("touchstart",C),t.removeEventListener("touchmove",_),t.removeEventListener("touchend",B),window.removeEventListener("scroll",S)}}},function(t,e,n){"use strict";e.a={preLoad:2,attempt:1,adapter:{loaded:function(t,e){var n=t.el,i=n.parentElement;i.style.backgroundImage='url("'+n.src+'")',n.classList.contains("lazy-contain")?i.style.backgroundSize="contain":n.classList.contains("lazy-cover")?i.style.backgroundSize="cover":i.style.backgroundImage=null,i.classList.remove("loading"),i.classList.remove("error"),i.classList.add("loaded")},loading:function(t){var e=t.el,n=e.parentElement,i=n.offsetWidth>n.offsetHeight?n.offsetHeight:n.offsetWidth;n.style.backgroundImage='url("data:image/gif;base64,R0lGODlhEgASAIABAKa4zP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAwABACwAAAAAEgASAEACJwyOoYa3D6N8rVqgLp5M2+x9XcWBTTmGTqqa6qqxFInWUMzhk76TBQAh+QQJAwABACwAAAAAEgASAEACKQyOoYa3D6NUrdHqGJ44d3B9m1ZNZGZ+YXmKnsuq44qaNqSmnZ3rllIAACH5BAkDAAEALAAAAAASABIAQAIpDI6hhrcPo2zt0cRuvG5xoHxfyE2UZJWeKrLtmZ3aWqG2OaOjvfPwUgAAIfkECQMAAQAsAAAAABIAEgBAAigMjqGGtw8jbC3SxO67bnLFhQD4bZRkap4qli37qWSF1utZh7a+41ABACH5BAkDAAEALAAAAAASABIAQAIqDI6hhrcP42pNMgoUdpfanXVgJSaaZ53Yt6kj+a6lI7tcioN5m+o7KSkAACH5BAkDAAEALAAAAAASABIAQAIoDI6hhrcPI2tOKpom3vZyvVEeBgLdKHYhGjZsW63kMp/Sqn4WnrtnAQAh+QQJAwABACwAAAAAEgASAEACKAyOocvtCCN0TB5lM6Ar92hYmChxX2l6qRhqYAui8GTOm8rhlL6/ZgEAIfkECQMAAQAsAAAAABIAEgBAAigMjqHL7QgjdEyeJY2leHOdgZF4KdYJfGTynaq7XmGctuicwZy+j2oBACH5BAkDAAEALAAAAAASABIAQAInDI6hy+0II3RMHrosUFpjbmUROJFdiXmfmoafMZoodUpyLU5sO1MFACH5BAkDAAEALAAAAAASABIAQAImDI6hy+2GDozyKZrspBf7an1aFy2fuJ1Z6I2oho2yGqc0SYN1rRUAIfkECQMAAQAsAAAAABIAEgBAAiYMjqHL7W+QVLJaAOnVd+eeccliRaXZVSH4ee0Uxg+bevUJnuIRFAAh+QQJAwABACwAAAAAEgASAEACKoyBacvtnyI4EtH6QrV6X5l9UYgt2DZ1JRqqIOm1ZUszrIuOeM6x8x4oAAAh+QQJAwABACwAAAAAEgASAEACKIwNqcftryJAMrFqG55hX/wcnlN9UQeipZiGo9vCZ0hD6TbiN7hSZwEAIfkECQMAAQAsAAAAABIAEgBAAiiMH6CL7Z+WNHK2yg5WdLsNQB12VQgJjmZJiqnriZEl1y94423aqlwBACH5BAkDAAEALAAAAAASABIAQAIrjH+gi+2+IjCSvaoo1vUFPHnfxlllBp5mk4qt98KSSKvZCHZ4HtmTrgoUAAAh+QQFAwABACwAAAAAEgASAEACKIyPAcvpr5g0csJYc8P1cgtpwDceGblQmiey69W6oOfEon2f6KirUwEAIfkECQMAAQAsAAAPAAgAAwBAAgSMj6lXACH5BAkDAAEALAAAAAASABIAQAIYjI+JwK0Po5y02glUvrz7bzXiBpbLaD4FACH5BAkDAAEALAAAAAASABIAQAImjI8By8qfojQPTldzw/VymB3aCIidN6KaGl7kSnWpC6ftt00zDRUAIfkECQMAAQAsAAAAABIAEgBAAiaMjwHLyp+iNA9WcO6aVHOneWBYZeUXouJEiu1lWit7jhCX4rMEFwAh+QQJAwABACwAAAAAEgASAEACJ4yPAcvKn6I0r1pA78zWQX51XrWBSzl+Uxia7Jm+mEujW3trubg3BQAh+QQFAwABACwAAAAAEgASAEACJwyOoYa3D6N8rVqgLp5M2+x9XcWBTTmGTqqa6qqxFInWUMzhk76TBQA7")',n.style.backgroundSize=(i/3>18?18:i/3)+"px",n.classList.remove("loaded"),n.classList.remove("error"),n.classList.add("loading")},error:function(t){var e=t.el,n=e.parentElement,i=n.offsetWidth>n.offsetHeight?n.offsetHeight:n.offsetWidth,r=e.getAttribute("error-img");r?(n.style.backgroundImage='url("'+r+'")',e.classList.contains("lazy-contain")?n.style.backgroundSize="contain":e.classList.contains("lazy-cover")?n.style.backgroundSize="cover":n.style.backgroundImage=null):(n.style.backgroundImage='url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAQAAACSoYmJAAACwElEQVRo3u3b3VLaQBTA8Z1x5NoHo9f6OPgIouNb+BZFg1SBWlsL41dLK+FDW2UUEPj3AqEYErIJQfa0OXsN85vM2bN7IEepqWCVJFvsU6XNsqJNlX22SLKq/II1UtQwKeqkWJtF3qCKiVFlwx28wi4mxy4r0+Q9TI89B5ttJMTOJHkdKbH+t2LYYtD2SyUhhaRIKaVIGFaX/aJGQpFEWiQVaXHobcV7ceiMEpbRADVFRxy6oxAY/x56QIMyebLkKFKmycB09C0FLMcq0DQXPeB6Cjxa10t/3h5ob/KQbSC6OZNsYS05SZRbahz7oo+XmiLKrf21NFbdLHRJC10yC53XQufNQh9qobNmoXMS0QWJ6SFyI4oseXqHSz8+xv/XCxMMuPQkX5p6NR0mibAmYPS865TIkyVLnhL1yJ/xD66kNbY3LxW/Lwdtj5PulGcZ6NdHWDHQv39LQjfJOrb4ES2z0bdTZAuLHHfmon+5kofX3ZqZ6N8+TUbFPPSDRotx7nsavCm6pdkVndEzBf3IkRbZwuKEbnTob1o55xZPAcjDdu4xCvSAC+2t4oy2RmPhXB+4nxc9oBxoh09GR/O3FOc69LhTaqL7nAUuTKPoavb37usmLLrHaah6CvDMxznIFlY4dJeT0MdAz+OzC0Z3KIY+vXp8mpscAv3ks4UqM/fB5wjIgdEtjdpa8aw2XyIhB0Tfax66FVfy14jIgdB3mj/5urEna/obohued14d9nmEZG20HZD8mn0RKVkT/TPklw/ZVxGTNdHhv77C98jJC0cvZsXoGB2jY3SMjtExOkYvGy3yBVmRryJnxKEzQl+vlzfI8E6RoCEro0nIHM4RNgZVGw9UCho4mxymZEcEeUf+EKXIcdXxYLCZW9L2GAweD1RuGla3G2zOHMGeGHZPc4A987/exUYXmwPSJElMC/8AAsbzwJ8A0u0AAAAASUVORK5CYII=")',n.style.backgroundSize=(i/3>90?90:i/3)+"px"),n.classList.remove("loaded"),n.classList.remove("loading"),n.classList.add("error")}}}}])});
//# sourceMappingURL=xy-ui.js.map