const request = require('../../common/utils/request.js')

const getWageList = payload => {
  return request.get('wage', payload)
    .then(res => res.data)
    .catch(res => Promise.reject(res))
}

module.exports = {
  getWageList,
}
