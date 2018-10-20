Component({
  relations: {
    '../tab/index': {
      type: 'parent',
    }
  },
  properties: {
    label: {
      type: String,
      value: ''
    }
  },
  data: {
    show: false,
  },
  attached: function () {
    if (this.data.label.length <= 0) {
      console.warn("tab组件必须设置label属性");
    }
  },
  methods: {
    toggleStatus: function (res) {
      this.setData({
        show: res,
      })
    }
  }
})
