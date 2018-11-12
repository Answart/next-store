
const objctsDiffer = function(object1, object2) {
  for (let propName in object1) {
    if (object1.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
      return true;
    } else if (typeof object1[propName] != typeof object2[propName]) {
      return true;
    }
    if (!object2.hasOwnProperty(propName)) return true;
  }

  for (let propName in object2) {
    const object1Val = object1[propName];
    const object2Val = object2[propName];
    const object1Type = typeof object1Val;
    const object2Type = typeof object2Val;

    if (object1.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
      return true;
    } else if (typeof object1Val != typeof object2Val) {
      return true;
    }
    if (!object1.hasOwnProperty(propName)) return true;

    if (object1Type === 'array' && object2Type === 'array') {
      if (objctsDiffer(object1Val, object2Val)) {
        return true;
      }
    } else if (object1Type === 'object' && object2Type === 'object') {
      if (objctsDiffer(object1Val, object2Val)) {
        return true;
      } else if (object1Val != object2Val) {
        return true;
      }
    } else if (object1Type === 'string' && object2Type === 'string') {
      if (object1Val != object2Val) return true;
    }
  }

  return false;
}

const getUniqKeyVals = function(objs, key) {
  let vals = [];

  objs.map(obj => {
    const val = obj[key];
    if (!vals.includes(val)) vals.push(val);
  });

  return vals;
}

const getFltrdObjs = function(objs, filter) {
  const filterKeys = Object.keys(filter);

  return objs.filter(obj => {
    for (let i = 0; i < filterKeys.length; i++) {
      const key = filterKeys[i];
      if (!obj[key]) return false;
      if (obj[key] !== filter[key]) return false;
    }
    return true;
  });
}


export {
  objctsDiffer,
  getUniqKeyVals,
  getFltrdObjs
};
