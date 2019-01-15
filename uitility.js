/**
 * 计算数据所占内存大小，单位bytes
 * @param {*} object
 */
export const roughSizeOfObject = object => {
  var objectList = [];
  var stack = [object];
  var bytes = 0;

  while (stack.length) {
    var value = stack.pop();

    if (typeof value === "boolean") {
      bytes += 4;
    } else if (typeof value === "string") {
      bytes += value.length * 2;
    } else if (typeof value === "number") {
      bytes += 8;
    } else if (typeof value === "object" && objectList.indexOf(value) === -1) {
      objectList.push(value);

      for (var i in value) {
        stack.push(value[i]);
      }
    }
  }
  return bytes;
};

/**
 * queryString转object
 * @param {String} str
 */
export const parseQuery = str => {
  var obj = {};
  if (!str) return null;
  const res = str.match(/([^?=&]+)(=([^&]*))/g);
  if (!res) {
    return null;
  }
  res.forEach(param => {
    const idx = param.indexOf("=");
    const value = decodeURIComponent(param.slice(idx + 1));
    obj[param.slice(0, idx)] = value;
  });
  return obj;
};

/**
 * object转queryString，默认使用encode
 * @param {Object} obj
 * @param {Boolean} encode
 */
export const stringifyQuery = (obj, encode = true) => {
  encode = !!encode;
  let str = "";
  Object.keys(obj).forEach(function(key) {
    var value = decodeURIComponent(obj[key]);
    value = encode ? encodeURIComponent(value) : value;
    var param = key + "=" + value;
    str += param + "&";
  });
  return str.slice(0, -1);
};
