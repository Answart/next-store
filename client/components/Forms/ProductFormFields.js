import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ByCreator from '../ByCreator';
import departments from '../../lib/departments';
import categoriesByDept from '../../lib/categoriesByDept';
import { user } from '../../lib/dummyData';


class ProductFormFields extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    online: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string,
    brand: PropTypes.string,
    saveToState: PropTypes.func.isRequired,
    previewImage: PropTypes.bool
  };
  handleChange = e => {
    let { name, type, value, checked } = e.target;
    let state = {};
    let val = value;

    if (type === 'number') val = value ? parseFloat(value) : 0;
    if (type === 'checkbox') val = checked;
    if (name === 'department') state.category = '';
    if (type === 'radio') {
      if (name === 'online' || name === 'offline') {
        val = (name === 'online');
        name = 'online';
      }
    }
    state[name] = val;

    this.props.saveToState(state);
  };
  uploadFile = async e => {
    const files = e.target.files;

    // Upload file and return url;
    const image = files.length
      ? files[0].name
      : '';

    this.props.saveToState({ image });
  };
  render() {
    const {
      department,
      image,
      previewImage
    } = this.props;
    let categories = department
      ? categoriesByDept[department]
      : categoriesByDept['Tops'];
    return (
      <div>
        {previewImage && (
          <div className="prdct-imgs">
            {image && (
              <img width="200" src={image} alt="Upload Preview" />
            )}
          </div>
        )}

        <div className="prdct-content">
          <label htmlFor="title" className="field-padding">
            Title:
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={this.props.title}
              onChange={this.handleChange}
              required
            />
          </label>

          <ByCreator
            name={user.name}
            online={true}
          />

          <label htmlFor="department">
            Department:
            <select
              id="department"
              name="department"
              form="carform"
              placeholder="Department i.e. Shoes"
              value={this.props.department}
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
              value={this.props.category}
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
              value={this.props.description}
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
              value={this.props.brand}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="status">
            Status:
            <div>
              <input
                type="radio"
                name='offline'
                value={!this.props.online}
                checked={!this.props.online}
                onChange={this.handleChange}
              /><label htmlFor="offline" className="inline-lbl">Private</label>
            </div>
            <div>
              <input
                type="radio"
                name='online'
                value={this.props.online}
                checked={this.props.online}
                onChange={this.handleChange}
              /><label htmlFor="online" className="inline-lbl">Public</label>
            </div>
          </label>

          <label htmlFor="image">
            Image: {image && (<span className="image-lbl"> {image}</span>)}
            <input
              type="file"
              id="image"
              name="image"
              placeholder={image}
              onChange={this.uploadFile}
              required={!image}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default ProductFormFields;
