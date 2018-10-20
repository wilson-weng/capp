const domain = require('../constants/index').DOMAIN

const uplaod = (file, options = {}) => {
  let { toast = true } = options
  let path = file.tempFilePaths;

  toast && wx.showToast({
    icon: "loading",
    title: "正在上传"
  })

  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${domain}common/pic/upload`,
      filePath: path[0],
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data",
        'User-Token': wx.getStorageSync('TOKEN'),
        'User-Id': wx.getStorageSync('USER-ID'),
      },
      success: res => {
        let data = JSON.parse(res.data)

        wx.hideToast();
        if (data.status === 'ok') {
          resolve(data)
        } else {
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })

          reject(data)
        }
      },
      fail: res => {
        wx.hideToast();
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })

        reject(JSON.parse(res.data))
      },
    })
  })
}

module.exports = {
  uplaod,
}
