const storageTool = require('./storage')

const request = (method, url, params, options = {}) => {
  const { toast = false } = options
  const app = options.app ? options.app : getApp()
  const userInfo = storageTool.getUserInfoSync()

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${app.globalData.domain}${url}`,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'User-Token': userInfo.token,
        'User-Id': userInfo.uid,
        'Source': 'mp_jcd',
      },
      method: method,
      data: params,
      success: res => {
        if (res.data.status === 'ok') {
          return resolve(res.data)
        } else {
          toast &&
            wx.showToast({
              title: res.data.msg || res.data.errMsg || '接口请求出错',
              icon: 'none',
            })
          return reject(res.data)
        }
      },
      fail: res => {
        toast &&
          wx.showToast({
            title: '无网络连接',
            icon: 'none',
          })
        return reject(res)
      },
    })
  })
}

const get = (url, params, options) => request('GET', url, params, options)
const post = (url, params, options) => request('POST', url, params, options)

module.exports = {
  get,
  post,
}
