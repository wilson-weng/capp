const request = require('../../common/utils/request.js')

const getCompensateDaily = payload => {
  return request.get('cst/warehouse/abnormal/settle/bill', payload)
    .then(res => {
      wx.setStorage({
        key: 'COMPENSATE_LIST_DAILY',
        data: res.data.details,
      })

      return res.data
    })
    .catch(res => Promise.reject(res))
}

const abnormalAddPhoto = payload => {
  return request.post('mp/warehouse/abnormal/photo/add', payload)
    .then(res => res)
    .catch(res => res)
}

const abnormalDeletePhoto = payload => {
  return request.post('mp/warehouse/abnormal/photo/delete', payload)
    .then(res => res)
    .catch(res => res)
}

const comfirmBill = payload => {
  return request.post('mp/warehouse/abnormal/bill/confirm', payload)
    .then(res => res)
    .catch(res => res)
}

module.exports = {
  getCompensateDaily,
  abnormalAddPhoto,
  abnormalDeletePhoto,
  comfirmBill,
}
