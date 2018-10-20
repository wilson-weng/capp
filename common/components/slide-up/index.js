Component({
  properties: {
    // 是否显示
    show: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal) {
        if (newVal) {
          setTimeout(
            function() {
              this.setOpacity(1)
              this.setSlideUp('0%')
            }.bind(this),
            100
          )
          return
        }
      }
    },
    title: String,
    onOk: {
      type: Function
    },
    onCancel: {
      type: Function
    }
  },
  data: {
    maskAnimation: {},
    slideAnimation: {}
  },
  methods: {
    handleOkClick: function(e) {
      this.setOpacity(0)
      this.setSlideUp('100%')

      setTimeout(
        function() {
          this.triggerEvent('onOk', e)
        }.bind(this),
        100
      )
    },
    handleCancelClick: function(e) {
      this.setOpacity(0)
      this.setSlideUp('100%')

      setTimeout(
        function() {
          this.triggerEvent('onCancel', e)
        }.bind(this),
        100
      )
    },
    // 设置淡入动画
    setOpacity: function(value) {
      const animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease'
      })
      animation.opacity(value).step()
      this.setData({
        maskAnimation: animation.export()
      })
    },
    setSlideUp: function(value) {
      let animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease'
      })
      animation.translateY(value).step()
      this.setData({
        slideAnimation: animation.export()
      })
    }
  }
})
