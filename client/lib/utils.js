import { SALES_TAX_RATE, SHIPPING_COST_PER_ITEM } from '../config';


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

const capWord = function(string = "") {
  return string.length
    ? (string.charAt(0).toUpperCase() + string.slice(1))
    : "";
}

const formatMoney = function(amount) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };
  const formatter = new Intl.NumberFormat('en-US', options);

  return formatter.format(amount);
}

const getPageTitleProps = function(user, pageQuery = {}) {
  let pageLabel = '';
  let titles = [];

  if (pageQuery.name) {
    pageLabel = (user && pageQuery.name === user.name)
      ? 'My Products'
      : capWord(pageQuery.name);
  }

  if (pageQuery.department) {
    const query = { ...pageQuery }
    if (query.category) delete query.category;

    titles.push({
      label: capWord(pageQuery.department),
      href: {
        pathname: '/shop',
        query
      }
    })
  }
  if (pageQuery.category) {
    titles.push({
      label: capWord(pageQuery.category),
      href: {
        pathname: '/shop',
        query: { ...pageQuery }
      }
    })
  }

  return { pageLabel, titles };
}

const getFilterProps = function(products) {
  const categories = [];
  const colors = [];
  const sizes = [];
  const brands = [];

  for (let p = 0; p < products.length; p++) {
    const product = products[p];
    const variants = product.variants;
    if (!!product.category) categories.push(product.category);
    if (!!product.brand) brands.push(product.brand);
    for (let v = 0; v < variants.length; v++) {
      const variant = variants[v]
      if (variant.size) sizes.push(variant.size);
      if (variant.color) colors.push(variant.color);
    }
  }

  return { categories, colors, sizes, brands };
}


export {
  objctsDiffer,
  getUniqKeyVals,
  getFltrdObjs,
  capWord,
  formatMoney,
  getPageTitleProps,
  getFilterProps,
};
