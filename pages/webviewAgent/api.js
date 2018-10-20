const request = require('../../common/utils/request.js')

const applyPost = payload => {
  return request.post('crew/apply', payload)
    .then(res => res.content)
    .catch(res => Promise.reject(res))
}

module.exports = {
  applyPost
}
