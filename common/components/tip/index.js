Component({
  properties: {
    allowClear: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    opacity: '',
  },
  methods: {
    onClose: function() {
      this.setData({
        opacity: 'opacity: 0;',
      })
    },
  },
})
