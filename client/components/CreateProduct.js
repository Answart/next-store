import React, { Component } from 'react';
import { user } from '../lib/dummyData';


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
      ? files[0]
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
      <form
        data-test="form"
        onSubmit={async e => {
          e.preventDefault();
          console.log('onSubmit', this.state);
        }}
      >
        <fieldset disabled={false} aria-busy={false}>
          <div>
            <div>
              img preview here
            </div>

            <div>
              <label htmlFor="title">
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

              <div>
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

              <label htmlFor="description">
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

              <label htmlFor="brand">
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
          </div>

          <button type="submit">Create</button>
          <button type="cancel">Cancel</button>

        </fieldset>
      </form>
    );
  }
}

export default CreateProduct;
