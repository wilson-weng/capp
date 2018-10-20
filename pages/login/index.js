const request = require('./api.js')
const commonApi = require('../../common/utils/commonApi')
const getWxInfo = require('../../common/utils/auth').getWxInfo
const loginSuccessHandle = require('../../common/utils/auth').loginSuccessHandle
const getLocation = require('../../common/utils/location').getLocation
const app = getApp()

Page({
  data: {
    step: 1,
    stepTitle: '输入手机号码',
    tipTitle: '如该手机号未注册，将直接为您创建达达账号',
    phoneFoucs: false,
    codeError: false,
    showTimer: false,
    phoneValidate: false,
    codeValidate: false,
    phone: '',
    currentCursor: 0,
    validateCode: '',
    userInfo: {
      nickName: '达达用工'
    },
    location: {
      latitude: '',
      longitude: '',
    },
    canClick: true,
    redirect: '',   //login 之后重定向的页面
  },

  onLoad(e) {
    let { redirect } = e
    this.setData({
      redirect: decodeURIComponent(redirect || ''),
    })
  },

  onShow: function() {
    wx.setNavigationBarTitle({
      title: '验证手机号',
    })

    getLocation().then(res => {
      this.setData({
        'location.latitude': res.latitude,
        'location.longitude': res.longitude,
      })
    })

  },

  confirmPhone() {
    if (!this.data.phoneValidate) return false
    this.sendValidateCode()
  },

  setPhone(e) {
    let cursor = e.detail.cursor
    let reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
    let tempPhone = e.detail.value
    let trimPhone = tempPhone.replace(/[ ]/g, '').toString()
    let lastPhone = this.data.phone

    if (cursor > this.data.currentCursor) {
      if (trimPhone.length === 3 || trimPhone.length === 7) {
        tempPhone += ' '
        cursor += 1
      } else if (
        (tempPhone.length === 4 && lastPhone.length === 3) ||
        (tempPhone.length === 9 && lastPhone.length === 7)
      ) {
        tempPhone = tempPhone.slice(0, -1) + ' ' + tempPhone.slice(-1)
        cursor += 1
      }
    } else {
      if (trimPhone.length === 3 || trimPhone.length === 7) {
        tempPhone = tempPhone.toString().trim()
        cursor -= 1
      }
    }

    this.setData({
      phoneValidate: reg.test(trimPhone),
      phone: trimPhone,
      currentCursor: cursor,
    })

    return {
      value: tempPhone,
    }
  },

  setValidateCode(e) {
    if (e.detail.value.length < 4) {
      this.setData({
        codeValidate: false,
      })
    } else {
      this.setData({
        validateCode: e.detail.value,
        codeValidate: true,
      })
    }
  },

  sendValidateCode() {
    clearInterval(this.data.timer)

    let params = {
      phone: this.data.phone,
    }

    request.sendCode(params).then(() => {
      wx.showToast({
        title: '验证码已发送',
        icon: 'success',
      })

      this.setData({
        step: 2,
        stepTitle: `验证码发送至 ${this.data.phone}`,
      })

      this.changeTimerShow()
    })
  },

  goBack() {
    this.setData({
      step: 1,
      stepTitle: '输入手机号码',
      showTimer: false,
      phone: '',
      phoneValidate: false,
    })
  },

  changeTimerShow() {
    this.setData({
      showTimer: !this.data.showTimer,
    })
  },

  confirmBind() {
    let { phone, validateCode, location } = this.data

    this.setData({
      canClick: false,
    })

    let params = {
      phone,
      code: validateCode,
      local_session: wx.getStorageSync('LOCAL_SESSION'),
      lat: location.latitude,
      lng: location.longitude,
      platform: app.globalData.systemInfo.platform
    }

    if (params.lat === '') delete params.lat
    if (params.lng === '') delete params.lng

    request.login(params).then(res => {
      this.setData({
        canClick: true,
      })

      if (res.status === 'ok') {
        loginSuccessHandle(res, app, {
          isFromLogin: true,
          redirect: this.data.redirect || ''
        })
      } else {
        this.setData({
          stepTitle: `${res.msg}，请重新输入`,
          codeError: true,
        })
      }
    })
  },
})
