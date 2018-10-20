const app = getApp()
const auth = require('../../common/utils/auth.js')
const storage = require('../../common/utils/storage')
const api = require('./api')
import { getWarehouseStaffInfo } from '../home/api'


const state = {
  userId: '',
  userTitle: '',
  authTitle: '',
  authStatus: '',
  isWorker: false,
  staffInfo: {},
  authPageType: [2,4,6]
}

Page({
  name: '我的',
  data: state,

  onShow() {
    wx.setNavigationBarTitle({
      title: ''
    })

    this.setData({
      staffInfo: wx.getStorageSync('MINE_STAFF_INFO') || {},
    })

  },

  toAuth() {
    let authStatus = this.data.authStatus

    if (this.login()) return
    if (authStatus === 3) return
    if (this.data.authPageType.indexOf(authStatus) > -1) {
      wx.navigateTo({
        url: `/pages/identifyResult/index?resultType=${authStatus}`   // resultType: 0=初始化值,1=待提交资料,2=审核中,3=已验证通过,4=已验证拒绝,5=待考试,6=一个内涵达达
      })
      return
    }
    if (authStatus === 1) {
      wx.navigateTo({
        url: `/pages/identification/index`
      });
    }
  },

  toIncome() {
    let redirect = '/pages/income/index'    // income页面不能直接登录后redirect，因为在mine页面需要先获取mission id才能跳转
    if (!this.login()) {
      this.data.isWorker && wx.navigateTo({
        url: redirect,
      })
    }
  },

  toAbnormal() {
    let redirect = '/pages/abnormal/index'
    if (!this.login(redirect)) {
      this.data.isWorker && wx.navigateTo({
        url: redirect,
      })
    }
  },

  login(redirect) {
    let userId = this.data.userId
    let url =  '/pages/login/index'

    if (userId) return false
    if (typeof(redirect) === 'string')
      url = `/pages/login/index?redirect=${encodeURIComponent(redirect)}`

    wx.navigateTo({
      url,
    })

    return true
  },

  loginOut() {
    api.loginOut()
      .then(res => {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })

        storage.removeUserInfoSync()
        wx.removeStorageSync('LOCAL_SESSION')

        this.checkAuth()
      })
  }
})
