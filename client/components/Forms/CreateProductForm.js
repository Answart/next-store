import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import ProductFormFields from './ProductFormFields';
import DisplayMessage from '../DisplayMessage';
import StyledForm from '../styles/FormStyles';
import { CREATE_IMAGE_MUTATION, CREATE_PRODUCT_MUTATION } from '../../graphql';


class CreateProductForm extends Component {
  state = {
    department: "tops",
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
    const imageVariables = { ...this.state.image };
    if (!!imageVariables.id) delete imageVariables.id;
    if (!!imageVariables.delete_token) delete imageVariables.delete_token;

    return await createImage({ variables: { ...imageVariables }}).then(async (res) => {
      if (!res || !res.data) return;
      const variables = {
        ...this.state,
        imageId: res.data.createImage.id
      };
      delete variables.image;

      return await createProduct({ variables }).then((res) => {
        if (!res || !res.data) return;
        Router.push({
          pathname: "/product/selections",
          query: { id: res.data.createProduct.id }
        });
      });
    });
  };
  render() {
    return (
      <Mutation mutation={CREATE_IMAGE_MUTATION} variables={{}} onError={(e) => {}}>
        {(createImage, { loading: imageLoading, error: imageError }) => (
          <Mutation mutation={CREATE_PRODUCT_MUTATION} variables={{}} onError={(e) => {}}>
            {(createProduct, { loading: prodLoading, error: prodError }) => {
              const loading = (imageLoading || prodLoading);
              const error = imageError ? imageError : prodError;
              return (
                <StyledForm onSubmit={e => this.submitForm(e, createImage, createProduct)}>
                  <DisplayMessage error={error} />

                  <fieldset disabled={loading} aria-busy={loading}>
                    <h2>Create Product</h2>

                    <ProductFormFields
                      title={this.state.title}
                      userName=""
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
                    >Creat{loading ? 'ing' : 'e'} Product</button>
                  </fieldset>
                </StyledForm>
              )
            }}
          </Mutation>
        )}
      </Mutation>
    );
  }
}


export { CreateProductForm };
