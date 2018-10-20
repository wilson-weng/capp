import { getPosts } from './api'

Page({
  name: '招工信息',
  data: {
    projList: [],
    totalPage: 0,
    company_id: 1,
    page: 1
  },

  onShow() {
    wx.setNavigationBarTitle({
      title: '招工信息',
    })
    this.getPostHandle();
  },

  onReachBottom() {
    if (this.data.totalPage <= 1) return false;
    this.page += 1;
    this.getPostHandle()

  },
  getPostHandle(){
    wx.showLoading({
      title: '加载中',
    })
    getPosts({page: this.data.page, company_id: this.data.company_id}).then(data=>{
      this.setData({
        projList: data.result.map(item=>{
          item.tags = item.tags.split(',')
          return item;
        }),
        totalPage: data.total_page
      })

      wx.hideLoading()
    })
  },

  toDetail(e){
    wx.navigateTo({
      // url: `/pages/post/index?proj_id=${e.currentTarget.dataset.id}`
      url: `/pages/income/index`
    });
  },

})
