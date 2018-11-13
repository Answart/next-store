import React, { Component } from 'react';
import PropTypes from 'prop-types';
import colors from '../lib/colors';
import sizes from '../lib/sizes';


class ProductVariantFormFields extends Component {
  static propTypes = {
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    size: PropTypes.string,
    color: PropTypes.string,
    sale: PropTypes.bool.isRequired,
    salePrice: PropTypes.number,
    handleChange: PropTypes.func.isRequired
  };
  render() {
    const {
      price,
      quantity,
      size,
      color,
      sale,
      salePrice,
      handleChange
    } = this.props;
    return (
      <div>
        <label htmlFor="size">
          Size:
          <select
            id="size"
            name="size"
            value={size}
            onChange={handleChange}
          >
            <option key={0} value={''}></option>
            {sizes.map(sz => <option key={sz} value={sz}>{sz}</option>)}
          </select>
        </label>

        <label htmlFor="color">
          Color:
          <select
            id="color"
            name="color"
            placeholder=""
            value={color}
            onChange={handleChange}
          >
            <option key={0} value={''}></option>
            {colors.map(clr => <option key={clr} value={clr}>{clr}</option>)}
          </select>
        </label>

        <label htmlFor="quantity">
          Quantity:
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
            min="1"
            value={quantity}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="price" className="prdct-padding">
          Price per Item:
          <input
            type="number"
            id="price"
            name="price"
            placeholder="42.99"
            min="1"
            value={price}
            onChange={handleChange}
            required
          />
        </label>

        <div>
          <input
            type="checkbox"
            id="sale"
            name="sale"
            value={sale}
            onChange={handleChange}
            checked={sale ? "checked" : ""}
          />
          <label htmlFor="sale" className="prdct-padding">
            Is this selection on sale?
          </label>
        </div>

        {sale && (
          <label htmlFor="salePrice" className="prdct-padding">
            Sale Price per Item:
            <input
              type="number"
              id="salePrice"
              name="salePrice"
              placeholder="22.50"
              min="1"
              disabled={!sale}
              value={salePrice}
              onChange={handleChange}
            />
          </label>
        )}
      </div>
    );
  }
}

export default ProductVariantFormFields;
