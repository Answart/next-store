import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import StyledProduct from '../styles/ProductStyles';
import { colors, sizes } from '../../config';
import { uploadImageFile, destroyImageFileByToken } from '../../lib/cloudinary';


const ProductVariantFormFields = props => {
  const { sale, image, imageIsNew } = props;
  const handleChange = e => {
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
    props.saveToForm(state);
  };
  const handleImageChange = async e => {
    if (!!e.preventDefault) e.preventDefault();
    const { name, type, value, files } = e.target;
    const currentImageToken = props.image
      ? (props.image.delete_token || '')
      : '';
    NProgress.start();

    if (type === 'radio') {
      const imageIsNew = (value === 'true');
      if (imageIsNew && !!currentImageToken.length) await destroyImageFileByToken(currentImageToken);

      props.saveToForm({ imageIsNew });
    }
    if (type === 'file' && name === 'upload') {
      if (!files || !files.length) return;
      const image = await uploadImageFile(files[0]);
      if (image.error) return alert('An error occured while uploading image. Please try again later.');
      if (!!currentImageToken.length) await destroyImageFileByToken(currentImageToken);

      props.saveToForm({ image });
    }
    NProgress.done();
  }
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
              disabled={props.editView}
              value={props.size}
              onChange={handleChange}
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
              disabled={props.editView}
              value={props.color}
              onChange={handleChange}
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
              value={props.quantity}
              onChange={handleChange}
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
              value={props.price}
              onChange={handleChange}
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
              onChange={handleChange}
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
                value={props.salePrice}
                onChange={handleChange}
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
                    key={!imageIsNew}
                    value={false}
                    onChange={handleImageChange}
                    checked={!imageIsNew}
                  />Same as Product Image
                </label>
              </div>
              <div>
                <label htmlFor="newImage" className="inline-lbl">
                  <input
                    type="radio"
                    id="newImage"
                    name="newImage"
                    key={imageIsNew}
                    value={true}
                    onChange={handleImageChange}
                    checked={imageIsNew}
                  />New Image
                </label>
              </div>

              {imageIsNew && (
                <div className="field-padding">
                  <label htmlFor="upload" className="lbl-button">
                    <input
                      type="file"
                      id="upload"
                      name="upload"
                      onChange={handleImageChange}
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
};

ProductVariantFormFields.propTypes = {
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
  imageIsNew: PropTypes.bool.isRequired,
  saveToForm: PropTypes.func.isRequired,
  editView: PropTypes.bool.isRequired
};

export default ProductVariantFormFields;
