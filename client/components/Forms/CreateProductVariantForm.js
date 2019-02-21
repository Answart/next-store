import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import ProductVariantFormFields from './ProductVariantFormFields';
import DisplayMessage from '../DisplayMessage';
import StyledForm from '../styles/FormStyles';
import { CREATE_IMAGE_MUTATION, CREATE_PROD_VARIANT_MUTATION, PRODUCT_QUERY } from '../../graphql';


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
  newState = {
    price: 1.00,
    quantity: 1,
    color: "",
    size: "",
    sale: false,
    salePrice: 1.00,
    image: { ...this.props.productImage },
    message: '',
    imageIsNew: false
  };
  state = this.newState;
  saveToState = state => {
    const { imageIsNew } = state;
    if (typeof imageIsNew !== 'undefined') {
      const { productImage } = this.props;
      const { image } = this.state;
      const previousImage = (!!image && image.cloudinary_id !== productImage.cloudinary_id)
        ? image
        : null;
      const overwrittenImage = imageIsNew
        ? previousImage
        : productImage;
      this.setState({ imageIsNew, image: overwrittenImage });
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
      if (!res || !res.data) return;
      const variables = {
        ...this.state,
        productId: this.props.productId,
        imageId: res.data.createImage.id
      };
      delete variables.image;
      delete variables.imageIsNew;
      delete variables.message;

      return await createProductVariant({ variables }).then((res) => {
        if (!res || !res.data) return;
        this.setState({
          ...this.newState,
          message: `Selection of size '${this.state.size}' and color '${this.state.color}' added to product!`
        });
      });
    });
  };
  update = (cache, payload) => {
    const variables = { id: this.props.productId };
    const data = cache.readQuery({ query: PRODUCT_QUERY, variables });
    const newVariant = payload.data.createProductVariant;
    const included = data.product.variants.find(variant => variant.id === `${newVariant.id}`);
    if (!included) data.product.variants.push(newVariant);
    cache.writeQuery({ query: PRODUCT_QUERY, variables, data });
  };
  render() {
    return (
      <Mutation mutation={CREATE_IMAGE_MUTATION} variables={{}} onError={(e) => {}}>
        {(createImage, { loading: imageLoading, error: imageError }) => (
          <Mutation mutation={CREATE_PROD_VARIANT_MUTATION} variables={{}} update={this.update} onError={(e) => {}}>
            {(createProductVariant, { loading: prodVarLoading, error: prodVarError }) => {
              const loading = (imageLoading || prodVarLoading);
              const error = imageError ? imageError : prodVarError;
              return (
                <StyledForm onSubmit={e => this.submitForm(e, createImage, createProductVariant)}>
                  <DisplayMessage error={error} success={this.state.message} />

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
                      imageIsNew={this.state.imageIsNew}
                    />

                    <button className="form-submit-btn big-btn"
                      disabled={!this.state.image || loading}
                      type="submit"
                    >Add{loading ? 'ing' : ''} Selection</button>
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


export { CreateProductVariantForm };
