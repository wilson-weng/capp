import { applyPost } from './api'

Page({
  name: 'webviewAgent',
  data: {
    isSuccess: true,
    type: '',
    message: ''
  },

  onLoad(e){
    console.log(e)
    if(e.type == 'jobApply'){
      this.setData({type: e.type})
      applyPost({crew_id: 1, proj_id: 1}).then(data=>{
        this.setData({isSuccess: true, message:'申请成功！工作人员会在3个工作日内联系您'})
      }).catch(data=>{
        this.setData({isSuccess: false, message: data.message})
      })
    }
  },

  toHome: ()=>{
    wx.switchTab({url: '/pages/home/index'})
  }

});
