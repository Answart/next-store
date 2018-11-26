import React, { Component } from 'react';
import PropTypes from 'prop-types';
import colors from '../../lib/colors';
import sizes from '../../lib/sizes';


class ProductVariantFormFields extends Component {
  static propTypes = {
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    size: PropTypes.string,
    color: PropTypes.string,
    sale: PropTypes.bool.isRequired,
    salePrice: PropTypes.number.isRequired,
    saveToState: PropTypes.func.isRequired
  };
  handleChange = e => {
    const { name, type, value, checked } = e.target;
    let val = value;
    let state = {};

    if (type === 'number') {
      val = (name == 'price' || name === 'salePrice')
        ? parseFloat(value).toFixed(2)
        : parseFloat(value)
    }
    if (type === 'checkbox') val = checked;
    if (name === 'sale') state.salePrice = 1.00;
    state[name] = val;

    this.props.saveToState(state);
  };
  render() {
    const { sale } = this.props;
    return (
      <div>
        <label htmlFor="size">
          Size:
          <select
            id="size"
            name="size"
            value={this.props.size}
            onChange={this.handleChange}
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
            value={this.props.color}
            onChange={this.handleChange}
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
            placeholder="1"
            min="1"
            value={this.props.quantity}
            onChange={this.handleChange}
            required
          />
        </label>

        <label htmlFor="price" className="prdct-padding">
          Price per Item:
          <input
            type="number"
            id="price"
            name="price"
            placeholder="1.00"
            min="1.00"
            step="0.01"
            value={this.props.price}
            onChange={this.handleChange}
            required
          />
        </label>

        <div>
          <input
            type="checkbox"
            id="sale"
            name="sale"
            value={sale}
            onChange={this.handleChange}
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
              placeholder="1.00"
              min="1.00"
              step="0.01"
              disabled={!sale}
              value={this.props.salePrice}
              onChange={this.handleChange}
            />
          </label>
        )}
      </div>
    );
  }
}

export default ProductVariantFormFields;
