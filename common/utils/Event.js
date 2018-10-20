
const EventProxy = function () {
  if (!(this instanceof EventProxy)) {
    return new EventProxy()
  }
  this._callbacks = {}
}

EventProxy.prototype.emit = function (eventName, ...rest) {
  let list, callback, i, l
  let calls = this._callbacks

  list = calls[eventName]

  if (list) {
    for (i = 0, l = list.length; i < l; i++) {
      callback = list[i]
      if (!callback) {
        list.splice(i, 1)
        i--
        l--
      } else {
        callback.apply(this, rest)
      }
    }
  }

  return this
}

EventProxy.prototype.on = function (ev, callback) {
  this._callbacks[ev] = this._callbacks[ev] || []
  this._callbacks[ev].push(callback)

  return this
}

EventProxy.prototype.removeListener = function (eventname, callback) {
  let calls = this._callbacks

  if (!eventname) {
    this._callbacks = {}
  } else {
    if (!callback) {
      calls[eventname] = []
    } else {
      let list = calls[eventname]

      if (list) {
        let l = list.length
        for (let i = 0; i < l; i++) {
          if (callback === list[i]) {
            list[i] = null
          }
        }
      }
    }
  }

  return this
}

const event = new EventProxy()

export default event
