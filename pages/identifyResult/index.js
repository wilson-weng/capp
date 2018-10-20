const CONSTANTS = require('../../common/constants/index')
const { getIdentifyInfo } = require('./api')

const state = {
  resultType: '',  // resultType: === 2 代表认证审核中  === 3 代表认证成功  === 4/6 代表认证失败
  isAuthFailed: false,
  identifyData: {
    refuseReason: '暂无原因',
  },
  CONSTANTS: CONSTANTS,
}

Page({
  name: 'identifyResult',
  data: state,

  onLoad(e) {
    let { resultType } = e
    this.setData({
      resultType: parseInt(resultType) || CONSTANTS.IDENTIFY_RESULT_ING,
      isAuthFailed: CONSTANTS.IDENTIFY_RESULT_FAILED.indexOf(parseInt(resultType)) > -1,
    })
  },

  onShow() {
    if (this.data.isAuthFailed) {
      getIdentifyInfo()
        .then(res => {
          this.setData({
            identifyData: res
          })
       })
        .catch(res => {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000,
          })
        })
    }
  },

  toIdentifyPage() {
    wx.navigateTo({
      url: `/pages/identification/index`,
    });
  }
})
