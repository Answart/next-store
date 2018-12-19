import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import ProductVariantFormFields from './ProductVariantFormFields';
import DisplayError from '../DisplayError';
import StyledForm from '../styles/FormStyles';
import { CREATE_IMAGE_MUTATION, CREATE_PROD_VARIANT_MUTATION } from '../../graphql';


class CreateProductVariantForm extends Component {
  static propTypes = {
    productId: PropTypes.string.isRequired,
    productImage: PropTypes.shape({
      id: PropTypes.string.isRequired,
      cloudinary_id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      transformation: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      large_image_url: PropTypes.string.isRequired,
      delete_token: PropTypes.string
    }).isRequired
  };
  state = {
    price: 1.00,
    quantity: 1,
    color: "",
    size: "",
    sale: false,
    salePrice: 1.00,
    image: { ...this.props.productImage }
  };
  saveToState = state => {
    if (typeof state.getNewImage !== 'undefined') {
      const { productImage } = this.props;
      const { image } = this.state;
      const previousImage = (!!image && image.cloudinary_id !== productImage.cloudinary_id)
        ? image
        : null;
      const overwrittenImage = state.getNewImage
        ? previousImage
        : productImage;
      this.setState({ image: overwrittenImage });
    } else {
      this.setState({ ...state });
    }
  };
  submitForm = async (e, createImage, createProductVariant) => {
    e.preventDefault();
    const imageVariables = {
      ...this.state.image,
      productId: this.props.productId
    };
    if (!!imageVariables.id) delete imageVariables.id;
    if (!!imageVariables.delete_token) delete imageVariables.delete_token;

    return await createImage({ variables: { ...imageVariables }}).then(async (res) => {
      const variables = {
        ...this.state,
        productId: this.props.productId,
        imageId: res.data.createImage.id
      };
      delete variables.image;

      return await createProductVariant({ variables }).then((res) => {
        Router.push({
          pathname: "/buy",
          query: { id: res.data.createProductVariant.product.id }
        });
      });
    });
  };
  render() {
    return (
      <Mutation mutation={CREATE_IMAGE_MUTATION} variables={{}}>
        {(createImage) => (
          <Mutation mutation={CREATE_PROD_VARIANT_MUTATION} variables={{}}>
            {(createProductVariant, { loading, error }) => (
              <StyledForm onSubmit={e => this.submitForm(e, createImage, createProductVariant)}>
                <DisplayError error={error} />

                <fieldset disabled={loading} aria-busy={loading}>
                  <h2>Add Selection</h2>

                  <ProductVariantFormFields
                    price={this.state.price}
                    quantity={this.state.quantity}
                    color={this.state.color}
                    size={this.state.size}
                    sale={this.state.sale}
                    salePrice={this.state.salePrice}
                    image={this.state.image}
                    saveToForm={this.saveToState}
                    editView={false}
                    imgNotProdImg={!this.state.image || this.state.image.id !== this.props.productImage.id}
                  />

                  <button className="form-submit-btn big-btn"
                    disabled={!this.state.image || loading}
                    type="submit"
                  >Add{loading ? 'ing' : ''} Selection</button>
                </fieldset>
              </StyledForm>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}


export { CreateProductVariantForm };
