const request = require('../../common/utils/request.js')

const getCstActivity = (payload, pageName) => {
  return request.get('proj', payload)
    .then(res => {
      wx.setStorage({
        key: `NOTICE_LIST${pageName ? '_' + pageName : ''}`,
        data: res.data.posts,
      })

      return res.data
    })
    .catch(res => Promise.reject(res))
}

module.exports = {
  getCstActivity,
}
