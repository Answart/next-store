import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import ProductVariantFormFields from './ProductVariantFormFields';
import StyledForm from '../styles/FormStyles';
import { CREATE_PROD_VARIANT_MUTATION } from '../../graphql';


class CreateProductVariantForm extends Component {
  static propTypes = {
    productId: PropTypes.string.isRequired
  };
  state = {
    price: 0,
    quantity: 1,
    color: '',
    size: '',
    sale: false,
    salePrice: 0,
    productId: this.props.productId
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
      salePrice,
      productId
    } = this.state;
    return (
      <Mutation
        mutation={CREATE_PROD_VARIANT_MUTATION}
        variables={this.state}
      >
        {(createProductVariant, { loading, error }) => (
          <StyledForm
            data-test="form"
            onSubmit={async e => {
              e.preventDefault();
              const res = await createProductVariant();
              Router.push({
                pathname: '/product/buy',
                query: { id: productId },
              });
            }}
          >
            {error && (
              <div>{error}</div>
            )}

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
        )}
      </Mutation>
    );
  }
}

export default CreateProductVariantForm;
