import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import StyledForm from '../styles/FormStyles';
import ProductFormFields from './ProductFormFields';
import { UPDATE_PRODUCT_MUTATION } from '../../graphql';


class UpdateProductForm extends Component {
  static propTypes = {
    product: PropTypes.shape({
      department: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      online: PropTypes.bool.isRequired
    })
  };
  state = this.props.product;
  saveToState = state => this.setState({ ...state });
  render() {
    return (
      <Mutation
        mutation={UPDATE_PRODUCT_MUTATION}
        variables={this.state}
      >
        {(updateProduct, { loading, error }) => (
          <StyledForm
            data-test="form"
            onSubmit={async e => {
              e.preventDefault();
              const res = await updateProduct();
              Router.push({
                pathname: '/buy',
                query: { id: res.data.updateProduct.id },
              });
            }}
          >
            {error && (
              <div>{error}</div>
            )}

            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Update Product</h2>

              <ProductFormFields
                title={this.state.title}
                department={this.state.department}
                description={this.state.description}
                category={this.state.category}
                brand={this.state.brand}
                online={this.state.online}
                image={this.state.image}
                saveToForm={this.saveToState}
                previewImage={false}
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


export { UpdateProductForm };
