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
            <PriceTag
              price={variant.price}
              sale={variant.sale}
              salePrice={variant.salePrice}
            />
          </div>
        )}

        {sizes && !!sizes.length && (
          <div className="prdct-padding">
            <div>Sizes:</div>

            <div className="prdct-padding filter-sizes">
              {sizes.map((size, i) => (
                <button key={i} className={`undrln-btn ${size == variant.size ? 'sample-selected' : 'sample-hover'}`}
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
          <i>{availability}</i>
        </div>

        {accessible && (
          <div className="prdct-padding">
            {(!!VariantActionComponent) && (
              <VariantActionComponent
                disabled={!variant || !variant.id}
                variant={variant}
              />
            )}
            {(!!variantAction && !!variantActionLabel) && (
              <button className="big-btn"
                disabled={!variant || !variant.id}
                onClick={(e) => variantAction(e, variant)}
              >{variantActionLabel}</button>
            )}
          </div>
        )}
      </StyledProductVariants>
    );
  }
}


export default ProductVariants;
