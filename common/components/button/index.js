Component({
  externalClasses: ['btn-class'],
  properties: {
    size: String,
    type: String,
    plain: {
      type: Boolean,
      value: false,
    },
    block: {
      type: Boolean,
      value: false,
    },
    pill: {
      type: Boolean,
      value: false,
    },
    disable: {
      type: Boolean,
      value: false,
    },
    loading: {
      type: Boolean,
      value: false,
    },
  },
})
