import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import ProductFormFields from './ProductFormFields';
import DisplayMessage from '../DisplayMessage';
import StyledForm from '../styles/FormStyles';
import { CREATE_IMAGE_MUTATION, UPDATE_PRODUCT_MUTATION } from '../../graphql';


class UpdateProductForm extends Component {
  static propTypes = {
    product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      online: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired,
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
  state = {
    ...this.props.product,
    message: ''
  };
  saveToState = state => this.setState({ ...state });
  submitForm = async (e, createImage, updateProduct) => {
    e.preventDefault();
    const imageVariables = {
      ...this.state.image,
      productId: this.props.product.id
    };
    if (!!imageVariables.id) delete imageVariables.id;
    if (!!imageVariables.delete_token) delete imageVariables.delete_token;

    return await createImage({ variables: { ...imageVariables }}).then(async (res) => {
      const variables = {
        ...this.state,
        imageId: res.data.createImage.id
      };
      delete variables.image;
      delete variables.message;
      delete variables.user;

      return await updateProduct({ variables }).then((res) => {
        this.setState({
          ...res.data.updateProduct,
          message: 'Product changes saved.'
        });
      });
    });
  };
  render() {
    return (
      <Mutation mutation={CREATE_IMAGE_MUTATION} variables={{}}>
        {(createImage, { loading: imageLoading, error: imageError }) => (
          <Mutation mutation={UPDATE_PRODUCT_MUTATION} variables={{}}>
            {(updateProduct, { loading: prodLoading, error: prodError }) => {
              const loading = (imageLoading || prodLoading);
              const error = imageError ? imageError : prodError;
              return (
                <StyledForm onSubmit={e => this.submitForm(e, createImage, updateProduct)}>
                  <DisplayMessage error={error} success={this.state.message} />

                  <fieldset disabled={loading} aria-busy={loading}>
                    <h2>
                      Update Product
                    </h2>

                    <ProductFormFields
                      title={this.state.title}
                      userName={this.props.product.user.name}
                      department={this.state.department}
                      description={this.state.description}
                      category={this.state.category}
                      brand={this.state.brand}
                      online={this.state.online}
                      image={this.state.image}
                      saveToForm={this.saveToState}
                    />

                    <button className="form-submit-btn big-btn"
                      type="submit"
                      disabled={!this.state.image || loading}
                    >
                      Updat{loading ? 'ing' : 'e'} Product
                    </button>
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


export { UpdateProductForm };
