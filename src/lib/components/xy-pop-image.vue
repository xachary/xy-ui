<template>
  <div class="blk-pop-image"
       v-show="visible"
       @touchstart.stop
       @touchmove.stop>
    <div class="blk-pop-image-bg"></div>
    <img class="blk-pop-image-img"
         :class="{done:done}"
         :src="img"
         @load="onLoad"
         ref="img"
         :style="{opacity:loading?0:1,visibility:loading?'hidden':'visible',top:`${top}px`,left:`${left}px`,width:`${width}px`,height:`${height<=0?'auto':(height+'px')}`}"
         @touchstart.prevent="onTouchstart"
         @touchmove.prevent="onTouchmove"
         @touchend.prevent="onTouchend">
    <div class="blk-pop-image-close"
         @click.stop="onClose"><span></span><span></span><span></span><span></span></div>
    <div class="blk-pop-image-loading"
         v-show="loading"></div>
  </div>
</template>

<script>
  //更新坐标值
  function setPoints (map, points) {
    map.value = []
    for (var i = 0; i < points.length; i++) {
      map.value.push({
        id: points[i].identifier,
        x: parseInt(points[i].clientX),
        y: parseInt(points[i].clientY)
      })
    }
  }

  //删除坐标
  function deletePoint (map, point, state) {
    for (var i = 0; i < map.value.length; i++) {
      if (map.value[i].id === point.identifier) {
        map.value.splice(i, 1)
        break
      }
    }
  }

  //复制坐标值
  function copyPoint (target, source) {
    for (var i = 0; i < target.value.length; i++) {
      for (var j = 0; j < source.value.length; j++) {
        if (target.value[i].id === source.value[j].id) {
          target.value[i].x = source.value[j].x
          target.value[i].y = source.value[j].y
        }
      }
    }
  }

  //判断是否在区域内
  function isInside (x, y, cx, cy, w, h) {
    if (x < cx || x > cx + w) {
      return false
    }
    else if (y < cy || y > cy + h) {
      return false
    }
    return true
  }

  /**
   * 缓动工具
   */
  var moveTool = (function () {
    //缓动公式
    var moveFn = {
      Linear: function (t, b, c, d) {
        return c * t / d + b
      },
      CircularEaseInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
      },
      CubicEaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b
      },
      QuartEaseOut: function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b
      },
      ExpoEaseOut: function (t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
      }
    }

    //毫秒
    var rate = 1000
    var time = 10

    /**
     * 缓动方法
     * @param before 前值
     * @param after 后值
     * @param callback 每帧回调
     * @param finish 完成回调
     * @param r 动画时长(可选)
     * @param fn 缓动公式(可选)
     */
    function move (before, after, callback, finish, r, fn) {
      var i    = 0,
          itv  = null,
          func = null
      if (!r) {
        r = rate
      }
      if (!fn) {
        func = moveFn.CircularEaseInOut
      }
      else {
        func = moveFn[fn]
      }
      itv = setInterval(function () {
        var s = r * time / 100
        var n = func(i, before, after - before, s)
        if (typeof (callback) == 'function') {
          callback.call(null, n)
        }
        if (i >= s) {
          clearInterval(itv)
          itv = null
          if (typeof (finish) == 'function') {
            finish.call()
          }
        }
        else {
          i++
        }
      }, time)
      return itv
    }

    /**
     * 缓动方法(多次)
     * @param list 数值变化数组,如[0,100,300...]即值从0到100,然后从100到300...
     * @param callback 每帧回调
     * @param finish 完成回调
     * @param r 动画时长(可选)
     * @param fn 缓动公式(可选)
     */
    function moveSq (list, callback, finish, r, fn) {
      if (list.length > 1) {
        moveDeep(list, callback, finish, r, 0, list.length, fn)
      }
      else {
        if (typeof (finish) == 'function') {
          finish.call()
        }
      }
    }

    //moveSq的递归方法
    function moveDeep (list, callback, finish, r, index, length, fn) {
      move(list[index], list[index + 1], function (val) {
        callback.call(null, val, index)
      }, function () {
        if (index < length - 2) {
          moveDeep(list, callback, finish, r, index + 1, length, fn)
        }
        else {
          if (typeof (finish) == 'function') {
            finish.call()
          }
        }
      }, r, fn)
    }

    return {
      move: move,
      moveSq: moveSq
    }
  })()

  //动画定时器
  let inter = {
    x: null,
    y: null
  }

  let interX = []
  let interY = []

  function clearIntervals (array) {
    array.forEach(function (item, index) {
      clearInterval(item)
    })
  }

  export default {
    name: 'xy-pop-image',
    data () {
      return {
        visible: false,
        img: '',
        imgs: [],
        index: 0,
        loading: true,
        done: false,

        top: 0,
        left: 0,
        width: window.innerWidth,
        height: 0,

        opts: {
          moveLimit: 50,
          onLoad: function () {

          },
          //          onNext: function () {
          //
          //          },
          //          onPre: function () {
          //
          //          }
        },
        //图片节点样式状态
        imgState: {
          start: {
            top: 0,
            left: 0,
            width: 0,
            height: 0
          },
          end: {
            top: 0,
            left: 0,
            width: 0,
            height: 0
          }
        },
        //滑动速度
        speed: {
          x: 0,
          y: 0
        },
        //触摸开始坐标
        starts: {value: []},
        //触摸移动坐标
        moves: {value: []},
        //对角线长
        len: {
          start: 0,
          move: 0
        },
        //缩放比例
        rate: 1,
        //触摸开始x轴两点的中点
        cenX: {
          start: 0,
          move: 0
        },
        //触摸开始y轴两点的中点
        cenY: {
          start: 0,
          move: 0
        },
        ww: window.innerWidth,
        wh: window.innerHeight,
        oh: 0,
        ow: 0,
        clickTime: null
      }
    },
    methods: {
      //      setImg (img) {
      //        let that = this
      //        that.img = img
      //        that.loading = true
      //      },
      onClose () {
        let that = this
        that.visible = false
        //        debugger
      },
      onLoad () {
        let that = this
        that.reset()
        that.$nextTick(function () {
          that.popup()
        })
      },
      onTouchstart (e) {
        let that = this
        //停止动画
        clearIntervals(interX)
        clearIntervals(interY)

        that.speed.x = 0
        that.speed.y = 0
        // if (!interX && !interY) {
        //记录上一帧触摸开始坐标
        var tx = 0
        var ty = 0
        var preCount = that.starts.value.length
        if (preCount > 0) {
          tx = that.starts.value[0].x
          ty = that.starts.value[0].y
        }
        //刷新触摸开始坐标
        setPoints(that.starts, e.touches)

        //情况: 先击非图片区域, 后点点击图片区域, 然后缩放滑动1
        if (!isInside(e.touches[0].clientX, e.touches[0].clientY, that.imgState.start.left, that.imgState.start.top, that.imgState.start.width, that.imgState.start.height)) {
          deletePoint(that.starts, e.touches[0])
        }
        //如果双点触摸
        if (that.starts.value.length > 1) {
          //情况: 先击非图片区域, 后点点击图片区域, 然后缩放滑动2
          if (!isInside(e.touches[1].clientX, e.touches[1].clientY, that.imgState.start.left, that.imgState.start.top, that.imgState.start.width, that.imgState.start.height)) {
            deletePoint(that.starts, e.touches[1])
          }

          that.len.start = Math.sqrt(Math.pow(that.starts.value[0].x - that.starts.value[1].x, 2) + Math.pow(that.starts.value[0].y - that.starts.value[1].y, 2))

          var tempCenX = (that.starts.value[0].x + that.starts.value[1].x) / 2
          var tempCenY = (that.starts.value[0].y + that.starts.value[1].y) / 2

          if (preCount == 0) {
            //突然出现两个触摸点的时候
            that.cenX.start = tempCenX
            that.cenY.start = tempCenY
          }
          else {
            //虚构补充单点触摸时的假两点的中点(关键2)
            //新中点 - 旧中点(虚构补充)
            that.cenX.start = tempCenX - (that.starts.value[0].x - tx)
            that.cenY.start = tempCenY - (that.starts.value[0].y - ty)
          }
        } else {
          let oldClickTime = that.clickTime
          that.clickTime = (new Date()).getTime()
          if (oldClickTime) {
            if (that.clickTime - oldClickTime < 200) {
              console.log('双击')
              that.reset()
              that.$nextTick(function () {
                that.popup()
              })
              that.clickTime = null
            }
          }
        }
        // }
      },
      onTouchmove (e) {
        let that = this
        //        debugger
        // if (!interX && !interY) {
        //刷新触摸移动坐标
        setPoints(that.moves, e.touches)
        //删除不在图片区域的触摸点坐标(不产生start, 却产生了move的触摸点)
        //情况: 先点击图片区域, 后点击非图片区域, 然后缩放滑动
        for (var i = 0; i < e.touches.length; i++) {
          //排除超出显示区域的触摸
          if (e.touches[i].clientX <= 0 + that.opts.moveLimit
            || e.touches[i].clientX >= that.ww - that.opts.moveLimit
            || e.touches[i].clientY <= 0 + that.opts.moveLimit
            || e.touches[i].clientY >= that.wh - that.opts.moveLimit) {
            return
          }

          var has = false
          for (var j = 0; j < that.starts.value.length; j++) {
            if (that.starts.value[j].id == e.touches[i].identifier) {
              has = true
              break
            }
          }
          if (!has) {
            deletePoint(that.moves, e.touches[i])
          }
        }
        if (that.moves.value.length > 1) {
          //如果双点触摸
          that.len.move = Math.sqrt(Math.pow(that.moves.value[0].x - that.moves.value[1].x, 2) + Math.pow(that.moves.value[0].y - that.moves.value[1].y, 2))
          //根据对角线长度变化计算缩放比例
          that.rate = (that.len.move / that.len.start).toFixed(2)
          //双点触摸两点的中点坐标
          that.cenX.move = (that.moves.value[0].x + that.moves.value[1].x) / 2
          that.cenY.move = (that.moves.value[0].y + that.moves.value[1].y) / 2
          //新宽高
          var tmp_w = that.imgState.start.width * that.rate
          var tmp_h = that.imgState.start.height * that.rate
          //限制缩放大小
          if (tmp_w <= that.ww && tmp_h <= that.wh) {
            tmp_w = that.imgState.start.width
            tmp_h = that.imgState.start.height
            //判断不准确,需要修改
            if (that.ww - tmp_w > that.wh - tmp_h) {
              tmp_w = that.ow / oh * that.wh
              tmp_h = that.wh
              that.imgState.end.top = 0
              that.imgState.end.left = (that.ww - tmp_w) / 2
            } else if (that.ww - tmp_w < that.wh - tmp_h) {
              tmp_w = that.ww
              tmp_h = oh / that.ow * that.ww
              that.imgState.end.top = (that.wh - tmp_h) / 2
              that.imgState.end.left = 0
            }
          } else {
            //图片缩放后的顶点坐标(关键1)
            //l2   cx - x2   cy - y2
            //-- = ------- = -------
            //l1   cx - x1   cy - y1
            //分别求 x2,y2
            that.imgState.end.top = (that.cenY.move - that.len.move / that.len.start * (that.cenY.move - that.imgState.start.top)) + (that.cenY.move - that.cenY.start) * that.rate
            that.imgState.end.left = (that.cenX.move - that.len.move / that.len.start * (that.cenX.move - that.imgState.start.left)) + (that.cenX.move - that.cenX.start) * that.rate
          }
          //图片缩放尺寸
          that.imgState.end.width = tmp_w
          that.imgState.end.height = tmp_h
          that.speed.x = (that.cenX.move - that.cenX.start) * that.rate
          that.speed.y = (that.cenY.move - that.cenY.start) * that.rate
        }
        else {
          //如果单点点触摸
          //图片顶点坐标
          that.imgState.end.top = that.imgState.start.top + (that.moves.value[0].y - that.starts.value[0].y)
          that.imgState.end.left = that.imgState.start.left + (that.moves.value[0].x - that.starts.value[0].x)

          that.speed.x = that.moves.value[0].x - that.starts.value[0].x
          that.speed.y = that.moves.value[0].y - that.starts.value[0].y
        }
        //        debugger
        //更新图片样式
        that.top = that.imgState.end.top
        that.left = that.imgState.end.left
        that.width = that.imgState.end.width
        that.height = that.imgState.end.height
        // }
      },
      onTouchend (e) {
        let that = this
        // if (!interX && !interY) {
        //删除已离开触摸点坐标
        for (var i = 0; i < e.changedTouches.length; i++) {
          deletePoint(that.starts, e.changedTouches[i])
          deletePoint(that.moves, e.changedTouches[i])
        }

        //更新尚在的触摸点坐标
        copyPoint(that.starts, that.moves)
        //更新图片样式值
        that.imgState.start.top = that.imgState.end.top
        that.imgState.start.left = that.imgState.end.left
        that.imgState.start.width = that.imgState.end.width
        that.imgState.start.height = that.imgState.end.height

        //临时位置动画逻辑
        if (that.imgState.start.width <= that.ww && that.imgState.start.height <= that.wh) {
          if (that.imgState.start.width === that.ww) {
            interX.push(moveTool.move(that.imgState.start.left, 0, function (v) {
              that.left = v
            }, function () {
              that.imgState.start.left = 0
              that.imgState.end.left = that.imgState.start.left
            }, 300, 'CubicEaseOut'))
            interY.push(moveTool.move(that.imgState.start.top, (that.wh - that.imgState.start.height) / 2, function (v) {
              that.top = v
            }, function () {
              that.imgState.start.top = (that.wh - that.imgState.start.height) / 2
              that.imgState.end.top = that.imgState.start.top
            }, 300, 'CubicEaseOut'))
          } else if (that.imgState.start.height === that.wh) {
            interX.push(moveTool.move(that.imgState.start.left, (that.ww - that.imgState.start.width) / 2, function (v) {
              that.left = v
            }, function () {
              that.imgState.start.left = (that.ww - that.imgState.start.width) / 2
              that.imgState.end.left = that.imgState.start.left
            }, 300, 'CubicEaseOut'))
            interY.push(moveTool.move(that.imgState.start.top, 0, function (v) {
              that.top = v
            }, function () {
              that.imgState.start.top = 0
              that.imgState.end.top = that.imgState.start.top
            }, 300, 'CubicEaseOut'))
          }
        }

        var moveLeft = that.ww - that.imgState.start.width
        if (that.imgState.start.width >= that.ww) {
          if (that.imgState.start.left < moveLeft) {
            interX.push(moveTool.move(that.imgState.start.left, moveLeft, function (v) {
              that.left = v
            }, function () {
              that.imgState.start.left = moveLeft
              that.imgState.end.left = that.imgState.start.left
            }, 200, 'CubicEaseOut'))
          } else if (that.imgState.start.left > 0) {
            interX.push(moveTool.move(that.imgState.start.left, 0, function (v) {
              that.left = v
            }, function () {
              that.imgState.start.left = 0
              that.imgState.end.left = that.imgState.start.left
            }, 200, 'CubicEaseOut'))
          }

          if (that.imgState.start.height < that.wh) {
            var moveTop = (that.wh - that.imgState.start.height) / 2
            interY.push(moveTool.move(that.imgState.start.top, moveTop, function (v) {
              that.top = v
            }, function () {
              that.imgState.start.top = moveTop
              that.imgState.end.top = that.imgState.start.top
            }, 200, 'CubicEaseOut'))
          }
        } else {
          moveLeft = (that.ww - that.imgState.start.width) / 2
          interX.push(moveTool.move(that.imgState.start.left, moveLeft, function (v) {
            that.left = v
          }, function () {
            that.imgState.start.left = moveLeft
            that.imgState.end.left = that.imgState.start.left
          }, 200, 'CubicEaseOut'))
        }

        if (that.imgState.start.height > that.wh) {
          var moveTop = that.wh - that.imgState.start.height
          if (that.imgState.start.top < moveTop) {
            interY.push(moveTool.move(that.imgState.start.top, moveTop, function (v) {
              that.top = v
            }, function () {
              that.imgState.start.top = moveTop
              that.imgState.end.top = that.imgState.start.top
            }, 200, 'CubicEaseOut'))
          } else if (that.imgState.start.top > 0) {
            interY.push(moveTool.move(that.imgState.start.top, 0, function (v) {
              that.top = v
            }, function () {
              that.imgState.start.top = 0
              that.imgState.end.top = that.imgState.start.top
            }, 200, 'CubicEaseOut'))
          }
        } else if (moveLeft === 0 && that.imgState.start.height < that.wh) {
          var moveTop = (that.wh - that.imgState.start.height) / 2
          interY.push(moveTool.move(that.imgState.start.top, moveTop, function (v) {
            //            debugger
            that.top = v
          }, function () {
            that.imgState.start.top = moveTop
            that.imgState.end.top = that.imgState.start.top
          }, 200, 'CubicEaseOut'))
        }

        let data = {
          index: that.index,
          get img () {
            return that.img
          },
          set img (v) {
            that.loading = true
            that.done = false
            that.img = v
          }
        }

        //临时切换事件
        if (that.imgState.start.width >= that.ww) {
          if (that.imgState.start.left > that.ww / 3) {
            that.$emit('on-change', 'pre', data)
          } else if (that.imgState.start.left < -(that.imgState.start.width - that.ww) - that.ww / 3) {
            that.$emit('on-change', 'next', data)
          }
        } else {
          if (that.imgState.start.left > that.ww / 3 + (that.ww - that.imgState.start.width) / 2) {
            that.$emit('on-change', 'pre', data)
          } else if (that.imgState.start.left < (that.ww - that.imgState.start.width) / 2 - that.ww / 3) {
            that.$emit('on-change', 'next', data)
          }
        }

        //考虑可以动画移动top/left
        // moveTool.move(that.imgState.start.top, that.imgState.end.top, function (v) {
        //     that.top = v;
        // }, function () {
        //
        // }, 300, 'CubicEaseOut');
        // moveTool.move(that.imgState.start.top, that.imgState.end.left, function (v) {
        //     that.left = v;
        // }, function () {
        //
        // }, 300, 'CubicEaseOut');
        // moveTool.move(that.imgState.start.top, that.imgState.end.top, function (v) {
        //     that.width = v;
        // }, function () {
        //
        // }, 300, 'CubicEaseOut');
        // moveTool.move(that.imgState.start.top, that.imgState.end.top, function (v) {
        //     that.height = v;
        // }, function () {
        //
        // }, 300, 'CubicEaseOut');

        // interX = moveTool.move(that.speed.x, 0, function (v) {
        // 	// console.log([that.imgState.end.left, that.ow, that.imgState.end.width]);
        // 	if (that.imgState.end.left <= 0 && that.imgState.end.left >= that.ww - that.imgState.end.width) {
        // 		that.imgState.end.left = that.imgState.end.left + v / 3 / that.rate;
        // 		that.imgState.start.left = that.imgState.end.left;
        // 		that.left = that.imgState.end.left;
        // 	}
        // 	else {
        // 		that.imgState.end.left = that.speed.x >= 0 ? 0 : (that.ww - that.imgState.end.width);
        // 		that.imgState.start.left = that.imgState.end.left;
        // 		that.left = that.imgState.end.left;
        // 	}
        // }, function () {
        // 	that.imgState.start.left = that.imgState.end.left;
        // 	that.let = that.imgState.end.left;
        // 	clearInterval(interX);
        // 	interX = null;
        // }, 500, 'CubicEaseOut');
        // interY = moveTool.move(that.speed.y, 0, function (v) {
        // 	// console.log([that.imgState.end.top, that.wh, that.imgState.end.height]);
        // 	if (that.imgState.end.top <= 0 && that.imgState.end.top >= that.wh - that.imgState.end.height) {
        // 		that.imgState.end.top = that.imgState.end.top + v / 3 / that.rate;
        // 		that.imgState.start.top = that.imgState.end.top;
        // 		that.top = that.imgState.end.top;
        // 	}
        // 	else {
        // 		that.imgState.end.top = that.speed.y >= 0 ? 0 : (that.wh - that.imgState.end.height);
        // 		that.imgState.start.top = that.imgState.end.top;
        // 		that.top = that.imgState.end.top;
        // 	}
        // }, function () {
        // 	that.imgState.start.top = that.imgState.end.top;
        // 	that.top = that.imgState.end.top;
        // 	clearInterval(interY);
        // 	interY = null;
        // }, 500, 'CubicEaseOut');
        // }
      },
      reset () {
        let that = this

        clearIntervals(interX)
        clearIntervals(interY)

        that.top = 0
        that.left = 0
        that.width = window.innerWidth
        that.height = 0
        that.imgState.start.top = 0
        that.imgState.start.left = 0
        that.imgState.start.width = 0
        that.imgState.start.height = 0
        that.imgState.end.top = 0
        that.imgState.end.left = 0
        that.imgState.end.width = 0
        that.imgState.end.height = 0
        that.starts.value = []
        that.moves.value = []
        that.len.start = 0
        that.len.move = 0
        that.rate = 1
        that.cenX.start = 0
        that.cenX.move = 0
        that.cenY.start = 0
        that.cenY.move = 0
        that.oh = 0
        that.ow = 0
        that.speed.x = 0
        that.speed.y = 0
      },
      popup () {
        let that = this
        if (that.img) {
          //计算初始位置
          that.oh = that.$refs.img.offsetHeight
          that.ow = that.$refs.img.offsetWidth

          let initTop = 0
          //假定初始宽度100%, 如果高度<屏幕高度, 居中图片.
          if (that.oh < that.wh) {
            initTop = (that.wh - that.oh) / 2
          }

          that.top = initTop

          that.imgState.start.top = initTop
          that.imgState.start.left = 0
          that.imgState.start.width = that.ow
          that.imgState.start.height = that.oh
          that.imgState.end.top = initTop
          that.imgState.end.left = 0
          that.imgState.end.width = that.ow
          that.imgState.end.height = that.oh
        }
        setTimeout(function () {
          that.loading = false
          that.done = true
        }, 200)
      }
    },
    watch: {
      img: function () {
        let that = this
        that.loading = true
      }
    },
    mounted: function () {
      let that = this

      setTimeout(function () {
        //        that.$emit('on-next', data)
      }, 5000)
    }
  }
