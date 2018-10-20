Component({
  properties: {
    hasBorder: {
      type: Boolean,
      value: true,
    },
    shadow: {
      type: Boolean,
      value: false,
    },
  },
  relations: {
    '../cell/index': {
      type: 'child',
    },
  },
})
