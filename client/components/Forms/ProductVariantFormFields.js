import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyledProduct from '../styles/ProductStyles';
import colors from '../../lib/colors';
import sizes from '../../lib/sizes';
import { uploadImageFile, destroyImageFileByToken } from '../../lib/cloudinary';


class ProductVariantFormFields extends Component {
  static propTypes = {
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    size: PropTypes.string,
    color: PropTypes.string,
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
      large_image_url: PropTypes.string.isRequired
    }),
    saveToForm: PropTypes.func.isRequired,
    editView: PropTypes.bool.isRequired
  };
  state = { getNewImage: false };
  handleChange = e => {
    if (!!e.preventDefault) e.preventDefault();
    const { name, type, value, checked } = e.target;
    let val = value;
    let state = {};

    if (type === 'number') {
      val = (name == 'price' || name === 'salePrice')
        ? Number(parseFloat(value).toFixed(2))
        : Number(parseFloat(value))
    }
    if (type === 'checkbox') val = checked;
    if (name === 'sale') state.salePrice = 1.00;

    state[name] = val;
    this.props.saveToForm(state);
  };
  handleImageChange = async e => {
    if (!!e.preventDefault) e.preventDefault();
    const { name, type, value, files } = e.target;
    const currentImageToken = this.props.image
      ? (this.props.image.delete_token || '')
      : '';

    if (type === 'radio') {
      const getNewImage = (value === 'true');
      if (getNewImage && !!currentImageToken.length) await destroyImageFileByToken(currentImageToken);

      this.setState({ getNewImage });
      this.props.saveToForm({ getNewImage });
    }
    if (type === 'file' && name === 'upload') {
      if (!files || !files.length) return;
      const image = await uploadImageFile(files[0]);
      if (image.error) return alert('An error occured while uploading image. Please try again later.');
      if (!!currentImageToken.length) await destroyImageFileByToken(currentImageToken);

      this.props.saveToForm({ image });
    }
  }
  render() {
    const { sale, image } = this.props;
    const { getNewImage } = this.state;
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
            <label htmlFor="size">
              Size:
              <select
                id="size"
                name="size"
                disabled={this.props.editView}
                value={this.props.size}
                onChange={this.handleChange}
              >
                <option key={0} value=''></option>
                {sizes.map(sz => <option key={sz} value={sz}>{sz}</option>)}
              </select>
            </label>
          </div>

          <div className="field-padding">
            <label htmlFor="color">
              Color:
              <select
                id="color"
                name="color"
                disabled={this.props.editView}
                value={this.props.color}
                onChange={this.handleChange}
              >
                <option key={0} value=''></option>
                {colors.map(clr => <option key={clr} value={clr}>{clr}</option>)}
              </select>
            </label>
          </div>

          <div className="field-padding">
            <label htmlFor="quantity">
              Quantity:
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="1"
                min="1"
                value={this.props.quantity}
                onChange={this.handleChange}
                required
              />
            </label>
          </div>

          <div className="field-padding">
            <label htmlFor="price">
              Price per Item (USD):
              <input
                type="number"
                id="price"
                name="price"
                placeholder={1.00}
                min={1.00}
                step={0.01}
                value={this.props.price}
                onChange={this.handleChange}
                required
              />
            </label>
          </div>

          <div className="field-padding">
            <label htmlFor="sale">
              <input
                type="checkbox"
                id="sale"
                name="sale"
                key={sale}
                value={sale}
                onChange={this.handleChange}
                checked={sale ? "checked" : ""}
              />On Sale
            </label>
          </div>

          {sale && (
            <div className="field-padding">
              <label htmlFor="salePrice">
                Sale Price per Item (USD):
                <input
                  type="number"
                  id="salePrice"
                  name="salePrice"
                  placeholder={1.00}
                  min={1.00}
                  step={0.01}
                  disabled={!sale}
                  value={this.props.salePrice}
                  onChange={this.handleChange}
                />
              </label>
            </div>
          )}

          <div className="field-padding">
            <label htmlFor="image">
              Image:
              <div className="prdct-padding">
                <div className="prdct-padding">
                  <label htmlFor="productImage" className="inline-lbl">
                    <input
                      type="radio"
                      id="productImage"
                      name="productImage"
                      key={!getNewImage}
                      value={false}
                      onChange={this.handleImageChange}
                      checked={!getNewImage}
                    />Same as Product Image
                  </label>
                </div>
                <div>
                  <label htmlFor="newImage" className="inline-lbl">
                    <input
                      type="radio"
                      id="newImage"
                      name="newImage"
                      key={getNewImage}
                      value={true}
                      onChange={this.handleImageChange}
                      checked={getNewImage}
                    />New Image
                  </label>
                </div>

                {getNewImage && (
                  <div className="field-padding">
                    <label htmlFor="upload" className="lbl-button">
                      <input
                        type="file"
                        id="upload"
                        name="upload"
                        onChange={this.handleImageChange}
                      />Upload Image
                    </label>
                  </div>
                )}

                {!!image && !!image.name.length && (
                  <div className="field-padding field-detail">
                    <h5>Upload Details</h5>
                    <p>ID: <i>{image.cloudinary_id}</i></p>
                    <p>Name: <i>{image.name}</i></p>
                    <p>Dimensions: <i>{image.width}</i>W x <i>{image.height}</i>H</p>
                    <p>Transformation: <i>{image.transformation}</i></p>
                    <p>Url: <i>{image.image_url}</i></p>
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>
      </StyledProduct>
    );
  }
}

export default ProductVariantFormFields;
