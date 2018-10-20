const getLocation = () => {
  return new Promise((resolve, reject) => {
    return wx.getLocation({
      altitude: false,
      success: res => resolve(res),
      fail: res => {
        wx.showToast({
          title: '定位失败',
          icon: 'none',
        })

        reject(res)
      },
    })
  })
}


module.exports = {
  getLocation,
}