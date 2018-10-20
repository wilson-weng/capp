const { DOMAIN } = require('../../common/constants/index.js')

const state = {
  webviewUrl: '',
  activity: {},
  id: '',
  from: '',
  channel: '',
  recruitResult: {},
  submitLoading: false,
  shareTitle: '我在使用达达用工，快来看看吧',
  shareImage: 'https://fe.imdada.cn/bellflower/images/recruit-post-1.png',
}

Page({
  name: 'post',
  data: state,

  onLoad(e){
    console.log(e)
    this.setData({webviewUrl: `${DOMAIN}h5#/recruit/post?proj_id=${e.proj_id}`});
  },

  onShow() {
    wx.setNavigationBarTitle({
      title: '招募详情',
    })
  },

  onShareAppMessage() {
    const { shareTitle, shareImage } = this.data

    return {
      title: this.data.activity.title || shareTitle,
      path: `/pages/noticeDetail/index?channel=share_act&from=${this.data.from}&id=${this.data.id}`,
      imageUrl: this.data.activity && this.data.activity.main_image_url || shareImage,
      from: 'menu',
    }
  },
});
