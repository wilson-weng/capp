const request = require('../../common/utils/request.js')

const getResume = payload => {
  return request.get('cst/user/resume', payload, {
    toast: false,
  })
    .then(res => res.data)
    .catch(res => Promise.reject(res))
}

const uploadResume = payload => {
  return request.post('cst/user/resume', payload)
    .then(res => res)
    .catch(res => res)
}

module.exports = {
  uploadResume,
  getResume,
}
