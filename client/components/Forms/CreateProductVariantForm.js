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
    price: 1.00,
    quantity: 1,
    color: '',
    size: '',
    sale: false,
    salePrice: 1.00,
    productId: this.props.productId
  };
  saveToState = state => {
    this.setState({ ...state });
  };
  render() {
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
                price={this.state.price}
                quantity={this.state.quantity}
                color={this.state.color}
                size={this.state.size}
                sale={this.state.sale}
                salePrice={this.state.salePrice}
                saveToState={this.saveToState}
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


export { CreateProductVariantForm };
