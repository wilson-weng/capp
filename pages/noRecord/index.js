const state = {
  shareTitle: '邀请你加入达达用工平台',
  shareImage: 'https://fe.imdada.cn/bellflower/images/recruit-post-1.png',
}

Page({
  name: '无记录页',
  data: state,

  onShow() {
    wx.setNavigationBarTitle({
      title: '报名达达用工',
    })
  },

  onShareAppMessage() {
    const { shareTitle, shareImage } = this.data

    return {
      title: shareTitle,
      path: `/pages/noRecord/index?channel=share_act`,
      imageUrl: shareImage,
      from: 'menu',
    }
  },

  toQuestionnaire() {
    wx.navigateTo({
      url: `/pages/questionnaire/index`,
    });
  }
})
