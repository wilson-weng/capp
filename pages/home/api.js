const request = require('../../common/utils/request.js')

const getPosts = payload => {
  return request.get('proj', payload)
    .then(res => res.content)
    .catch(res => Promise.reject(res))
}


module.exports = {
  getPosts,
}
