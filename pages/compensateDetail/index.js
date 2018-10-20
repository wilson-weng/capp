import api from './api'

const state = {
  detailMap: {
    'transporter_name': '姓名',
    'abnormal_type': '异常类型',
    'abnormal_desc': '异常描述',
    'penalty_amount': '赔付金额',
    'abnormal_time': '异常发生时间',
    'register_staff_name': '异常登记人员',
    'warehouse_name': '库房名称',
  },
  detail: {},
  recordId: '',
}

  Page({
    data: state,
    onLoad(e) {
      let id = e.id

      this.setData({
        recordId: id
      })
    },
    onShow() {
      wx.setNavigationBarTitle({
        title: '赔偿详情',
      })

      wx.showNavigationBarLoading()
      this.getAbnormalDetailMethod()
        .then(wx.hideNavigationBarLoading)
        .catch(wx.hideNavigationBarLoading)
    },
    getAbnormalDetailMethod() {
      let params = {
        detail_id: this.data.recordId,
      }

      return api.getAbnormalDetail(params)
        .then(res => {
          this.setData({
            detail: res
          })
        })
        .catch(res => res)
    }
})
