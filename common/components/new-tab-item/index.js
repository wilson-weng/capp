import Event from '../../utils/Event'

Component({
  properties: {
    tabIndex: Number,
    label: String,
    componentId: {
      type: String,
      value: ''
    }
  },

  data: {
    activeKey: 1,
    test: 0
  },

  attached() {
    this.componentId = this.data.componentId;

    this.data.label && Event.emit(`tab-create-${this.componentId}`, {
      key: this.data.tabIndex,
      label: this.data.label
    });

    Event.on(`panel-switch-${this.componentId}`, activeKey => {
      this.setData({ activeKey });
    });
  },
})
