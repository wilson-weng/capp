import api from './api'
import { NOTICE_INFO } from '../../common/constants/notice'
const { getRouteName } = require('../../common/utils/page.js')

const state = {
  ...NOTICE_INFO
}

Page({
  name: '工友圈',
  data: state,
  pageName: '',

  onShow() {
    let splitName = getRouteName()
    const NOTICE_LIST = wx.getStorageSync(`NOTICE_LIST_${splitName}`)

    wx.setNavigationBarTitle({
      title: '工友圈',
    })
    this.setData({
      pageName: splitName || '',
      offset: 0,
    })

    if (NOTICE_LIST) {
      this.setData({
        activities: NOTICE_LIST,
      })
    }

    wx.showNavigationBarLoading()
    this.getCstActivity()
      .then(wx.hideNavigationBarLoading)
      .catch(wx.hideNavigationBarLoading)
  },

  onReachBottom() {
    if (!this.data.hasMore) return false
    this.getCstActivity()
  },

  getCstActivity() {
    let params = {
      post_type: 2,     // 0: '全部'  1: '京东仓储任务招募帖'  2: '京东仓储工友圈帖'
      limit: this.data.limit,
      offset: this.data.offset,
    }

    return api.getCstActivity(params, this.data.pageName)
      .then(json => {
        this.setData({
          hasMore: json.posts.length >= this.data.limit
        })

        if (this.data.offset === 0) {
          this.setData({
            activities: json.posts
          })
        } else {
          this.setData({
            activities: this.data.activities.concat(json.posts)
          })
        }

        this.setData({
          offset: this.data.limit
        })
      })
  },

  toDetail(e) {
    let id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/noticeDetail/index?id=${id}`
    });
  }
})
