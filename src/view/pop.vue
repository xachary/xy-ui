<template>
  <div class="pad pop">
    <h4>Confirm</h4>
    <h3>Confirm default</h3>
    <div><button @click="onConfirmShow">Show</button></div>
    <h3>Confirm more than one</h3>
    <div><button @click="onConfirmMoreThanShow">Show</button></div>
    <h3>Confirm with long content</h3>
    <div><button @click="onConfirmLongContentShow">Show</button></div>
    <xy-confirm @on-confirm="onConfirmLongContentConfirm"
                @on-cancel="onCancel"
                v-model="confirmLongContentShow">
      <div class="long-content">
        Long content<br>
        Scroll me<br>
      </div>
    </xy-confirm>
    <h3>Confirm with custom button</h3>
    <div><button @click="onConfirmCustomButtonShow">Show</button></div>
    <xy-confirm msg="<b style='color:red'>消息</b>消息"
                v-model="confirmCustomButtonShow">
      <template slot="btns">
        <button @click="onConfirmCustomButtonCancel">Cancel</button>
        <button @click="onConfirmCustomButtonConfirm"
                disabled>Button2</button>
        <button @click="onConfirmCustomButtonConfirm"
                class="xy-pop__mask__footer__btn--confirm">Button3</button>
        <button @click="onConfirmCustomButtonConfirm"
                disabled
                class="xy-pop__mask__footer__btn--confirm">Button4</button>
      </template>
    </xy-confirm>
    <h3>Confirm with no title</h3>
    <div><button @click="onConfirmNoTitleShow">Show</button></div>
    <h3>Confirm not hide by hand</h3>
    <div><button @click="onConfirmNotHideShow">Show</button></div>
    <h3>Confirm with other option</h3>
    <div><button @click="onConfirmOtherOptionShow">Show</button></div>
    <br>
    <h4>Alert</h4>
    <h3>Alert default</h3>
    <div><button @click="onAlertShow">Show</button></div>
    <h3>Alert more than one</h3>
    <div><button @click="onAlertMoreThanShow">Show</button></div>
    <h3>Alert with long content</h3>
    <div><button @click="onAlertLongContentShow">Show</button></div>
    <xy-alert @on-confirm="onAlertLongContentConfirm"
              @on-cancel="onCancel"
              v-model="alertLongContentShow">
      <div class="long-content">
        Long content<br>
        Scroll me<br>
      </div>
    </xy-alert>
    <h3>Alert with custom button</h3>
    <div><button @click="onAlertCustomButtonShow">Show</button></div>
    <xy-confirm msg="<b style='color:red'>消息</b>消息"
                v-model="alertCustomButtonShow">
      <template slot="btns">
        <button @click="onAlertButtonCancel">Cancel</button>
        <button @click="onAlertCustomButtonConfirm"
                disabled>Button2</button>
        <button @click="onAlertCustomButtonConfirm"
                class="xy-pop__mask__footer__btn--confirm">Button3</button>
        <button @click="onAlertCustomButtonConfirm"
                disabled
                class="xy-pop__mask__footer__btn--confirm">Button4</button>
      </template>
    </xy-confirm>
    <h3>Alert with no title</h3>
    <div><button @click="onAlertNoTitleShow">Show</button></div>
    <h3>Alert not hide by hand</h3>
    <div><button @click="onAlertNotHideShow">Show</button></div>
    <h3>Alert with other option</h3>
    <div><button @click="onAlertOtherOptionShow">Show</button></div>
    <br>
    <h4>Toast</h4>
    <h3>Toast default</h3>
    <div><button @click="onToastShow">Show</button></div>
    <h3>Toast with img</h3>
    <div><button @click="onToastImgShow">Show</button></div>
    <h3>Toast with type</h3>
    <div>
      <button @click="onToastTypeShow('success')">Success</button>
      <button @click="onToastTypeShow('fail')">Fail</button>
      <button @click="onToastTypeShow('warn')">Warn</button>
    </div>
    <br>
    <h4>Loading</h4>
    <h3>Loading default</h3>
    <div><button @click="onLoadingShow">Show</button></div>
    <h3>Loading with mask</h3>
    <div><button @click="onLoadingMashShow">Show</button></div>
    <h3>Loading with img</h3>
    <div><button @click="onLoadingImgShow">Show</button></div>
    <h3>Loading with msg</h3>
    <div><button @click="onLoadingMsgShow">Show</button></div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        confirmLongContentShow: false,
        confirmCustomButtonShow: false,
        confirmShow: false,
        //
        alertLongContentShow: false,
        alertCustomButtonShow: false,
        //
        timer: null
      }
    },
    methods: {
      onConfirmShow: function() {
        this.$xyPop
          .confirm(
            "<b style='color:red'>消息</b>消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息",
            {
              onConfirm: function(e) {
                console.log('onConfirm')
              },
              onCancel: function(e) {
                console.log('onCancel')
              }
            }
          )
          .then(function(result) {
            console.log(result)
          })
      },
      //
      async onConfirmMoreThanShow() {
        this.$xyPop.confirm(
          "<b style='color:red'>消息</b>消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息"
        )
        this.$xyPop.confirm(
          "<b style='color:green'>消息</b>消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息"
        )
        this.$xyPop.confirm("<b style='color:blue'>消息</b>消息")
      },
      //
      onConfirmLongContentShow: function() {
        this.confirmLongContentShow = true
      },
      onConfirmLongContentConfirm: function() {},
      //
      onConfirmCustomButtonShow: function() {
        this.confirmCustomButtonShow = true
      },
      onConfirmCustomButtonConfirm: function() {
        this.confirmCustomButtonShow = false
      },
      onConfirmCustomButtonCancel: function() {
        this.confirmCustomButtonShow = false
      },
      //
      onConfirmNoTitleShow: function() {
        this.$xyPop
          .confirm(
            "<b style='color:red'>消息</b>消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息",
            {
              showTitle: false
            }
          )
          .then(function(result) {
            console.log(result)
          })
      },
      //
      onConfirmNotHideShow: function() {
        this.$xyPop
          .confirm(
            "<b style='color:red'>消息</b>消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息",
            {
              confirmNotHide: true,
              onConfirm: function(e) {
                console.log('onConfirm')
                setTimeout(function() {
                  e.hide()
                }, 3000)
              }
            }
          )
          .then(function(result) {
            console.log(result)
          })
      },
      //
      onConfirmOtherOptionShow: function() {
        this.$xyPop
          .confirm(
            "<b style='color:red'>消息</b>消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息",
            {
              title: 'title2',
              cancelText: 'cancel2',
              confirmText: 'confirm2'
            }
          )
          .then(function(result) {
            console.log(result)
          })
      },
      //
      onConfirm: function(e) {
        console.log('onConfirm')
        setTimeout(function() {
          e.hide()
        }, 3000)
      },
      onCancel: function() {
        console.log('onCancel')
      },
      //
      onAlertShow: function() {
        this.$xyPop
          .alert(
            "<b style='color:red'>消息</b>消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息",
            {
              onConfirm: function(e) {
                console.log('onConfirm')
              }
            }
          )
          .then(function() {})
      },
      //
      async onAlertMoreThanShow() {
        this.$xyPop.alert(
          "<b style='color:red'>消息</b>消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息"
        )
        this.$xyPop.alert(
          "<b style='color:green'>消息</b>消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息"
        )
        this.$xyPop.alert("<b style='color:blue'>消息</b>消息")
      },
      //
      onAlertLongContentShow: function() {
        this.alertLongContentShow = true
      },
      onAlertLongContentConfirm: function() {},
      //
      onAlertCustomButtonShow: function() {
        this.alertCustomButtonShow = true
      },
      onAlertCustomButtonConfirm: function() {
        this.alertCustomButtonShow = false
      },
      onAlertButtonCancel: function() {
        this.alertCustomButtonShow = false
      },
      //
      onAlertNoTitleShow: function() {
        this.$xyPop
          .alert(
            "<b style='color:red'>消息</b>消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息",
            {
              showTitle: false
            }
          )
          .then(function(result) {})
      },
      //
      onAlertNotHideShow: function() {
        this.$xyPop
          .alert(
            "<b style='color:red'>消息</b>消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息",
            {
              confirmNotHide: true,
              onConfirm: function(e) {
                console.log('onConfirm')
                setTimeout(function() {
                  e.hide()
                }, 3000)
              }
            }
          )
          .then(function(result) {})
      },
      //
      onAlertOtherOptionShow: function() {
        this.$xyPop
          .alert(
            "<b style='color:red'>消息</b>消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息",
            {
              title: 'title2',
              confirmText: 'confirm2'
            }
          )
          .then(function(result) {})
      },
      //
      onToastShow: function() {
        this.$xyPop.toast(
          new Array(Math.round(5 + Math.random() * 15)).join('通知')
        )
      },
      //
      onToastImgShow: function() {
        this.$xyPop.toast('通知通知通知', {
          img: 'https://placeimg.com/500/1000/any'
        })
      },
      //
      onToastTypeShow: function(type) {
        this.$xyPop.toast(
          type === 'success' ? '成功' : type === 'fail' ? '失败' : '提示',
          { type: type }
        )
      },
      //
      onLoadingShow: function() {
        var that = this
        this.$xyPop.loading.show()
        clearTimeout(this.timer)
        this.timer = setTimeout(function() {
          that.$xyPop.loading.hide()
        }, 2000)
      },
      onLoadingMashShow: function() {
        var that = this
        this.$xyPop.loading.show({ mask: true })
        clearTimeout(this.timer)
        this.timer = setTimeout(function() {
          that.$xyPop.loading.hide()
        }, 2000)
      },
      onLoadingImgShow: function() {
        var that = this
        this.$xyPop.loading.show({
          img: 'https://placeimg.com/200/200/any'
        })
        clearTimeout(this.timer)
        this.timer = setTimeout(function() {
          that.$xyPop.loading.hide()
        }, 2000)
      },
      onLoadingMsgShow: function() {
        var that = this
        this.$xyPop.loading.show({ msg: 'testing' })
        clearTimeout(this.timer)
        this.timer = setTimeout(function() {
          that.$xyPop.loading.hide()
        }, 2000)
      }
    },
    mounted: function() {}
  }
</script>

<style lang="scss" scoped>
  .pop {
    height: 150vh;
    .long-content {
      background: linear-gradient(yellow, green);
      height: 1000px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
</style>
