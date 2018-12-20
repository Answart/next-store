import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import ProductVariantFormFields from './ProductVariantFormFields';
import DisplayMessage from '../DisplayMessage';
import StyledForm from '../styles/FormStyles';
import { CREATE_IMAGE_MUTATION, UPDATE_PROD_VARIANT_MUTATION } from '../../graphql';


class UpdateProductVariantForm extends Component {
  static propTypes = {
    variant: PropTypes.shape({
      id: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      size: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      sale: PropTypes.bool.isRequired,
      salePrice: PropTypes.number.isRequired,
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
      }),
      product: PropTypes.shape({
        image: PropTypes.shape({
          id: PropTypes.string.isRequired,
          cloudinary_id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          width: PropTypes.number.isRequired,
          height: PropTypes.number.isRequired,
          transformation: PropTypes.string.isRequired,
          image_url: PropTypes.string.isRequired,
          large_image_url: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  };
  state = {
    ...this.props.variant,
    message: ''
  };
  saveToState = state => {
    if (typeof state.getNewImage !== 'undefined') {
      const { image, product } = this.props.variant;
      const previousImage = (!!image && image.cloudinary_id !== product.image.cloudinary_id)
        ? image
        : null;
      const overwrittenImage = state.getNewImage
        ? previousImage
        : product.image;
      this.setState({ image: overwrittenImage });
    } else {
      this.setState({ ...state });
    }
  };
  submitForm = async (e, createImage, updateProductVariant) => {
    e.preventDefault();
    const imageVariables = {
      ...this.state.image,
      productId: this.props.variant.product.id
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

      return await updateProductVariant({ variables }).then((res) => {
        this.setState({
          ...res.data.updateProductVariant,
          message: `Changes for selection with size '${this.state.size}' and color '${this.state.color}' saved.`
        });
      });
    });
  };
  render() {
    return (
      <Mutation mutation={CREATE_IMAGE_MUTATION} variables={{}}>
        {(createImage) => (
          <Mutation mutation={UPDATE_PROD_VARIANT_MUTATION} variables={{}}>
            {(updateProductVariant, { loading, error }) => (
              <StyledForm onSubmit={e => this.submitForm(e, createImage, updateProductVariant)}>
                <DisplayMessage error={error} message={this.state.message} />

                <fieldset disabled={loading} aria-busy={loading}>
                  <h2>Update Selection</h2>

                  <ProductVariantFormFields
                    price={this.state.price}
                    quantity={this.state.quantity}
                    color={this.state.color}
                    size={this.state.size}
                    sale={this.state.sale}
                    salePrice={this.state.salePrice}
                    image={this.state.image}
                    saveToForm={this.saveToState}
                    editView={true}
                    imgNotProdImg={!this.state.image || this.state.image.id !== this.props.variant.product.image.id}
                  />

                  <button className="form-submit-btn big-btn"
                    disabled={!this.state.image || loading}
                    type="submit"
                  >Updat{loading ? 'ing' : 'e'} Selection</button>
                </fieldset>
              </StyledForm>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}


export { UpdateProductVariantForm };
