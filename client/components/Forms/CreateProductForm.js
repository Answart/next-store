import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import ProductFormFields from './ProductFormFields';
import StyledForm from '../styles/FormStyles';
import { CREATE_PRODUCT_MUTATION } from '../../graphql';


class CreateProductForm extends Component {
  state = {
    department: "Tops",
    title: "",
    description: "",
    category: "",
    brand: "",
    online: false,
    image: ""
  };
  saveToState = state => this.setState({ ...state });
  render() {
    return (
      <Mutation
        mutation={CREATE_PRODUCT_MUTATION}
        variables={this.state}
      >
        {(createProduct, { loading, error }) => (
          <StyledForm
            data-test="form"
            onSubmit={async e => {
              e.preventDefault();
              const res = await createProduct();
              Router.push({
                pathname: '/product/edit',
                query: { id: res.data.createProduct.id }
              });
            }}
          >
            {error && (
              <div>{error}</div>
            )}

            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Create Product</h2>

              <ProductFormFields
                title={this.state.title}
                department={this.state.department}
                description={this.state.description}
                category={this.state.category}
                brand={this.state.brand}
                online={this.state.online}
                image={this.state.image}
                saveToState={this.saveToState}
                previewImage={true}
              />

              <button className="form-submit-btn big-btn"
                type="submit"
              >Create</button>
            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
}


export { CreateProductForm };
