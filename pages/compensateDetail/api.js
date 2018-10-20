const request = require('../../common/utils/request.js')

const getAbnormalDetail = payload => {
  return request.get('cst/warehouse/abnormal/settle/detail', payload)
    .then(res => res.data)
    .catch(res => Promise.reject(res))
}

module.exports = {
  getAbnormalDetail,
}
