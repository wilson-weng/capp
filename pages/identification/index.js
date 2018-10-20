const api = require('./api')
const CONSTANTS = require('../../common/constants/index')
const checkAuth = require('../../common/utils/auth.js').checkAuth
const uplaod = require('../../common/utils/upload.js').uplaod

const state = {
  canSubmit: false,
  submitLoading: false,
  formData: {
    name: '',
    id_card_number: '',
    front_photo: '',
    handhold_photo: '',
  },
  front_photo: 'https://fe.imdada.cn/bellflower/images/front_photo.jpg',    // for show pic
  handhold_photo: 'https://fe.imdada.cn/bellflower/images/handhold_photo.jpg',   // for show pic
}

Page({
  name: '实名认证',
  data: state,

  onShow() {
    wx.setNavigationBarTitle({
      title: '实名认证',
    })
  },

  onReady: function () {
    this.successComponent = this.selectComponent('#successComponent')
  },

  setFormData(e) {
    let { type } = e.currentTarget.dataset
    let setType = 'formData.' + type

    this.setData({
      [setType]: e.detail.value
    })

    this.watchFormValid()
  },

  watchFormValid() {
    let formData = this.data.formData

    for (let each in formData) {
      if (formData[each] === '') {
        this.setData({
          canSubmit: false,
        })
        return
      }
    }

    if (!CONSTANTS.ID_CARD_REG.test(formData['id_card_number'])) {
      this.setData({
        canSubmit: false,
      })
    } else {
      this.setData({
        canSubmit: true,
      })
    }
  },

  addPhoto(e) {
    let { type } = e.currentTarget.dataset    // noHands  inHands

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: file => {
        uplaod(file).then(res => {
          this.uploadPhotoMethod(res.data.url, type)
        })
      },
      fail: () => {
        wx.showToast({
          title: '上传失败',
          icon: 'none',
        })
      }
    })
  },

  uploadPhotoMethod(url, type) {
    this.setData({
      formData: {
        ...this.data.formData,
        [type]: url,
      },
    })

    this.watchFormValid()
  },

  submitForm() {
    this.setData({
      submitLoading: true
    })

    api.confirmIdentify({
      ...this.data.formData
    })
      .then(res => {
        this.setData({
          submitLoading: false
        })

        if (res.status === 'ok') {
          this.successComponent.showModal()
        }
      })
      .catch(res => {
        wx.showToast({
          title: res.msg,
          duration: 2000,
          icon: 'none',
        })

        this.setData({
          submitLoading: false
        })
      })
  },

  hideTips() {
    this.successComponent.hideModal()
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/identifyResult/index?resultType=2'
      })
    }, 50)
  }
})
