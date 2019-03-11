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
    }).isRequired,
    goBack: PropTypes.func.isRequired
  };
  state = {
    ...this.props.variant,
    message: '',
    imageIsNew: (!!this.props.image && this.props.image.id !== this.props.variant.product.image.id)
  };
  saveToState = state => {
    const { imageIsNew } = state;
    if (typeof imageIsNew !== 'undefined') {
      const { image, product } = this.props.variant;
      const previousImage = (!!image && image.cloudinary_id !== product.image.cloudinary_id)
        ? image
        : null;
      const overwrittenImage = imageIsNew
        ? previousImage
        : product.image;
      this.setState({ imageIsNew, image: overwrittenImage });
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
      if (!res || !res.data) return;
      const variables = {
        id: this.state.id,
        color: this.state.color,
        size: this.state.size,
        quantity: this.state.quantity,
        price: this.state.price,
        sale: this.state.sale,
        salePrice: this.state.salePrice,
        imageId: res.data.createImage.id
      };

      return await updateProductVariant({ variables }).then((res) => {
        if (!res || !res.data) return;
        this.setState({
          ...res.data.updateProductVariant,
          message: `Changes for selection with size '${this.state.size}' and color '${this.state.color}' saved.`
        });
      });
    });
  };
  render() {
    return (
      <Mutation mutation={CREATE_IMAGE_MUTATION} variables={{}} onError={(e) => {}}>
        {(createImage, { loading: imageLoading, error: imageError }) => (
          <Mutation mutation={UPDATE_PROD_VARIANT_MUTATION} variables={{}} onError={(e) => {}}>
            {(updateProductVariant, { loading: prodVarLoading, error: prodVarError }) => {
              const loading = (imageLoading || prodVarLoading);
              const error = imageError ? imageError : prodVarError;
              return (
                <StyledForm onSubmit={e => this.submitForm(e, createImage, updateProductVariant)}>
                  <DisplayMessage error={error} success={this.state.message} />

                  <fieldset disabled={loading} aria-busy={loading}>
                    <h2>
                      Update Selection
                    </h2>

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
                      imageIsNew={this.state.imageIsNew}
                    />

                    <button className="form-submit-btn big-btn"
                      type="submit"
                      disabled={!this.state.image || loading}
                    >
                      Updat{loading ? 'ing' : 'e'} Selection
                    </button>

                    <button className="form-submit-btn undrln-btn"
                      type="button"
                      onClick={this.props.goBack}
                    >
                      Go Back
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


export { UpdateProductVariantForm };
