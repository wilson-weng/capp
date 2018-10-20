import api from './api'
const uplaod = require('../../common/utils/upload.js').uplaod

const state = {
  record_id: '',
  bill: {
    abnormal_count: 0,
    confirm_status: 1,
    total_penalty_amount: 0,
  },
  compensateList: [],
  picList: [],
  previewUrls: [],
}

Page({
  data: state,
  onLoad(e) {
    let { id: record_id } = e

    this.setData({
      record_id: record_id || '',
    })
  },
  onShow() {
    wx.setNavigationBarTitle({
      title: '赔偿列表',
    })

    const COMPENSATE_LIST_DAILY = wx.getStorageSync('COMPENSATE_LIST_DAILY')

    if (COMPENSATE_LIST_DAILY) {
      this.setData({
        compensateList: COMPENSATE_LIST_DAILY || [],
      })
    }

    wx.showNavigationBarLoading()
    this.getCompensateDailyMethod()
      .then(wx.hideNavigationBarLoading)
      .catch(wx.hideNavigationBarLoading)
  },

  toDetail(e) {
    let id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/compensateDetail/index?id=${id}`
    });
  },
  onPullDownRefresh() {
    this.getCompensateDailyMethod()
  },
  getCompensateDailyMethod() {
    let params = {
      bill_id: this.data.record_id
    }

    return api.getCompensateDaily(params).then(res => {
      let tempUrls = []

      res.photos && res.photos.map(each => {
        tempUrls.push(each.url)
      })

      this.setData({
        bill: res.bill,
        compensateList: res.details || [],
        picList: res.photos || [],
        previewUrls: tempUrls,
      })
    })
  },
  previewPhoto(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: this.data.previewUrls, // 需要预览的图片http链接列表
    })
  },
})
