import React, { Component } from 'react';
import StyledForm from './styles/FormStyles';
import StyledProduct from './styles/ProductStyles';
import ProductVariantFormFields from './ProductVariantFormFields';


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
          <ProductVariantFormFields
            price={price}
            quantity={quantity}
            color={color}
            size={size}
            sale={sale}
            salePrice={salePrice}
            handleChange={this.handleChange}
          />

          <div className="form-actions prdct-padding">
            <button className="big-btn"
              type="submit"
            >Add Selection</button>
          </div>
        </fieldset>
      </StyledForm>
    );
  }
}

export default CreateProductVariant;
