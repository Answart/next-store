import React, { Component } from 'react';


const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink', 'Brown', 'Black', 'Silver', 'White', 'Gold', 'Multi'];
const sizes = [
  'XXS', 'XS', 'S', 'M', 'L',
  'XL', '1X', '2X', '3X', '4X',
  '0', '2', '4', '6', '8',
  '10', '12', '14', '16', '18'
];

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
    if (type === 'number') val = parseFloat(value);
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
      <form
        data-test="form"
        onSubmit={async e => {
          e.preventDefault();
          console.log('onSubmit', this.state);
        }}
      >

        <fieldset aria-busy={false}>
          <div>
            <div>

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

              <label htmlFor="price">
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
                <label htmlFor="sale">
                  Is this selection on sale?
                </label>
              </div>

              {sale && (
                <label htmlFor="salePrice">
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

            </div>
          </div>

          <div>
            <button type="submit">Add Selection</button>
          </div>

        </fieldset>
      </form>
    );
  }
}

export default CreateProductVariant;
