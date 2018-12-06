import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import ProductVariantFormFields from './ProductVariantFormFields';
import StyledForm from '../styles/FormStyles';
import { UPDATE_PROD_VARIANT_MUTATION } from '../../graphql';


class UpdateProductVariantForm extends Component {
  static propTypes = {
    variant: PropTypes.shape({
      id: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      size: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      sale: PropTypes.bool.isRequired,
      salePrice: PropTypes.number.isRequired
    })
  };
  state = this.props.variant
    ? this.props.variant
    : {
      id: '1',
      price: 1.00,
      quantity: 1,
      size: '',
      color: '',
      sale: false,
      salePrice: 1.00
    };
  saveToState = state => this.setState({ ...state });
  render() {
    return (
      <Mutation
        mutation={UPDATE_PROD_VARIANT_MUTATION}
        variables={this.state}
      >
        {(updateProductVariant, { loading, error }) => (
          <StyledForm
            data-test="form"
            onSubmit={async e => {
              e.preventDefault();
              const res = await updateProductVariant();
              Router.push({
                pathname: "/buy",
                query: { id: res.data.updateProductVariant.product.id },
              });
            }}
          >
            {error && (
              <div>{error}</div>
            )}

            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Update Selection</h2>

              <ProductVariantFormFields
                price={this.state.price}
                quantity={this.state.quantity}
                color={this.state.color}
                size={this.state.size}
                sale={this.state.sale}
                salePrice={this.state.salePrice}
                saveToState={this.saveToState}
              />

              <button className="form-submit-btn big-btn"
                type="submit"
              >Update</button>
            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
}


export { UpdateProductVariantForm };
