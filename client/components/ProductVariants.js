import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledProductVariants } from './styles/ProductStyles';
import { getUniqKeyVals, getFltrdObjs } from '../lib/utilFns';


class ProductVariants extends Component {
  static propTypes = {
    variants: PropTypes.array.isRequired,
    online: PropTypes.bool.isRequired,
    demoView: PropTypes.bool
  };
  constructor(props) {
    super(props);
    let newState = this.getStartState();
    const sizes = getUniqKeyVals(this.props.variants, 'size');
    newState.sizes = sizes;

    this.state = newState;
  }
  getStartState = (filterQuery = {}) => {
    let variants = this.props.variants || [];
    let currentVariants = [];
    let variant;

    let updating = Object.keys(filterQuery).length ? true : false;
    if (variants.length) variant = variants[0];

    if (variant && !updating) {
      if (variant.size) filterQuery.size = variant.size;
    }

    currentVariants = getFltrdObjs(variants, filterQuery);

    const colors = getUniqKeyVals(currentVariants, 'color');

    if (variant && !updating) {
      if (variant.color) filterQuery.color = variant.color;
    }

    if (filterQuery.color) currentVariants = getFltrdObjs(variants, filterQuery);

    variant = currentVariants.length ? currentVariants[0] : null;

    return {
      filterQuery,
      currentVariants,
      variant,
      colors
    };
  }
  updateFilter = (e) => {
    if (!!e && e.preventDefault) e.preventDefault();
    const { name, value } = e.currentTarget;
    let { filterQuery } = this.state;
    delete filterQuery[name];
    if (name && value.length) filterQuery[name] = value;
    if (name === 'size') delete filterQuery['color'];

    const state = this.getStartState(filterQuery);
    this.setState(state);
  }
  addToCart = e => {
    if (!!e && e.preventDefault) e.preventDefault();
    const { variant } = this.state;
    const id = variant.id;
    console.log('addToCart1', variant);
  }
  render() {
    const {
      sizes,
      filterQuery,
      currentVariants,
      variant,
      colors
    } = this.state;
    const { demoView, online } = this.props;
    let availability = variant
      ? `${variant.quantity} in Stock!`
      : "Out of Stock"
    let addToCrtBtnDisabled = variant ? !variant.id : true;
    return (
      <StyledProductVariants>
        {variant && (
          <div className='product-price buy-prdct-price buy-prdct-padding'>
            {variant.salePrice ? (
              <h3>
                <span className='line-through'>
                  ${variant.price}
                </span>
                <span className='product-price product-sale'>
                  ${variant.salePrice}
                </span>
              </h3>
            ) : (
              <h3>
                ${variant.price}
              </h3>
            )}
          </div>
        )}

        {sizes && !!sizes.length && (
          <div className="buy-prdct-size buy-prdct-padding">
            <div>Sizes:</div>
            <select id="buy-prdct-size" name="size" className="buy-prdct-slct"
              onChange={this.updateFilter}
            >
              {sizes.map(sz => <option key={sz}>{sz}</option>)}
            </select>
          </div>
        )}

        {colors && !!colors.length && (
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
          {(demoView || (!demoView && online)) ? (
            <span>
              <strong>Available: </strong>
              <i>{availability}</i>
            </span>
          ) : (
            <i>Unavailable</i>
          )}
        </div>

        {variant && (
          <div className="buy-prdct-padding">
            {online && !demoView && (
              <button
                disabled={addToCrtBtnDisabled}
                className="buy-prdct-btn"
                onClick={this.addToCart}
              >Add To Cart
              </button>
            )}
          </div>
        )}
      </StyledProductVariants>
    );
  }
}

export default ProductVariants;
