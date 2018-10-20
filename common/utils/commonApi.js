const request = require('./request.js')

const get3rdSession = (app, payload) => {
  return request.get(`mp/session?code=${payload.code}`, payload, {
    app: app,
    toast: false,
  })
    .then(res => res)
    .catch(res => Promise.reject(res))
}

const checkLogin = (app, payload) => {
  return request.post('mp/login/check', payload, {
    app: app,
    toast: false,
  })
    .then(res => res)
    .catch(res => res)
}

module.exports = {
  get3rdSession,
  checkLogin,
}
