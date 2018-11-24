import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import ProductVariantFormFields from './ProductVariantFormFields';
import StyledForm from '../styles/FormStyles';
import { user } from '../../lib/dummyData';


class UpdateProductVariantForm extends Component {
  static propTypes = {
    variant: PropTypes.object.isRequired
  };
  state = this.props.variant
    ? this.props.variant
    : {
      id: '1',
      price: 1,
      quantity: '1',
      size: '',
      color: '',
      sale: false,
      salePrice: 0
    };
  handleChange = e => {
    const { name, type, value, checked } = e.target;
    let val = value;
    if (type === 'number') val = value ? parseFloat(value) : 0;
    if (type === 'checkbox') val = checked;
    if (name === 'department') {
      this.setState({
        category: '',
        [name]: val
      });
    } else {
      this.setState({ [name]: val });
    }
  };
  render() {
    const {
      id,
      price,
      quantity,
      size,
      color,
      sale,
      salePrice,
      productId
    } = this.state;
    return (
          <StyledForm
            data-test="form"
            onSubmit={async e => {
              e.preventDefault();
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
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
                >Update Selection</button>
              </div>
            </fieldset>
          </StyledForm>
    );
  }
}


export default UpdateProductVariantForm;
