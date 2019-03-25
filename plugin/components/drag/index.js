Component({
  options: {
    multipleSlots: true, //开启插槽
  },
  properties: {
    "width": { //容器宽度
      type: Number,
      value: 300
    },
    "height": { //容器高度
      type: Number,
      value: 300
    },
    "bgColor": {
      type: String,
      value: "transparent"
    },
    "scale": { //小图片是否可以缩放
      type: Boolean,
      value: true
    },
    "rotate": { //小图片是否可以旋转
      type: Boolean,
      value: true
    },
    "translate": { //小图片是否可以移动
      type: Boolean,
      value: true
    },
    "position": {
      type: Object,
      value: {
        left: 0,
        top: 0,
        scale: 1,
        rotate: 0
      }
    },
    "focus": {
      type: Boolean,
      value: false
    },
    "showClose": {
      type: Boolean,
      value: true
    },
    "iconSize": {
      type: Number, //底部按钮大小
      value: 30
    }
  },
  data: {
    position: {},
    originalLeft: 0, //保存开始移动前的left
    originalTop: 0, //保存开始移动前的top
    originalScale: 0, //保存开始移动前的scale
    originalRotate: 0, //保存开始移动前的rotate
    containerTouchX: 0,
    containerTouchY: 0,
    degStart: 0, //开始旋转之前，触摸点与图片中心的角度
    sStart: 0, //开始旋转之前，触摸点与图片中心的距离
    setDataFlag: true,
    original: {
      x: 0,
      y: 0
    },
    canRotateFlag: false, //是否可以开始选择
  },
  methods: {
    tap() {
      this.triggerEvent('tap')
    },
    close() {
      this.triggerEvent('close', 2)
    },
    //移动开始
    containerStart(e) {

      this.setData({
        containerTouchX: e.changedTouches[0].clientX,
        containerTouchY: e.changedTouches[0].clientY,
        originalLeft: this.data.position.left,
        originalTop: this.data.position.top
      })
    },
    //移动中
    containerMove(e) {
      if (this.data.setDataFlag && this.properties.translate) {
        this.data.setDataFlag = false;
        setTimeout(() => {
          this.data.setDataFlag = true
        }, 50)
        this.setData({
          "position.left": this.data.originalLeft + (e.changedTouches[0].clientX - this.data.containerTouchX),
          "position.top": this.data.originalTop + (e.changedTouches[0].clientY - this.data.containerTouchY)
        })
      }
    },
    //移动结束
    containerEnd() {
      this.triggerEvent('change', this.data.position)
    },
    //旋转缩放开始
    imageStart(e) {
      var query = wx.createSelectorQuery().in(this);
      query.select('#dg_container').boundingClientRect(res => {
        this.data.original = {
          x: (res.left + res.right) / 2,
          y: (res.top + res.bottom) / 2
        };
        //触摸点到图片中心的距离
        let s = Math.pow(Math.pow(e.changedTouches[0].clientY - (res.top + res.bottom) / 2, 2) + Math.pow(e.changedTouches[0].clientX - (res.left + res.right) / 2, 2), 1 / 2)
        //触摸点与水平线角度
        let deg = Math.acos(Math.abs((e.changedTouches[0].clientX - (res.left + res.right) / 2)) / s) * 180 / Math.PI
        //判断触摸点与图片中心的位置关系
        let x = e.changedTouches[0].clientX - (res.left + res.right) / 2,
          y = e.changedTouches[0].clientY - (res.top + res.bottom) / 2;
        if (x > 0) {
          if (y > 0) { //触摸点位于第四象限
            deg = 360 - deg
          }
        } else {
          if (y > 0) { //第三象限
            deg += 180
          } else { //第二象限
            deg = 180 - deg
          }
        }
        this.setData({
          degStart: deg,
          sStart: s,
          originalScale: this.data.position.scale,
          originalRotate: this.data.position.rotate
        }, () => {
          this.data.canRotateFlag = true; //可以开始旋转
        })

      })
      query.exec()

    },
    //旋转缩放代码
    imageMove(e) {
      if (this.data.canRotateFlag && this.data.setDataFlag) { //容器中心点已经保存，可以开始旋转
        //防止手机卡顿
        this.data.setDataFlag = false
        setTimeout(() => {
          this.data.setDataFlag = true
        }, 50)
        //触摸点到图片中心的距离
        let s = Math.pow(Math.pow(e.changedTouches[0].clientY - this.data.original.y, 2) + Math.pow(e.changedTouches[0].clientX - this.data.original.x, 2), 1 / 2);
        //触摸点与水平线（X轴）范围-180-180
        let d1 = Math.acos(Math.abs((e.changedTouches[0].clientX - this.data.original.x)) / s) * 180 / Math.PI;
        //触摸点与图片中心位置比较（用于判断触摸点位于第几象限）
        let x = e.changedTouches[0].clientX - this.data.original.x,
          y = e.changedTouches[0].clientY - this.data.original.y;
        if (x > 0) {
          if (y > 0) { //触摸点位于第四象限
            d1 = 360 - d1
          }
        } else {
          if (y > 0) { //第三象限
            d1 += 180
          } else { //第二象限
            d1 = 180 - d1
          }
        }

        let Deg = Math.floor(this.data.degStart - d1),
          scale = s / this.data.sStart;
          let dataSet={}
          if(this.properties.scale){
            dataSet[["position.scale"]] = this.data.originalScale * scale.toFixed(2);
          }
        if (this.properties.rotate) {
          dataSet[["position.rotate"]] = this.data.originalRotate + Deg;
        }
        this.setData(dataSet)
      }
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        position: this.properties.position
      })
    },
  },
  ready() {

  }

})