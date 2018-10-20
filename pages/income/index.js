import api from './api'
import { handleListDataStr } from '../../common/utils/listDataStr'
const app = getApp()


Page({
  name: '收入明细',
  data: {
    page: 1,
    list: []
  },

  onShow() {
    wx.setNavigationBarTitle({
      title: '收入明细',
    })

    const INCOME_LIST = wx.getStorageSync('INCOME_LIST')

    if (INCOME_LIST) {
      this.setData({
        handledList: INCOME_LIST,
      })
    }

    this.setData({
      page: 1,
    })
    wx.showNavigationBarLoading()
    this.getPromoteIncomeList()
      .then(wx.hideNavigationBarLoading)
      .catch(wx.hideNavigationBarLoading)
  },

  onReachBottom() {
    if (this.data.hasNext) return false
    this.getPromoteIncomeList()
  },

  onPullDownRefresh() {
    this.getPromoteIncomeList()
  },

  getPromoteIncomeList() {
    let params = {
      page: this.data.page,
      filters: JSON.stringify({crew_id: 19}),
      proj_id: 1,
      offset : (this.data.page - 1) * 10,
    }

    return api.getWageList(params)
      .then(res => {
        wx.stopPullDownRefresh()
        let list = JSON.parse(res.result)
        if (params.offset === 0) {
          this.setData({
            list: list,
            hasNext: res.length === this.data.limit,
            page: this.data.page + 1,
          })
        } else {
          this.setData({
            list: this.data.list.concat(list),
            hasNext: res.length === this.data.limit,
            page: this.data.page + 1,
          })
        }
        console.log(this.data.list)
      })
      .catch(() => {
        wx.stopPullDownRefresh()
      })
  },

})
