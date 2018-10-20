import Event from '../../utils/Event'

Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    fullScreen: {
      type: Boolean,
      value: false
    },
    defaultIndex: {
      type: Number,
      value: 0
    },
    componentId: {
      type: String,
      value: ''
    },
    animate: {
      type: Boolean,
      value: false
    },
    textColor: {
      type: String,
      value: '#000',
    },
    activeTextColor: {
      type: String,
      value: '#ff5777',
    },
    lineColor: {
      type: String,
      value: '#ddd',
    },
    activeLineColor: {
      type: String,
      value: '#ff5777',
    }
  },
  data: {
    tabs: [],
    width: 0,
    activeKey: 0,
    move: 0
  },

  attached() {
    this.componentId = this.data.componentId
    this.tabs = []
    Event.on(`tab-create-${this.componentId}`, tab => {
      this.tabs.push(tab)
    })
  },

  ready() {
    let activeKey = this.minAndMax(this.data.defaultIndex)
    let len = this.tabs.length
    const width = parseInt(750 / (len > 5? 5 : len))

    this.onSwitch(activeKey, 'default')

    this.setData({
      tabs: this.tabs,
      width,
      move: width * activeKey
    })
  },

  detached() {
    Event.removeListener()
  },

  methods: {
    minAndMax(activeKey) {
      const max = this.tabs.length - 1
      const min = 0
      if ( activeKey > max ) {
        return max
      } else if (activeKey < min){
        return 0
      } else {
        return activeKey
      }
    },

    onSwitch(activeKey, triggerType) {
      if (!triggerType || triggerType !== 'default') {
        activeKey = activeKey.currentTarget.dataset.idx;
      }

      const move = activeKey * this.data.width
      this.setData({
        activeKey,
        move
      })

      Event.emit(`panel-switch-${this.componentId}`, activeKey)

      this.triggerEvent('tabChange', {
        key: activeKey,
        componentId: this.componentId
      })
    },

  }
})
