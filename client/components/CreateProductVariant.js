import React, { Component } from 'react';
import StyledForm from './styles/FormStyles';
import StyledProduct from './styles/ProductStyles';
import colors from '../lib/colors';
import sizes from '../lib/sizes';


class CreateProductVariant extends Component {
  state = {
    price: 0,
    quantity: 1,
    color: '',
    size: '',
    sale: false,
    salePrice: 0
  };
  handleChange = e => {
    const { name, type, value, checked } = e.target;
    let val = value;
    if (type === 'number') val = value ? parseFloat(value) : 0;
    if (type === 'checkbox') val = checked;
    if (name === 'sale') {
      this.setState({
        salePrice: 0,
        [name]: val
      });
    } else {
      this.setState({ [name]: val });
    }
  };
  render() {
    const {
      price,
      quantity,
      color,
      size,
      sale,
      salePrice
    } = this.state;
    return (
      <StyledForm
        data-test="form"
        onSubmit={async e => {
          e.preventDefault();
          console.log('onSubmit', this.state);
        }}
      >

        <fieldset disabled={false} aria-busy={false}>
          <StyledProduct>
              <label htmlFor="size">
                Size:
                <select
                  id="size"
                  name="size"
                  value={size}
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
                  value={color}
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
                  placeholder="Quantity"
                  min="1"
                  value={quantity}
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
                  placeholder="42.99"
                  min="1"
                  value={price}
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
                    min="0"
                    disabled={!sale}
                    value={salePrice}
                    onChange={this.handleChange}
                  />
                </label>
              )}
          </StyledProduct>

          <div className="form-actions prdct-padding">
            <button type="submit" className="prdct-btn">Add Selection</button>
          </div>

        </fieldset>
      </StyledForm>
    );
  }
}

export default CreateProductVariant;
