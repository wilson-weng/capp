const getType = obj => {
  let toString = Object.prototype.toString;
  let map = {
    '[object Boolean]'  : 'boolean',
    '[object Number]'   : 'number',
    '[object String]'   : 'string',
    '[object Function]' : 'function',
    '[object Array]'    : 'array',
    '[object Date]'     : 'date',
    '[object RegExp]'   : 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]'     : 'null',
    '[object Object]'   : 'object'
  };

  if (obj instanceof Element) {
    return 'element';
  }

  return map[toString.call(obj)];
}

const deepClone = data => {
  let type = getType(data);
  let obj;

  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    return data;
  }

  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (let key in data) {
      obj[key] = deepClone(data[key]);
    }
  }

  return obj;
}


module.exports = {
  deepClone,
}
