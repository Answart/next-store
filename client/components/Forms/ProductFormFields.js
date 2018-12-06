import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyledProduct from '../styles/ProductStyles';
import ByCreator from '../ByCreator';
import departments from '../../lib/departments';
import categoriesByDept from '../../lib/categoriesByDept';
import { user } from '../../lib/dummyData';
import { uploadImageFile, destroyImageFileByToken } from '../../lib/cloudinary';


class ProductFormFields extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    online: PropTypes.bool.isRequired,
    category: PropTypes.string,
    brand: PropTypes.string,
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
    saveToForm: PropTypes.func.isRequired,
    previewImage: PropTypes.bool
  };
  handleChange = e => {
    if (!!e.preventDefault) e.preventDefault();
    let { name, type, value, checked } = e.target;
    let state = {};
    let val = value;

    if (type === "number") val = value ? Number(parseFloat(value)) : 0;
    if (type === "checkbox") val = checked;
    if (name === "department") state.category = "";
    if (type === "radio") {
      if (name === "online" || name === "offline") {
        val = (name === "online");
        name = "online";
      }
    }
    state[name] = val;

    this.props.saveToForm(state);
  };
  handleImageChange = async e => {
    const { name, type, value, files } = e.target;
    const currentImageToken = this.props.image
      ? (this.props.image.delete_token || '')
      : '';

    if (type === "file" && name === "image") {
      if (!files || !files.length) return;
      const image = await uploadImageFile(files[0]);
      if (image.error) return alert('An error occured while uploading image. Please try again later.');
      if (!!currentImageToken.length) await destroyImageFileByToken(currentImageToken);

      // save image to form here
    }
  }
  render() {
    const { department, image, previewImage, online } = this.props;
    let categories = department
      ? categoriesByDept[department]
      : categoriesByDept["Tops"];
    return (
      <StyledProduct>
        <div className="form-imgs">
          {!!image ? (
            <img width="450" height="640" src={image.large_image_url} alt={image.name} />
          ) : (
            <img width="450" height="640" src="/static/images/placeholder_large.jpg" alt="Placeholder Image" />
          )}
        </div>

        <div className="form-content">
          <div className="field-padding">
            <label htmlFor="title">
              Title:
              <input
                type="text"
                id="title"
                name="title"
                placeholder="UGG Classic Boot"
                value={this.props.title}
                onChange={this.handleChange}
                required
              />
            </label>
          </div>

          <ByCreator
            name={user.name}
            online={true}
          />

          <div className="field-padding">
            <label htmlFor="department">
              Department:
              <select
                id="department"
                name="department"
                value={department}
                onChange={this.handleChange}
                required
              >
                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
            </label>
          </div>

          <div className="field-padding">
            <label htmlFor="category">
              Category:
              <select
                id="category"
                name="category"
                value={this.props.category}
                onChange={this.handleChange}
              >
                <option key={0} value=''></option>
                {categories.map(ctgry => <option key={ctgry} value={ctgry}>{ctgry}</option>)}
              </select>
            </label>
          </div>

          <div className="field-padding">
            <label htmlFor="description">
              Description:
              <textarea
                id="description"
                name="description"
                placeholder="UGG boots are a unisex style of sheepskin boot originating in Australia and New Zealand..."
                value={this.props.description}
                onChange={this.handleChange}
                required
              />
            </label>
          </div>

          <div className="field-padding">
            <label htmlFor="brand">
              Brand:
              <input
                type="text"
                id="brand"
                name="brand"
                placeholder="UGG"
                value={this.props.brand}
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div className="field-padding">
            <label htmlFor="status">
              Status:
              <div className="prdct-padding">
                <div className="prdct-padding">
                  <label htmlFor="offline" className="inline-lbl">
                    <input
                      type="radio"
                      id="offline"
                      name="offline"
                      key={!online}
                      value={!online}
                      onChange={this.handleChange}
                      checked={!online}
                    />Private
                  </label>
                </div>
                <div>
                  <label htmlFor="online" className="inline-lbl">
                    <input
                      type="radio"
                      id="online"
                      name="online"
                      key={online}
                      value={online}
                      onChange={this.handleChange}
                      checked={online}
                    />Public
                  </label>
                </div>
              </div>
            </label>
          </div>

          <div className="field-padding">
            <label>
              Image:
              <div>
                <div className="prdct-padding">
                  <label htmlFor="image" className="lbl-button">
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={this.handleImageChange}
                    />Upload Image
                  </label>
                </div>
              </div>
            </label>
          </div>
        </div>
      </StyledProduct>
    );
  }
}

export default ProductFormFields;
