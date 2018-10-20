Component({
  options: {
    multipleSlots: true,
  },
  relations: {
    '../group/index': {
      type: 'parent',
    },
  },
  properties: {
    // 是否可点击，显示箭头
    hasArrow: {
      type: Boolean,
      value: true,
    },
    size: {
      type: String,
    },
    hasBorder: {
      type: Boolean,
      value: true,
    },
    to: {
      type: String,
    },
    tap: {
      type: Function,
    },
  },
  methods: {
    cellClick(e) {
      if (this.data.to) {
        return wx.navigateTo({
          url: this.data.to,
        })
      }

      if (this.data.tap) {
        this.triggerEvent('tap', e)
      }
    },
  },
})
