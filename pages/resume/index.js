const api = require('./api')

const state = {
  submitLoading: false,
  canSubmit: false,
  resumeText: '',
}

Page({
  data: state,
  onShow() {
    wx.setNavigationBarTitle({
      title: '个人简历',
    })

    api.getResume().then(res => {
      let resume = res.resume || ''
      this.setData({
        resumeText: resume,
        canSubmit: resume.trim() !== '',
      })
    })
  },

  bindResumeInput(e) {
    let resumeText = e.detail.value || ''

    this.setData({
      resumeText,
      canSubmit: resumeText.trim() !== '',
    })
  },

  submitForm() {
    this.setData({
      submitLoading: true,
    })

    api.uploadResume({ resume: this.data.resumeText }).then(res => {
      this.setData({
        submitLoading: false,
      })

      let title = res.status === 'ok' ? '简历上传成功' : res.msg
      let icon = res.status === 'ok' ? 'success' : 'none'

      wx.showToast({ title, icon, duration: 2000 })

      if (res.status === 'ok')
        setTimeout(() => { wx.navigateBack() }, 2000)
    })
  }
})
