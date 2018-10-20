const request = require('../../common/utils/request.js')

const loginOut = payload => {
  return request.post('mp/logout', payload)
    .then(res => res)
    .catch(res => Promise.reject(res))
}

module.exports = {
  loginOut,
}
