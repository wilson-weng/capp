const request = require('../../common/utils/request.js')

const confirmIdentify = payload => {
  return request.post('mp/transporter/identity/update', payload)
    .then(res => res)
    .catch(res => Promise.reject(res))
}

module.exports = {
  confirmIdentify,
}
