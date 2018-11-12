import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import StyledForm from './styles/FormStyles';
import ProductFormFields from './ProductFormFields';
import { CREATE_PRODUCT_MUTATION } from '../graphql';
import { user } from '../lib/dummyData';


class CreateProduct extends Component {
  state = {
    department: 'Tops',
    title: '',
    description: '',
    image: '',
    category: '',
    brand: ''
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
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
      title,
      department,
      description,
      image,
      category,
      brand
    } = this.state;
    return (
      <Mutation
        mutation={CREATE_PRODUCT_MUTATION}
        variables={this.state}
      >
        {(createProduct, { loading, error }) => (
          <StyledForm
            data-test="form"
            onSubmit={async e => {
              e.preventDefault();
              const res = await createProduct();
              Router.push({
                pathname: '/product/update',
                query: { id: res.data.createProduct.id },
              });
            }}
          >

            <div>{error}</div>

            <fieldset disabled={loading} aria-busy={loading}>
              <ProductFormFields
                title={title}
                department={department}
                description={description}
                image={image}
                category={category}
                brand={brand}
                handleChange={this.handleChange}
                uploadFile={this.uploadFile}
                previewImage={true}
              />

              <div className="form-actions buy-prdct-padding">
                <button
                  type="submit"
                  className="buy-prdct-btn"
                >Create</button>
              </div>
              <div className="form-actions buy-prdct-padding">
                <button type="cancel">
                  <Link href="/">
                    <a>Cancel</a>
                  </Link>
                </button>
              </div>
            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
}

export default CreateProduct;
