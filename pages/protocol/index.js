import * as api from './api'
const state = {

}

Page({
  name: 'protocol',
  data: state,

  onShow() {
    wx.setNavigationBarTitle({
      title: '确认协议',
    })
  },

  onReady: function () {
    this.cancelComponent = this.selectComponent('#cancelModal')
  },

  confirm() {
    api.wareHouseSign().then(() => {
      wx.navigateBack()
    })
  },

  cancel() {
    this.cancelComponent.showModal()
  },

  hideTips() {
    this.cancelComponent.hideModal()
  }
})
