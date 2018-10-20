Component({
  externalClasses: ['layer-class'],

  options : {
    multipleSlots: true
  },

  properties: {
    backdrop: {
      type: Boolean,
      value: true
    },

    headBorder: {
      type: Boolean,
      value: true
    },

    animated : {
      type: Boolean,
      value: true
    },
  },

  data: {
    isShow: false,
    animationOption: {
      duration: 300,
    }
  },

  ready() {
    this.animation = wx.createAnimation({
      duration: this.data.animationOption.duration,
    })
  },

  methods: {
    hideModal(e) {
      if (e) {
        let { type } = e.currentTarget.dataset;
        if (type === 'mask' && !this.data.backdrop) return;
      }

      if (this.data.isShow) this._toggleModal();
    },

    showModal() {
      if (!this.data.isShow) {
        this._toggleModal();
      }
    },

    _toggleModal() {
      if (!this.data.animated) {
        this.setData({
          isShow: !this.data.isShow
        })
      } else {
        let isShow = !this.data.isShow;
        this._executeAnimation(isShow);
      }
    },

    _executeAnimation(isShow) {
      let animation = this.animation;

      if (isShow) {
        animation.opacity(0).step();

        this.setData({
          animationData: animation.export(),
          isShow: true
        })

        setTimeout(() => {
          animation.opacity(1).step()
          this.setData({
            animationData: animation.export()
          })
        }, 50)
      } else {
        animation.opacity(0).step()
        this.setData({
          animationData: animation.export()
        })

        setTimeout(() => {
          this.setData({
            isShow: isShow
          })
        }, this.data.animationOption.duration)
      }
    },

    myCatchTouch () {
      return false;
    },
  }
})
