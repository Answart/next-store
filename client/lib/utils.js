import { SALES_TAX_RATE, SHIPPING_COST_PER_ITEM } from '../config';


const capWord = function(string = "") {
  let new_string = !!string
    ? string.toString().trim()
    : "";
  if (!new_string.length) return new_string;

  return (new_string.length > 1)
    ? (new_string.charAt(0).toUpperCase() + new_string.slice(1))
    : new_string.charAt(0).toUpperCase();
}

const formatMoney = function(amount) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };
  // if its a whole, dollar amount, leave off the .00
  if (amount % 1 === 0) options.minimumFractionDigits = 0;
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

const getCartTotals = function(cart = []) {
  let totalQuantity = 0;
  let totalShipping = 0;
  let totalSalesTax = 0;
  let subTotal = 0;

  if (!!cart && !!cart.length) {
    subTotal = cart.reduce((tally, cartItem) => {
      if (!cartItem.variant || !cartItem.variant.price) return tally;
      const quantity = cartItem.quantity;
      const price = cartItem.variant.sale
        ? cartItem.variant.salePrice
        : cartItem.variant.price

      totalQuantity += quantity;
      totalShipping += quantity * SHIPPING_COST_PER_ITEM;
      totalSalesTax += quantity * price * SALES_TAX_RATE;

      return tally + (quantity * price);
    }, 0);
  }

  return {
    totalQuantity,
    totalShipping: Number(parseFloat(totalShipping).toFixed(2)),
    totalSalesTax: Number(parseFloat(totalSalesTax).toFixed(2)),
    subTotal: Number(parseFloat(subTotal).toFixed(2))
  };
}

const getUniqKeyVals = function(objsArr, key) {
  let vals = [];
  const len = objsArr.length;
  let val;

  for (let i = 0; i < len; i++) {
    val = objsArr[i][key];

    if (!vals.includes(val)) vals.push(val);
  }

  return vals;
}

const getFltrdObjs = function(objs, filter) {
  const filterKeys = Object.keys(filter);
  const len = filterKeys.length;
  let key;

  return objs.filter(obj => {
    for (let i = 0; i < len; i++) {
      key = filterKeys[i];

      if (!obj[key]) return false;
      if (obj[key] !== filter[key]) return false;
    }

    return true;
  });
}


export {
  capWord,
  formatMoney,
  getPageTitleProps,
  getCartTotals,
  getUniqKeyVals,
  getFltrdObjs,
};
