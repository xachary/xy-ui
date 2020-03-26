function parseData(value) {
    let loading = false
    let color = '#efefef'
    let max = 3
    let min = 3
    let sec = 2
    if (typeof value === 'object') {
        loading = value.loading
        if (value.color) {
            color = value.color
        }
        if (typeof value.max !== 'undefined') {
            max = value.max
            min = max
        }
        if (typeof value.min !== 'undefined') {
            min = value.min
        }
    } else {
        loading = value
    }
    let opt = {
        loading, color, max, min, sec
    }
    return opt
}

export default {
    name: 'xy-loading',
    // (el, { value, arg, modifiers })
    inserted(el, { value, modifiers }) {
        let opt = parseData(value)

        let { height, width, left } = el.getBoundingClientRect()
        let ww = window.innerWidth

        el.classList.add('xy-loading')

        if (!el.style.position) {
            el.style.position = 'relative'
        }

        if (modifiers.multiple) {
            if (height <= 0) {
                height = Math.floor(width / 3)
            }
            let gap = height / opt.max / 5
            let lineHeight = (height - gap * (opt.max - 1)) / opt.max
            let lastWidth = Math.floor(width * 0.6)

            for (let i = 0; i < opt.min; i++) {
                let container = document.createElement('div')
                container.classList.add('xy-loading__ct')
                container.style.backgroundColor = opt.color
                container.style.height = lineHeight + 'px'

                if (opt.min > 1 && i === opt.min - 1) {
                    container.style.width = lastWidth + 'px'
                }

                if (i > 0) {
                    container.style.marginTop = gap + 'px'
                }

                let cover = document.createElement('div')
                cover.className = 'xy-loading__ct__flow'
                cover.style.animationDelay = left / (ww * 1.6) * opt.sec + 's'

                container.append(cover)
                el.append(container)
            }

        } else {
            let container = document.createElement('div')
            container.classList.add('xy-loading__ct')
            container.style.backgroundColor = opt.color
            container.style.position = 'absolute'

            let cover = document.createElement('div')
            cover.className = 'xy-loading__ct__flow'
            cover.style.animationDelay = left / (ww * 1.6) * opt.sec + 's'

            container.append(cover)
            el.append(container)

        }
    },
    update(el, { value }) {
        let opt = parseData(value)
        if (!opt.loading) {
            el.remove()
        }
    },
    unbind(el) {
        el.remove()
    }
}