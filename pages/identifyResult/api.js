const request = require('../../common/utils/request.js')

const getIdentifyInfo = payload => {
  return request.get('mp/transporter/identity/info', payload)
    .then(res => res.data)
    .catch(res => Promise.reject(res))
}

module.exports = {
  getIdentifyInfo,
}
