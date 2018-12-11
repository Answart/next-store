import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import ProductFormFields from './ProductFormFields';
import DisplayError from '../DisplayError';
import StyledForm from '../styles/FormStyles';
import { UPDATE_PRODUCT_WITH_IMAGE_MUTATION } from '../../graphql';


class UpdateProductForm extends Component {
  static propTypes = {
    product: PropTypes.shape({
      department: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      online: PropTypes.bool.isRequired,
      image: PropTypes.shape({
        id: PropTypes.string,
        cloudinary_id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        transformation: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
        large_image_url: PropTypes.string.isRequired,
        delete_token: PropTypes.string
      })
    })
  };
  state = this.props.product;
  saveToState = state => this.setState({ ...state });
  getUpdateProductVariables = () => {
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
      <Mutation mutation={UPDATE_PRODUCT_WITH_IMAGE_MUTATION}
        variables={this.getUpdateProductVariables()}
      >
        {(updateProductWithImage, { loading, error }) => (
          <StyledForm
            data-test="form"
            onSubmit={async e => {
              e.preventDefault();
              await updateProductWithImage().then((res) => {
                Router.push({
                  pathname: "/buy",
                  query: { id: res.data.updateProductWithImage.id }
                });
              });
            }}
          >
            <DisplayError error={error} />

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
              />

              <button className="form-submit-btn big-btn"
                disabled={!this.state.image || loading}
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
