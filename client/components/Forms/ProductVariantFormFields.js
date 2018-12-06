import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyledProduct from '../styles/ProductStyles';
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
        ? Number(parseFloat(value).toFixed(2))
        : Number(parseFloat(value))
    }
    if (type === 'checkbox') val = checked;
    if (name === 'sale') state.salePrice = 1.00;

    state[name] = val;
    this.props.saveToState(state);
  };
  render() {
    const { sale } = this.props;
    return (
      <StyledProduct>
        <div className="form-imgs">
          <img width="450" height="640" src="/static/images/placeholder_large.jpg" alt="Placeholder Image" />
        </div>

        <div className="form-content">
          <div className="field-padding">
            <label htmlFor="size">
              Size:
              <select
                id="size"
                name="size"
                disabled={this.props.editView}
                value={this.props.size}
                onChange={this.handleChange}
              >
                <option key={0} value=''></option>
                {sizes.map(sz => <option key={sz} value={sz}>{sz}</option>)}
              </select>
            </label>
          </div>

          <div className="field-padding">
            <label htmlFor="color">
              Color:
              <select
                id="color"
                name="color"
                disabled={this.props.editView}
                value={this.props.color}
                onChange={this.handleChange}
              >
                <option key={0} value=''></option>
                {colors.map(clr => <option key={clr} value={clr}>{clr}</option>)}
              </select>
            </label>
          </div>

          <div className="field-padding">
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
          </div>

          <div className="field-padding">
            <label htmlFor="price">
              Price per Item (USD):
              <input
                type="number"
                id="price"
                name="price"
                placeholder={1.00}
                min={1.00}
                step={0.01}
                value={this.props.price}
                onChange={this.handleChange}
                required
              />
            </label>
          </div>

          <div className="field-padding">
            <label htmlFor="sale">
              <input
                type="checkbox"
                id="sale"
                name="sale"
                key={sale}
                value={sale}
                onChange={this.handleChange}
                checked={sale ? "checked" : ""}
              />On Sale
            </label>
          </div>

          {sale && (
            <div className="field-padding">
              <label htmlFor="salePrice">
                Sale Price per Item (USD):
                <input
                  type="number"
                  id="salePrice"
                  name="salePrice"
                  placeholder={1.00}
                  min={1.00}
                  step={0.01}
                  disabled={!sale}
                  value={this.props.salePrice}
                  onChange={this.handleChange}
                />
              </label>
            </div>
          )}
        </div>
      </StyledProduct>
    );
  }
}

export default ProductVariantFormFields;
