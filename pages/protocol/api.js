const request = require('../../common/utils/request.js')

const wareHouseSign = payload => {
  return request.post('cst/warehouse/agreement/sign', payload)
    .then(res => res)
    .catch(res => Promise.reject(res))
}

module.exports = {
  wareHouseSign,
}
