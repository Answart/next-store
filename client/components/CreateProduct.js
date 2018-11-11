import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import StyledForm from './styles/FormStyles';
import StyledProduct, { StyledProductVariant } from './styles/ProductStyles';
import { user } from '../lib/dummyData';
import { CREATE_PRODUCT_MUTATION } from '../graphql';


const departments = ['Tops', 'Bottoms', 'Shoes', 'Outwear', 'Accessories', 'Decor', 'Wedding'];
const categoriesByDept = {
  'Tops': ['Blouses', 'Cartigans', 'Casual', 'Sweaters', 'Sweatshirts'],
  'Bottoms': ['Skirts', 'Pants', 'Jeans', 'Leggings', 'Shorts', 'Intimates'],
  'Shoes': ['Heels', 'Flats', 'Sandals', 'Wedges', 'Boots', 'Booties', 'Sneakers'],
  'Outwear': ['Jackets', 'Blazers', 'Coats', 'Cartigans'],
  'Accessories': ['Jewelry', 'Bags', 'Wallets', 'Belts', 'Sunglasses', 'Makeup', 'Hair & Hats'],
  'Decor': ['Home', 'Kitchen', 'Office', 'Lighting'],
  'Wedding': ['Dresses', 'Shoes', 'Gifts', 'Accessories']
};

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
    let categories = department
      ? categoriesByDept[department]
      : categoriesByDept['Tops'];
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

            <fieldset disabled={false} aria-busy={false}>
              <StyledProduct>
                <div className="buy-prdct-imgs">
                  {image && (
                    <img width="200" src={image} alt="Upload Preview" />
                  )}
                </div>

                <div className="buy-prdct-content">
                  <label htmlFor="title" className="buy-prdct-title buy-prdct-padding">
                    Title:
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      value={title}
                      onChange={this.handleChange}
                      required
                    />
                  </label>

                  <div className="buy-prdct-creator buy-prdct-padding">
                    By <strong>{user.name}</strong>
                  </div>

                  <label htmlFor="department">
                    Department:
                    <select
                      id="department"
                      name="department"
                      form="carform"
                      placeholder="Department i.e. Shoes"
                      value={department}
                      onChange={this.handleChange}
                      required
                    >
                      {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                    </select>
                  </label>

                  <label htmlFor="category">
                    Category:
                    <select
                      id="category"
                      name="category"
                      form="carform"
                      value={category}
                      onChange={this.handleChange}
                    >
                      <option key={0} value={''}></option>
                      {categories.map(ctgry => <option key={ctgry} value={ctgry}>{ctgry}</option>)}
                    </select>
                  </label>

                  <label htmlFor="description" className="buy-prdct-desc">
                    Description:
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Enter A Description"
                      value={description}
                      onChange={this.handleChange}
                      required
                    />
                  </label>

                  <label htmlFor="brand" className="buy-prdct-brand">
                    Brand:
                    <input
                      type="text"
                      id="brand"
                      name="brand"
                      placeholder="Brand"
                      value={brand}
                      onChange={this.handleChange}
                    />
                  </label>

                  <label htmlFor="img">
                    Image:
                    <input
                      type="file"
                      id="img"
                      name="img"
                      placeholder="Upload an image"
                      onChange={this.uploadFile}
                      required
                    />
                  </label>
                </div>
              </StyledProduct>

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
