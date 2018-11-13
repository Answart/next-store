import React, { Component } from 'react';
import PropTypes from 'prop-types';
import departments from '../lib/departments';
import categoriesByDept from '../lib/categoriesByDept';
import { user } from '../lib/dummyData';


class ProductFormFields extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    online: PropTypes.bool,
    image: PropTypes.string.isRequired,
    category: PropTypes.string,
    brand: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    uploadFile: PropTypes.func.isRequired,
    previewImage: PropTypes.bool
  };
  render() {
    const {
      title,
      department,
      description,
      online,
      image,
      category,
      brand,
      handleChange,
      uploadFile,
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
              value={title}
              onChange={handleChange}
              required
            />
          </label>

          <div className="prdct-creator field-padding">
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </label>

          <input
            type="checkbox"
            id="online"
            name="online"
            value={online}
            onChange={handleChange}
            checked={online ? "checked" : ""}
          />
          <label htmlFor="online" className="chkbx-label">
            Online
          </label>

          <label htmlFor="img">
            Image:
            <input
              type="file"
              id="img"
              name="img"
              placeholder="Upload an image"
              onChange={uploadFile}
              required
            />
          </label>
        </div>
      </div>
    );
  }
}

export default ProductFormFields;
