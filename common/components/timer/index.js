Component({
  externalClasses: ['timer-class'],
  properties: {
    time: {
      type: Number,
      default: 0,
    },
    inline: {
      type: Boolean,
      default: true,
    }
  },

  data: {
    leftTime: 0,
    timeText: '',
    intervalId: 0,
  },

  attached(){
    this.setData({
      leftTime: this.data.time,
    })

    this.timerFunc()

    this.setData({
      intervalId: setInterval(() => this.timerFunc(), 1000),
    })
  },

  detached() {
    clearInterval(this.data.intervalId)
  },

  methods: {
    dateMS(time) {
      let minute = Math.floor(time / 60)

      return `${minute === 0 ? '' : `${minute}分`}${time % 60 > 9
        ? time % 60
        : `0${time % 60}`}秒`
    },
    timerFunc() {
      if (this.data.leftTime > 0) {
        this.setData({
          timeText: this.dateMS(this.data.leftTime - 1),
          leftTime: this.data.leftTime - 1,
        })
      } else {
        this.data.intervalId && clearInterval(this.data.intervalId)
        this.triggerEvent('complete', {})
      }
    },
  },

})
