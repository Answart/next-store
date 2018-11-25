import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledProductVariants } from './styles/ProductStyles';
import { getUniqKeyVals, getFltrdObjs } from '../lib/utilFns';


class ProductVariants extends Component {
  static propTypes = {
    variants: PropTypes.array.isRequired,
    online: PropTypes.bool.isRequired,
    demoView: PropTypes.bool,
    VariantActionComponent: PropTypes.func,
    variantAction: PropTypes.func,
    variantActionLabel: PropTypes.string
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
  renderActionButton = () => {
    const {
      VariantActionComponent,
      variantAction, variantActionLabel,
      online, demoView
    } = this.props;
    const { variant } = this.state;
    const addToCrtBtnDisabled = variant ? !variant.id : true;

    if (demoView || (online && !demoView)) {
      if (!!VariantActionComponent) {
        return (
          <VariantActionComponent
            disabled={addToCrtBtnDisabled}
            variant={variant}
          />
        );
      } else if (!!variantAction && !!variantActionLabel) {
        return (
          <button className="big-btn"
            disabled={addToCrtBtnDisabled}
            onClick={(e) => variantAction(e, variant)}
          >{variantActionLabel}</button>
        );
      }
    }
    return (<div></div>)
  }

  render() {
    const { sizes, colors, variant } = this.state;
    const { demoView, online } = this.props;
    let availability = variant
      ? `${variant.quantity} in Stock!`
      : "Out of Stock"
    return (
      <StyledProductVariants>
        {variant && (
          <div className='prdct-var-price prdct-padding'>
            {variant.salePrice ? (
              <h3>
                <span className='line-through'>
                  ${variant.price}
                </span>
                <span className='prdct-var-price prdct-var-sale-price'>
                  ${variant.salePrice}
                </span>
              </h3>
            ) : (
              <h3>${variant.price}</h3>
            )}
          </div>
        )}

        {sizes && !!sizes.length && (
          <div className="prdct-padding">
            <div>Sizes:</div>
            <select id="prdct-var-size" name="size"
              onChange={this.updateFilter}
            >
              {sizes.map(sz => <option key={sz}>{sz}</option>)}
            </select>
          </div>
        )}

        {colors && !!colors.length && (
          <div className="prdct-padding">
            <div>Colors:</div>
            <select id="prdct-var-color" name="color"
              onChange={this.updateFilter}
            >
              {colors.map(clr => <option key={clr}>{clr}</option>)}
            </select>
          </div>
        )}

        <div className="prdct-padding">
          {(demoView || (!demoView && online)) ? (
            <span>
              <strong>Available: </strong>
              <i>{availability}</i>
            </span>
          ) : (
            <i>Unavailable</i>
          )}
        </div>

        <div className="prdct-padding">
          {this.renderActionButton()}
        </div>
      </StyledProductVariants>
    );
  }
}

export default ProductVariants;
