const api = require('./commonApi')
const storageTool = require('./storage')

const checkAuth = app => {
  return new Promise((resolve, reject) => {
    if (wx.getStorageSync('USER-ID')) {
      checkLogin(app, wx.getStorageSync('LOCAL_SESSION'))
        .then(res => resolve(res))
    } else {
      return wxLogin()
        .then(res => get3rdSession(app, res.code))
        .then(res => checkLogin(app, res.local_session))
        .then(res => resolve(res))
        .catch(res => reject(res))
      }
  })
}

const wxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => { resolve(res) },
      fail: res => { reject(res) }
    })
  })
}

const get3rdSession = (app, code) => {
  return api
    .get3rdSession(app, { code })
      .then(res => {
        storageTool.setStorageSync('LOCAL_SESSION', res.data.local_session)
        return res.data
      })
    .catch(res => Promise.reject(res))
}

const checkLogin = (app, local_session) => {
  let params = { local_session }
  if (!local_session) { params = {} }

  return api.checkLogin(app, params)
    .then(res => {
      if (res.status === 'ok') {
        return loginSuccessHandle(res, app)  // login和checklogin 两者在返回成功时处理逻辑一样
      } else {
        app.globalData.authInfo = {}

        if (res.code === 1001) {   // 用户未登录
          storageTool.removeUserInfoSync()
          return app.globalData.authInfo
        } else if (res.code === 1002) {   // session已过期
          storageTool.removeUserInfoSync()
          checkAuth(app)
        }
      }
    })
}

const loginSuccessHandle = (res, app, options = {}) => {
  let { redirect = '', isFromLogin = false } = options

  app.globalData.authInfo = res.data
  storageTool.setUserInfoSync(res.data.login)

  if (isFromLogin || redirect) {
    if (!redirect) wx.navigateBack()
    if (redirect)
      wx.redirectTo({
        url: redirect
      })
  }

  return app.globalData.authInfo
}

const getWxInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success: () => {
              wxGetUserInfo().then(res => resolve(res))
            },
            fail: () => { reject() }
          })
        } else {
          wxGetUserInfo().then(res => resolve(res))
        }
      },
      fail: () => { reject() }
    })
  })
}

const wxGetUserInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: res => {
        let userInfo = res.userInfo

        wx.setStorageSync('WX_USER_INFO', userInfo)
        resolve(userInfo)
      },
      fail: () => { reject() }
    })
  })
}

const isJdWorker = user => user.permission && user.permission.staff && user.permission.staff.is_agreement_signed === 1 || false

const isAuthenticate = user => user.permission && user.permission.transporter && user.permission.transporter.validation_status === 3 || false

const getUserInfo = user => {
  let userTitle = ''
  let login = user.login || {}
  let permission = user.permission || {}
  let transporter = permission.transporter || {}
  let staff = permission.staff || {}

  if (!login.id) {
    userTitle = '登录'
  } else if (transporter.validation_status !== 3) {
    userTitle = '未认证'
  } else if (staff.is_agreement_signed !== 1) {
    userTitle = '待开通'
  } else {
    userTitle = ''    // 等待后续jd account来赋值给userTitle
  }

  return {
    userTitle,
    userId: login.id || ''
  }
}

const getAuthInfo = user => {
  let authTitle = ''
  let permission = user.permission || {}
  let transporter = permission.transporter || {}

  if (transporter.validation_status === 3) {  //  resultType: 0=初始化值,1=待提交资料,2=审核中,3=已验证通过,4=已验证拒绝,5=待考试,6=一个内涵达达
    authTitle = '已认证'
  } else if (transporter.validation_status === 2) {
    authTitle = '审核中'
  } else if (transporter.validation_status === 4 || transporter.validation_status === 6) {
    authTitle = '已拒绝'
  } else {
    authTitle = '待认证'
  }

  return {
    authTitle,
    authStatus: transporter.validation_status || ''
  }
}

module.exports = {
  checkAuth,
  getWxInfo,
  loginSuccessHandle,
  isJdWorker,
  isAuthenticate,
  getUserInfo,
  getAuthInfo
}
