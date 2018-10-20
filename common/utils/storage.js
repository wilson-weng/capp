let storageCount = 0

const setStorageSync = (key, data) => {
  if (storageCount >= 3) {
    storageCount = 0
    return false
  }
  try {
    wx.setStorageSync(key, data)
    storageCount = 0
    return true

  } catch (e) {
    storageCount++
    setStorageSync(key, data)
  }
}

const setUserInfoSync = info => {
  return setStorageSync('TOKEN', info.token) && setStorageSync('USER-ID', info.id)
}

const getUserInfoSync = () => ({
  token: wx.getStorageSync('TOKEN'),
  uid: wx.getStorageSync('USER-ID'),
})

const removeUserInfoSync = () => {
  wx.removeStorageSync('TOKEN')
  wx.removeStorageSync('USER-ID')
}

module.exports = {
  setStorageSync,
  setUserInfoSync,
  getUserInfoSync,
  removeUserInfoSync,
}
