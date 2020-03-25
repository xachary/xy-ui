// function getStyleNum(value) {
//     return value ? parseInt(value.toString().replace(/[^\d.%]/g, '')) : 0
// }

function show(el, loading, ic, keep) {
    if (loading) {
        let style = getComputedStyle(el)
        el.setAttribute('disabled', 'disabled')
        el.dataset.height = el.style.height
        // el.style.height = el.offsetHeight + 'px'// - getStyleNum(style.borderTopWidth) - getStyleNum(style.borderBottomWidth) + 'px'
        let ct = document.createElement('div')
        ct.className = 'xy-btn-loading__icon'
        let icon = document.createElement('i')
        let icon2 = document.createElement('i')
        icon.style.borderLeftColor = style.color
        icon.style.borderRightColor = style.color
        icon2.style.borderLeftColor = style.color
        icon2.style.borderRightColor = style.color
        ct.append(icon)
        ct.append(icon2)
        el.prepend(ct)
        //
        if (ic) {
            el.classList.add('xy-btn-loading--icon')
            if (keep) {
                el.dataset.width = el.style.width
                el.style.width = el.offsetWidth + 'px'
            }
            for (let i = 0; i < el.children.length; i++) {
                if (!el.children[i].classList.contains('xy-btn-loading__icon')) {
                    el.children[i].dataset.visibility = el.children[i].style.visibility
                    el.children[i].style.visibility = 'hidden'
                    el.children[i].dataset.width = el.children[i].style.width
                    el.children[i].style.width = '0'
                }
            }
            for (let i = 0; i < el.childNodes.length; i++) {
                if (el.childNodes[i].nodeType === 3) {
                    el.dataset['text' + i] = el.childNodes[i].nodeValue
                    el.childNodes[i].replaceData(0, el.childNodes[i].nodeValue.length, '')
                }
            }
        }
    } else {
        if (ic) {
            el.classList.remove('xy-btn-loading--icon')
            if (keep) {
                el.style.width = el.dataset.width + 'px'
            }
            for (let i = 0; i < el.children.length; i++) {
                if (!el.children[i].classList.contains('xy-btn-loading__icon')) {
                    el.children[i].style.visibility = el.children[i].dataset.visibility
                    el.children[i].style.width = el.children[i].dataset.width
                }
            }
            for (let i = 0; i < el.childNodes.length; i++) {
                if (el.childNodes[i].nodeType === 3 && el.dataset['text' + i]) {
                    el.childNodes[i].replaceData(0, el.childNodes[i].nodeValue.length, el.dataset['text' + i])
                }
            }
        }
        //
        el.removeAttribute('disabled')
        el.style.height = el.dataset.height + 'px'
        let rms = []
        for (let i = 0; i < el.children.length; i++) {
            if (el.children[i].classList.contains('xy-btn-loading__icon')) {
                rms.push(el.children[i])
            }
        }
        rms.forEach(o => {
            o.remove()
        })
    }
}
export default {
    name: 'xy-btn-loading',
    // (el, { value, arg, modifiers })
    bind(el) {
        el.classList.add('xy-btn-loading')
    },
    inserted(el, { value, modifiers }) {
        show(el, value, modifiers.icon, modifiers.keep)
    },
    update(el, { value, modifiers }) {
        show(el, value, modifiers.icon, modifiers.keep)
    },
    unbind(el, { modifiers }) {
        show(el, false, modifiers.icon, modifiers.keep)
        el.classList.remove('xy-btn-loading')
    }
}