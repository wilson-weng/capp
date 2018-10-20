const app = getApp()

Page({
  name: '用工问卷页',

  data: {
    previewUrls: ['https://fe.imdada.cn/bellflower/images/recruit.jpg']
  },

  onShow() {

  },

  previewPhoto(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: this.data.previewUrls, // 需要预览的图片http链接列表
    })
  },
})
