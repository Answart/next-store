import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import StyledProduct from '../styles/ProductStyles';
import ByCreator from '../ByCreator';
import { DEPARTMENTS, CATEGORIES } from '../../config';
import { capWord } from '../../lib/utils';
import { uploadImageFile, destroyImageFileByToken } from '../../lib/cloudinary';


const ProductFormFields = props => {
  const { department, image, online } = props;
  let categoriesByDept = department
    ? CATEGORIES[department]
    : CATEGORIES["tops"];
  const handleChange = e => {
    if (!!e.preventDefault) e.preventDefault();
    let { name, type, value, checked } = e.target;
    let state = {};
    let val = value;

    if (name === "department") state.category = "";
    if (type === "radio") {
      if (name === "online" || name === "offline") {
        val = (name === "online");
        name = "online";
      }
    }
    state[name] = val;

    props.saveToForm(state);
  };
  const handleImageChange = async e => {
    const { name, type, value, files } = e.target;
    const currentImageToken = props.image
      ? (props.image.delete_token || '')
      : '';
    NProgress.start();

    if (type === "file" && name === "image") {
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
          <label htmlFor="title">
            Title:
            <input id="title"
              type="text"
              name="title"
              placeholder="UGG Classic Boot"
              value={props.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        {props.userName && (
          <ByCreator
            name={props.userName}
            online={true}
          />
        )}

        <div className="field-padding">
          <label htmlFor="department">
            Department:
            <select id="department"
              name="department"
              value={department}
              onChange={handleChange}
              required
            >
              {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{capWord(dept)}</option>)}
            </select>
          </label>
        </div>

        <div className="field-padding">
          <label htmlFor="category">
            Category:
            <select id="category"
              name="category"
              value={props.category}
              onChange={handleChange}
            >
              <option key={0} value=''></option>
              {categoriesByDept.map(ctgry => <option key={ctgry} value={ctgry}>{capWord(ctgry)}</option>)}
            </select>
          </label>
        </div>

        <div className="field-padding">
          <label htmlFor="description">
            Description:
            <textarea id="description"
              name="description"
              placeholder="UGG boots are a unisex style of sheepskin boot originating in Australia and New Zealand..."
              value={props.description}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="field-padding">
          <label htmlFor="brand">
            Brand:
            <input id="brand"
              type="text"
              name="brand"
              placeholder="UGG"
              value={props.brand}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="field-padding">
          <label htmlFor="status">
            Status:
            <div className="prdct-padding">
              <div className="prdct-padding">
                <label htmlFor="offline" className="inline-lbl">
                  <input id="offline"
                    type="radio"
                    name="offline"
                    key={!online}
                    value={!online}
                    onChange={handleChange}
                    checked={!online}
                  />Private
                </label>
              </div>
              <div>
                <label htmlFor="online" className="inline-lbl">
                  <input id="online"
                    type="radio"
                    name="online"
                    key={online}
                    value={online}
                    onChange={handleChange}
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
                  <input id="image"
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />Upload Image
                </label>
              </div>

              {image && !!image.name.length && (
                <div className="field-padding field-detail">
                  <h5>
                    Preview Details
                  </h5>
                  <p>
                    ID: <i>{image.cloudinary_id}</i>
                  </p>
                  <p>
                    Name: <i>{image.name}</i>
                  </p>
                  <p>
                    Dimensions: <i>{image.width}</i>W x <i>{image.height}</i>H
                  </p>
                  <p>
                    Transformation: <i>{image.transformation}</i>
                  </p>
                  <p>
                    Url: <i>{image.image_url}</i>
                  </p>
                </div>
              )}
            </div>
          </label>
        </div>
      </div>
    </StyledProduct>
  );
};

ProductFormFields.propTypes = {
  title: PropTypes.string.isRequired,
  userName: PropTypes.string,
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
  saveToForm: PropTypes.func.isRequired
};


export default ProductFormFields;
