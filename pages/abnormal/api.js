const request = require('../../common/utils/request.js')

const get_compensate = payload => {
  return request.get('cst/warehouse/abnormal/bills', payload)
    .then(res => res.data)
    .catch(res => Promise.reject(res))
}


const get_break_rules = payload => {
  return request.get('cst/warehouse/violation/records', payload)
    .then(res => res.data)
    .catch(res => Promise.reject(res))
}

module.exports = {
  get_compensate,
  get_break_rules,
}
