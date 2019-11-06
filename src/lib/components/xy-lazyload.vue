<template>
    <div
        class="lazy-load"
        :style="{'width':width,'height':height}"
    >
        <img
            v-lazy="src"
            :class="{'lazy-cover':size==='cover','lazy-contain':size==='contain'}"
            :error-img="errorImg"
        >
    </div>
</template>

<script>
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

const xyLazyloadResize = {
    preLoad: 2,
    attempt: 1,
    //TODO:瑕疵点: 还没加载完成图片, 数据更新, 重新加载时, 偶发加载图片样式有误.
    //原因: Lazyload的loading事件有几率滞后于替换为loading的图片.
    //导致上一张图片大小遗留影响到loading图片.
    adapter: {
        loaded({ el }, formCache) {
            let parent = el.parentElement
            parent.style.backgroundImage = `url("${el.src}")`
            if (el.classList.contains('lazy-contain')) {
                parent.style.backgroundSize = 'contain'
            } else if (el.classList.contains('lazy-cover')) {
                parent.style.backgroundSize = 'cover'
            } else {
                parent.style.backgroundImage = null
            }

            parent.classList.remove('loading')
            parent.classList.remove('error')
            parent.classList.add('loaded')
        },
        loading({ el }) {
            let parent = el.parentElement
            let min =
                parent.offsetWidth > parent.offsetHeight
                    ? parent.offsetHeight
                    : parent.offsetWidth
            parent.style.backgroundImage =
                'url("data:image/gif;base64,R0lGODlhEgASAIABAKa4zP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAwABACwAAAAAEgASAEACJwyOoYa3D6N8rVqgLp5M2+x9XcWBTTmGTqqa6qqxFInWUMzhk76TBQAh+QQJAwABACwAAAAAEgASAEACKQyOoYa3D6NUrdHqGJ44d3B9m1ZNZGZ+YXmKnsuq44qaNqSmnZ3rllIAACH5BAkDAAEALAAAAAASABIAQAIpDI6hhrcPo2zt0cRuvG5xoHxfyE2UZJWeKrLtmZ3aWqG2OaOjvfPwUgAAIfkECQMAAQAsAAAAABIAEgBAAigMjqGGtw8jbC3SxO67bnLFhQD4bZRkap4qli37qWSF1utZh7a+41ABACH5BAkDAAEALAAAAAASABIAQAIqDI6hhrcP42pNMgoUdpfanXVgJSaaZ53Yt6kj+a6lI7tcioN5m+o7KSkAACH5BAkDAAEALAAAAAASABIAQAIoDI6hhrcPI2tOKpom3vZyvVEeBgLdKHYhGjZsW63kMp/Sqn4WnrtnAQAh+QQJAwABACwAAAAAEgASAEACKAyOocvtCCN0TB5lM6Ar92hYmChxX2l6qRhqYAui8GTOm8rhlL6/ZgEAIfkECQMAAQAsAAAAABIAEgBAAigMjqHL7QgjdEyeJY2leHOdgZF4KdYJfGTynaq7XmGctuicwZy+j2oBACH5BAkDAAEALAAAAAASABIAQAInDI6hy+0II3RMHrosUFpjbmUROJFdiXmfmoafMZoodUpyLU5sO1MFACH5BAkDAAEALAAAAAASABIAQAImDI6hy+2GDozyKZrspBf7an1aFy2fuJ1Z6I2oho2yGqc0SYN1rRUAIfkECQMAAQAsAAAAABIAEgBAAiYMjqHL7W+QVLJaAOnVd+eeccliRaXZVSH4ee0Uxg+bevUJnuIRFAAh+QQJAwABACwAAAAAEgASAEACKoyBacvtnyI4EtH6QrV6X5l9UYgt2DZ1JRqqIOm1ZUszrIuOeM6x8x4oAAAh+QQJAwABACwAAAAAEgASAEACKIwNqcftryJAMrFqG55hX/wcnlN9UQeipZiGo9vCZ0hD6TbiN7hSZwEAIfkECQMAAQAsAAAAABIAEgBAAiiMH6CL7Z+WNHK2yg5WdLsNQB12VQgJjmZJiqnriZEl1y94423aqlwBACH5BAkDAAEALAAAAAASABIAQAIrjH+gi+2+IjCSvaoo1vUFPHnfxlllBp5mk4qt98KSSKvZCHZ4HtmTrgoUAAAh+QQFAwABACwAAAAAEgASAEACKIyPAcvpr5g0csJYc8P1cgtpwDceGblQmiey69W6oOfEon2f6KirUwEAIfkECQMAAQAsAAAPAAgAAwBAAgSMj6lXACH5BAkDAAEALAAAAAASABIAQAIYjI+JwK0Po5y02glUvrz7bzXiBpbLaD4FACH5BAkDAAEALAAAAAASABIAQAImjI8By8qfojQPTldzw/VymB3aCIidN6KaGl7kSnWpC6ftt00zDRUAIfkECQMAAQAsAAAAABIAEgBAAiaMjwHLyp+iNA9WcO6aVHOneWBYZeUXouJEiu1lWit7jhCX4rMEFwAh+QQJAwABACwAAAAAEgASAEACJ4yPAcvKn6I0r1pA78zWQX51XrWBSzl+Uxia7Jm+mEujW3trubg3BQAh+QQFAwABACwAAAAAEgASAEACJwyOoYa3D6N8rVqgLp5M2+x9XcWBTTmGTqqa6qqxFInWUMzhk76TBQA7")'
            parent.style.backgroundSize = `${min / 3 > 18 ? 18 : min / 3}px`
            parent.classList.remove('loaded')
            parent.classList.remove('error')
            parent.classList.add('loading')
        },
        error({ el }) {
            let parent = el.parentElement
            let min =
                parent.offsetWidth > parent.offsetHeight
                    ? parent.offsetHeight
                    : parent.offsetWidth

            let errorImg = el.getAttribute('error-img')
            if (errorImg) {
                parent.style.backgroundImage = `url("${errorImg}")`
                if (el.classList.contains('lazy-contain')) {
                    parent.style.backgroundSize = 'contain'
                } else if (el.classList.contains('lazy-cover')) {
                    parent.style.backgroundSize = 'cover'
                } else {
                    parent.style.backgroundImage = null
                }
            } else {
                parent.style.backgroundImage =
                    'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAQAAACSoYmJAAACwElEQVRo3u3b3VLaQBTA8Z1x5NoHo9f6OPgIouNb+BZFg1SBWlsL41dLK+FDW2UUEPj3AqEYErIJQfa0OXsN85vM2bN7IEepqWCVJFvsU6XNsqJNlX22SLKq/II1UtQwKeqkWJtF3qCKiVFlwx28wi4mxy4r0+Q9TI89B5ttJMTOJHkdKbH+t2LYYtD2SyUhhaRIKaVIGFaX/aJGQpFEWiQVaXHobcV7ceiMEpbRADVFRxy6oxAY/x56QIMyebLkKFKmycB09C0FLMcq0DQXPeB6Cjxa10t/3h5ob/KQbSC6OZNsYS05SZRbahz7oo+XmiLKrf21NFbdLHRJC10yC53XQufNQh9qobNmoXMS0QWJ6SFyI4oseXqHSz8+xv/XCxMMuPQkX5p6NR0mibAmYPS865TIkyVLnhL1yJ/xD66kNbY3LxW/Lwdtj5PulGcZ6NdHWDHQv39LQjfJOrb4ES2z0bdTZAuLHHfmon+5kofX3ZqZ6N8+TUbFPPSDRotx7nsavCm6pdkVndEzBf3IkRbZwuKEbnTob1o55xZPAcjDdu4xCvSAC+2t4oy2RmPhXB+4nxc9oBxoh09GR/O3FOc69LhTaqL7nAUuTKPoavb37usmLLrHaah6CvDMxznIFlY4dJeT0MdAz+OzC0Z3KIY+vXp8mpscAv3ks4UqM/fB5wjIgdEtjdpa8aw2XyIhB0Tfax66FVfy14jIgdB3mj/5urEna/obohued14d9nmEZG20HZD8mn0RKVkT/TPklw/ZVxGTNdHhv77C98jJC0cvZsXoGB2jY3SMjtExOkYvGy3yBVmRryJnxKEzQl+vlzfI8E6RoCEro0nIHM4RNgZVGw9UCho4mxymZEcEeUf+EKXIcdXxYLCZW9L2GAweD1RuGla3G2zOHMGeGHZPc4A987/exUYXmwPSJElMC/8AAsbzwJ8A0u0AAAAASUVORK5CYII=")'
                parent.style.backgroundSize = `${min / 3 > 90 ? 90 : min / 3}px`
            }
            parent.classList.remove('loaded')
            parent.classList.remove('loading')
            parent.classList.add('error')
        }
    }
}
// if (typeof window !== 'undefined' && window.Vue) {
//     window.Vue.use(VueLazyload, xyLazyloadResize)
// }

Vue.use(VueLazyload, xyLazyloadResize)

export default {
    name: 'xy-lazyload',
    props: {
        // 宽（样式值）
        width: {
            type: String,
            default: ''
        },
        // 高（样式值）
        height: {
            type: String,
            default: ''
        },
        // 图片地址
        src: {
            type: String,
            default: ''
        },
        // 尺寸
        size: {
            type: String,
            default: ''
        },
        // 自定义错误图片
        errorImg: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
        }
    },
    computed: {
    },
    beforeMount() {
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<style lang="scss">
@import '~@/lib/scss/style';
</style>