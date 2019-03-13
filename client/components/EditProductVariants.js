import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledEditProductVariants } from './styles/ProductStyles';
import DisplayMessage from './DisplayMessage';
import Product from './Product';
import { UpdateProductVariantForm } from './Forms';
import { DeleteProductVariant } from './Buttons';


class EditProductVariants extends Component {
  static propTypes = {
    product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string,
      brand: PropTypes.string,
      online: PropTypes.bool.isRequired,
      image: PropTypes.shape({
        id: PropTypes.string.isRequired,
        cloudinary_id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        transformation: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
        large_image_url: PropTypes.string.isRequired
      }).isRequired,
      variants: PropTypes.array.isRequired,
    }).isRequired
  };
  state = {
    currentVariant: null,
    message: ''
  };
  selectVariant = (e, currentVariant, message = '') => {
    if (!!e && e.preventDefault) e.preventDefault();

    if (!this.props.product.variants.length) return;
    this.setState({ currentVariant: null, message }, () => {
      if (currentVariant) this.setState({ currentVariant, message });
    });
  }
  render() {
    const { currentVariant } = this.state;
    const id = currentVariant ? currentVariant.id : null;
    return (
      <StyledEditProductVariants>
        <DisplayMessage success={this.state.message} />

        {!currentVariant ? (
          <div className="edit-prdct-var-choose">
            <div className="edit-prdct-lbl">
              1. Choose Selection to Update
            </div>

            <div className="edit-prdct-content">
              <Product
                product={this.props.product}
                demoView={true}
                variantAction={this.selectVariant}
                variantActionLabel='Select'
              />
            </div>
          </div>
        ) : (
          <div className='edit-prdct-var-form'>
            <div className="edit-prdct-lbl">
              2. Update Selection
            </div>

            <UpdateProductVariantForm
              variant={currentVariant}
              goBack={(e) => this.selectVariant(e, null)}
            />

            <div className="edit-pg-content-footer">
              <DeleteProductVariant
                id={id}
                productId={this.props.product.id}
                postDelete={(e) => this.selectVariant(e, null, `Deleted selection with size '${currentVariant.size}' and color '${currentVariant.color}'.`)}
              >Delete Selection</DeleteProductVariant>
            </div>
          </div>
        )}
      </StyledEditProductVariants>
    );
  };
};

export default EditProductVariants;
