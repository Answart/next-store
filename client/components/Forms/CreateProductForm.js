import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import ProductFormFields from './ProductFormFields';
import DisplayError from '../DisplayError';
import StyledForm from '../styles/FormStyles';
import { CREATE_IMAGE_MUTATION, CREATE_PRODUCT_MUTATION } from '../../graphql';


class CreateProductForm extends Component {
  state = {
    department: "Tops",
    title: "",
    description: "",
    category: "",
    brand: "",
    online: false,
    image: null
  };
  saveToState = state => this.setState({ ...state });
  submitForm = async (e, createImage, createProduct) => {
    e.preventDefault();
    const variables = { ...this.state };
    const imageVariables = { ...variables.image };
    delete variables.image;
    delete imageVariables.id;
    if (!!imageVariables.delete_token) delete imageVariables.delete_token;

    return await createImage({ variables: { ...imageVariables }}).then(async (res) => {
      variables.imgId = res.data.createImage.id;
      return await createProduct({ variables }).then((res) => {
        Router.push({
          pathname: "/product/add",
          query: { id: res.data.createProduct.id }
        });
      });
    });
  };
  render() {
    return (
      <Mutation mutation={CREATE_IMAGE_MUTATION} variables={{}}>
        {(createImage) => (
          <Mutation mutation={CREATE_PRODUCT_MUTATION} variables={{}}>
            {(createProduct, { loading, error }) => (
              <StyledForm onSubmit={e => this.submitForm(e, createImage, createProduct)}>
                <DisplayError error={error} />

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
                    saveToForm={this.saveToState}
                  />

                  <button className="form-submit-btn big-btn"
                    disabled={!this.state.image || loading}
                    type="submit"
                  >Create</button>
                </fieldset>
              </StyledForm>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}


export { CreateProductForm };
