import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledProductVariants } from './styles/ProductStyles';
import PriceTag from './PriceTag';
import { getUniqKeyVals, getFltrdObjs, formatMoney, capWord } from '../lib/utils';


class ProductVariants extends Component {
  static propTypes = {
    variants: PropTypes.arrayOf(PropTypes.shape({
      size: PropTypes.string,
      color: PropTypes.string,
      availability: PropTypes.string,
      price: PropTypes.number,
      sale: PropTypes.bool.isRequired,
      salePrice: PropTypes.number
    })).isRequired,
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
  updateFilter = e => {
    if (!!e && e.preventDefault) e.preventDefault();
    const { name, value } = e.currentTarget;
    let { filterQuery } = this.state;
    delete filterQuery[name];
    if (name && value.length) filterQuery[name] = value;
    if (name === 'size') delete filterQuery['color'];

    const state = this.getStartState(filterQuery);
    this.setState(state);
  }
  render() {
    const { sizes, colors, variant } = this.state;
    const {
      VariantActionComponent,
      variantAction, variantActionLabel,
      online, demoView
    } = this.props;
    const live = online && !demoView
    const accessible = (demoView || live);
    let availability = accessible && variant ? variant.availability : "Unavailable";
    return (
      <StyledProductVariants>
        {variant && (
          <div className="prdct-padding">
            <PriceTag price={variant.price} sale={variant.sale} salePrice={variant.salePrice} />
          </div>
        )}

        {sizes && !!sizes.length && (
          <div id='prod-var-sizes' className="prdct-padding">
            <div className="prdct-padding filter-sizes">
              {sizes.map((size, i) => (
                <button key={i} id={`prod-var-size-${size}`} className={size == variant.size ? 'undrln-btn sample-selected' : 'undrln-btn sample-hover'}
                  name="size"
                  value={size}
                  title={`Select size: ${capWord(size)}`}
                  onClick={this.updateFilter}
                >
                  {capWord(size)}
                </button>
              ))}
            </div>
          </div>
        )}

        {colors && !!colors.length && (
          <div id='prod-var-colors' className="prdct-padding">
            <div id='prod-var-colors-title'>
              {!variant.color ? 'Colors:' : capWord(variant.color)}
            </div>

            <div className="prdct-padding filter-colors">
              {colors.map((color, i) => (
                <button key={i} id={`prod-var-color-${color}`} className={color == variant.color ? 'sample-selected' : 'sample-hover'}
                  name="color"
                  value={color}
                  title={`Select color: ${capWord(color)}`}
                  onClick={this.updateFilter}
                >
                  <div className={`color-sphere-sample ${color}-color-sample`}></div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div id='prod-var-avail' className="prdct-padding">
          <i>
            {availability}
          </i>
        </div>

        {!!variant && accessible && (
          <div id='prod-var-action' className="prdct-padding">
            {(!!VariantActionComponent) && (
              <VariantActionComponent
                disabled={!variant.id}
                variant={variant}
              />
            )}
            {(!!variantAction && !!variantActionLabel) && (
              <button id='prod-var-action-btn' className="big-btn"
                disabled={!variant || !variant.id}
                onClick={(e) => variantAction(e, variant)}
              >
                {variantActionLabel}
              </button>
            )}
          </div>
        )}
      </StyledProductVariants>
    );
  }
}


export default ProductVariants;
