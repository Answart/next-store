import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import ProductFormFields from './ProductFormFields';
import StyledForm from '../styles/FormStyles';
import { CREATE_PRODUCT_WITH_IMAGE_MUTATION } from '../../graphql';


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
  getCreateProductVariables = () => {
    const image = { ...this.state.image };
    if (!!image.delete_token) delete image.delete_token;
    delete image.id;
    let variables = {
      ...this.state,
      ...image
    };
    delete variables.image;

    return variables;
  }
  render() {
    return (
      <Mutation mutation={CREATE_PRODUCT_WITH_IMAGE_MUTATION}
        variables={this.getCreateProductVariables()}
      >
        {(createProductWithImage, { loading, error }) => (
          <StyledForm
            data-test="form"
            onSubmit={async e => {
              e.preventDefault();
              const res = await createProductWithImage();
              Router.push({
                pathname: "/product/edit",
                query: { id: res.data.createProductWithImage.id }
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
                saveToForm={this.saveToState}
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
