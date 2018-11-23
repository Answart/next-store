import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import StyledForm from './styles/FormStyles';
import ProductFormFields from './ProductFormFields';
import { UPDATE_PRODUCT_MUTATION } from '../graphql';


class UpdateProduct extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired
  };
  state = this.props.product
    ? this.props.product
    : {
        department: 'Tops',
        title: '',
        description: '',
        image: '',
        category: '',
        brand: '',
        online: false
      };
  handleChange = e => {
    const { name, type, value, checked } = e.target;
    let val = value;
    if (type === 'number') val = value ? parseFloat(value) : 0;
    if (type === 'checkbox') val = checked;
    if (name === 'department') {
      this.setState({
        category: '',
        [name]: val
      });
    } else {
      this.setState({ [name]: val });
    }
  };
  uploadFile = async e => {
    const files = e.target.files;
    // Upload file and return url;
    const image = files.length
      ? files[0].name
      : '';

    this.setState({ image });
  };
  render() {
    const {
      id,
      title,
      department,
      description,
      image,
      category,
      brand,
      online
    } = this.state;
    return (
      <Mutation
        mutation={UPDATE_PRODUCT_MUTATION}
        variables={this.state}
      >
        {(updateProduct, { loading, error }) => (
          <StyledForm
            data-test="form"
            onSubmit={async e => {
              e.preventDefault();
              const res = await updateProduct();
              Router.push({
                pathname: '/product/buy',
                query: { id: res.data.updateProduct.id },
              });
            }}
          >
            {error ? (
              <div>{error}</div>
            )}

            <fieldset disabled={loading} aria-busy={loading}>
              <ProductFormFields
                title={title}
                department={department}
                description={description}
                image={image}
                category={category}
                brand={brand}
                online={online}
                handleChange={this.handleChange}
                uploadFile={this.uploadFile}
                previewImage={false}
              />

              <div className="form-actions prdct-padding">
                <button className="big-btn"
                  type="submit"
                >Update Product</button>
              </div>
            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
}

export default UpdateProduct;
