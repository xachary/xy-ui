import Vue from 'vue'
import ConfirmComponent from '@/lib/components/xy-pop/confirm.vue'
import AlertComponent from '@/lib/components/xy-pop/alert.vue'
import ToastComponent from '@/lib/components/xy-pop/toast.vue'
import LoadingComponent from '@/lib/components/xy-pop/loading.vue'
let ConfirmConstructor = Vue.extend(ConfirmComponent)
let AlertConstructor = Vue.extend(AlertComponent)
let ToastConstructor = Vue.extend(ToastComponent)
let LoadingConstructor = Vue.extend(LoadingComponent)

function confirm(msg, opts = {}) {
    var that = this
    return new Promise(function (resolve) {
        let ConfirmInstance = new ConfirmConstructor()

        // 满足v-model
        ConfirmInstance.$on('change', function (v) {
            ConfirmInstance.show = v
            if (!v) {
                ConfirmInstance.$el.remove()
            }
        })

        // on-confirm
        ConfirmInstance.$on('on-confirm', function (e) {
            if (typeof opts.onConfirm === 'function') {
                opts.onConfirm.call(that, e)
            }
            resolve(true)
        })

        // on-cancel
        ConfirmInstance.$on('on-cancel', function (e) {
            if (typeof opts.onCancel === 'function') {
                opts.onCancel.call(that, e)
            }
            ConfirmInstance.$el.remove()
            resolve(false)
        })

        // on-mounted
        ConfirmInstance.$on('on-mounted', function () {
            setTimeout(() => {
                ConfirmInstance.open(msg, opts)
            }, 100)
        })

        let el = document.createElement('div')
        document.body.appendChild(el)
        ConfirmInstance.$mount(el)
    })
}

function alert(msg, opts = {}) {
    var that = this
    return new Promise(function (resolve) {
        let AlertInstance = new AlertConstructor()

        // 满足v-model
        AlertInstance.$on('change', function (v) {
            AlertInstance.show = v
            if (!v) {
                AlertInstance.$el.remove()
            }
        })

        // on-confirm
        AlertInstance.$on('on-confirm', function (e) {
            if (typeof opts.onConfirm === 'function') {
                opts.onConfirm.call(that, e)
            }
            resolve(true)
        })

        // on-mounted
        AlertInstance.$on('on-mounted', function () {
            setTimeout(() => {
                AlertInstance.open(msg, opts)
            }, 100)
        })

        let el = document.createElement('div')
        document.body.appendChild(el)
        AlertInstance.$mount(el)
    })
}

function toast(msg, opts = {}) {
    let ToastInstance = new ToastConstructor()

    // 满足v-model
    ToastInstance.$on('change', function (v) {
        ToastInstance.show = v
        if (!v) {
            setTimeout(() => {
                ToastInstance.$el.remove()
                let ct = document.querySelector('#xy-toasts')
                if (ct.children.length === 0) {
                    ct.remove()
                }
            }, 300)
        }
    })

    // on-mounted
    ToastInstance.$on('on-mounted', function () {
        setTimeout(() => {
            ToastInstance.open(msg, opts)
        }, 100)
    })
    let el = document.createElement('div')
    let ct = document.querySelector('#xy-toasts')
    if (!ct) {
        ct = document.createElement('div')
        ct.id = "xy-toasts"
        document.body.appendChild(ct)
    }
    ct.appendChild(el)
    ToastInstance.$mount(el)
}

let LoadingInstance = null

const loading = {
    show: function (msg, opts = {}) {
        let exist = document.querySelector('.xy-pop-loading')
        if (exist && LoadingInstance) {
            LoadingInstance.open(msg, opts)
        } else {
            LoadingInstance = new LoadingConstructor

            // 满足v-model
            LoadingInstance.$on('change', function (v) {
                LoadingInstance.show = v
            })

            // on-mounted
            LoadingInstance.$on('on-mounted', function () {
                setTimeout(() => {
                    LoadingInstance.open(msg, opts)
                }, 100)
            })
            let el = document.createElement('div')
            document.body.appendChild(el)
            LoadingInstance.$mount(el)
        }
    },
    hide() {
        let exist = document.querySelector('.xy-pop-loading')
        if (exist) {
            exist.remove()
        }
    }
}

export default {
    confirm,
    alert,
    toast,
    loading
}