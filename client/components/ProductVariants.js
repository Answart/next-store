import React, { Component } from 'react';
import { StyledProductVariants } from './styles/ProductStyles';


class ProductVariants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterQuery: {},
      currentVariants: [],
      sizes: [],
      colors: []
    };
    this.updateFilter = this.updateFilter.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  getKeyValues = (variants, key) => {
    let vals = [];
    variants.map(variant => {
      const val = variant[key];
      if (!vals.includes(val)) vals.push(val);
    });

    return vals;
  }
  getCurrentVariants = (variants, query) => {
    return variants.filter(variant => {
      const sizeMatch = query.size ? (query.size === variant.size) : true;
      const colorMatch = query.color ? (query.color === variant.color) : true;

      return (sizeMatch && colorMatch);
    });
  }
  resetState = (productVariants, filterQuery = {}) => {
    const sizes = this.getKeyValues(productVariants, 'size');
    let currentVariants, currentVariant;

    if (!Object.keys(filterQuery).length) {
      currentVariant = productVariants[0];
      const size = currentVariant.size ? currentVariant.size : null;
      const color = currentVariant.color ? currentVariant.color : null;
      if (size) filterQuery.size = size;
      if (color) filterQuery.color = color;
    }

    let sanColorFilter = {};
    if (filterQuery.size) sanColorFilter.size = filterQuery.size;
    currentVariants = this.getCurrentVariants(productVariants, sanColorFilter);
    const colors = this.getKeyValues(currentVariants, 'color');

    currentVariants = this.getCurrentVariants(productVariants, filterQuery);

    this.setState({
      sizes,
      colors,
      filterQuery,
      currentVariants
    });
  }
  componentWillMount = () => {
    const allVariants = this.props.allVariants;
    this.resetState(allVariants, {});
  }
  updateFilter = (e) => {
    if (!!e && e.preventDefault) e.preventDefault();
    const key = e.currentTarget.name || "";
    const val = e.currentTarget.value || "";
    let { filterQuery } = this.state;
    delete filterQuery[key];
    if (key && val.length) filterQuery[key] = val;
    if (key === 'size') delete filterQuery['color'];

    this.resetState(this.props.allVariants, filterQuery);
  }
  addToCart = (e) => {
    if (!!e && e.preventDefault) e.preventDefault();
    const { currentVariants } = this.state;
    const id = currentVariants[0].id;
    console.log('addToCart1', id);
  }
  render() {
    const {
      filterQuery,
      currentVariants,
      sizes,
      colors
    } = this.state;
    let currentVariant = currentVariants[0];
    let addToCrtBtnDisabled = (!(currentVariants.length == 1)) || !(this.props.online);
    let availability = currentVariant
      ? `${currentVariant.quantity} in Stock!`
      : "Out of Stock";
    return (
      <StyledProductVariants>
        {currentVariant && (
          <div className='product-price buy-prdct-price buy-prdct-padding'>
            {currentVariant.salePrice ? (
              <h3>
                <span className='line-through'>
                  ${currentVariant.price}
                </span>
                <span className='product-price product-sale'>
                  ${currentVariant.salePrice}
                </span>
              </h3>
            ) : (
              <h3>
                ${currentVariant.price}
              </h3>
            )}
          </div>
        )}

        {sizes.length && (
          <div className="buy-prdct-size buy-prdct-padding">
            <div>Sizes:</div>
            <select id="buy-prdct-size" name="size" className="buy-prdct-slct"
              onChange={this.updateFilter}
            >
              {sizes.map(sz => <option key={sz}>{sz}</option>)}
            </select>
          </div>
        )}

        {colors.length && (
          <div className="buy-prdct-color buy-prdct-padding">
            <div>Colors:</div>
            <select id="buy-prdct-color" name="color" className="buy-prdct-slct"
              onChange={this.updateFilter}
            >
              {colors.map(clr => <option key={clr}>{clr}</option>)}
            </select>
          </div>
        )}

        <div className="buy-prdct-avail buy-prdct-padding">
          <strong>Available: </strong>
          <i>{availability}</i>
        </div>

        <div className="buy-prdct-padding">
          <button
            disabled={addToCrtBtnDisabled}
            className="buy-prdct-btn"
            onClick={this.addToCart}
            >
            Add To Cart
          </button>
        </div>
      </StyledProductVariants>
    );
  }
}

export default ProductVariants;