</script>

<style lang="scss">

  div.blk-pop-image {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
  }

  div.blk-pop-image-close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    margin: 10px;
    border: 2px solid #ffffff;
    border-radius: 17px;
    z-index: 4;
    overflow: hidden;
    transform: rotate(45deg);
    font-size: 0;
    & > span {
      display: inline-block;
      width: 50%;
      height: 50%;
      vertical-align: middle;
      box-sizing: border-box;
      &:nth-child(1) {
        //background: green;
        border-bottom: 1px solid #ffffff;
        border-right: 1px solid #ffffff;
      }
      &:nth-child(2) {
        //background: red;
        border-bottom: 1px solid #ffffff;
      }
      &:nth-child(3) {
        //background: black;
        border-right: 1px solid #ffffff;
      }
      &:nth-child(4) {
        //background: blue;
      }
    }
  }

  div.blk-pop-image-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    opacity: .8;
    z-index: 1;
  }

  img.blk-pop-image-img {
    position: absolute;
    z-index: 3;
    transition-property: opacity, transform;
    transition-duration: .5s;
    transform: scale(0, 0);
    opacity: 0;
    &.done {
      opacity: 1;
      transform: scale(1, 1);
    }
  }

  div.blk-pop-image-log {
    position: absolute;
    z-index: 5;
    top: 40px;
    left: 0;
    width: 100%;
    font-size: 12px;
    color: #ffffff;
  }

  @keyframes blk-pop-image-loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  div.blk-pop-image-loading {
    position: absolute;
    z-index: 2;
    width: 15%;
    padding-top: 15%;
    margin: -7.5% 0 0 -7.5%;
    //border-left: 4px solid #ffffff;
    //border-right: 4px solid #ffffff;
    border: 2px dashed #ffffff;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    animation: blk-pop-image-loading 2s linear infinite;
  }
</style>