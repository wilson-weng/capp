const constants = require('./common/constants/index')
//app.js
App({
  onLaunch: function() {
    const that = this

    wx.getSystemInfo({
      success(res) {
        let platForm

        if (res.platform === 'ios') platForm = 'IOS'
        if (res.platform === 'android') platForm = 'Android'

        that.globalData.systemInfo = {
          ...res,
          platform: platForm,
        }
      }
    })
  },
  globalData: {
    domain: constants.DOMAIN,
    authInfo: {},
    questionnaireUrl: 'https://www.wjx.top/jq/23834760.aspx',
    mission_id: '',
  }
})
