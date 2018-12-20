import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledEditProductVariants } from './styles/ProductStyles';
import Product from './Product';
import { UpdateProductVariantForm } from './Forms';
import DeleteProductVariant from './Buttons/DeleteProductVariant';


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
    }).isRequired,
    viewerIsCreator: PropTypes.bool.isRequired
  };
  state = {
    currentVariant: null,
  };
  selectVariant = (e, currentVariant) => {
    if (!!e && e.preventDefault) e.preventDefault();

    this.setState({ currentVariant: null }, () => {
      if (currentVariant) this.setState({ currentVariant });
    });
  }
  render() {
    const { currentVariant } = this.state;
    const id = currentVariant ? currentVariant.id : null;
    return (
      <StyledEditProductVariants>
        {!currentVariant ? (
          <div className="edit-prdct-var-choose">
            <div className="edit-prdct-lbl">1. Choose Selection to Update</div>

            <Product
              product={this.props.product}
              viewerIsCreator={this.props.viewerIsCreator}
              demoView={true}
              variantAction={this.selectVariant}
              variantActionLabel='Select'
            />
          </div>
        ) : (
          <div className='edit-prdct-var-form'>
            <div className="edit-prdct-lbl">2. Update Selection</div>

            <UpdateProductVariantForm
              variant={currentVariant}
              goBack={(e) => this.selectVariant(e, null)}
            />

            <div className="edit-pg-content-footer">
              <DeleteProductVariant
                id={id}
                productId={this.props.product.id}
                postDelete={(e) => this.selectVariant(e, null)}
              >Delete Selection</DeleteProductVariant>
            </div>
          </div>
        )}
      </StyledEditProductVariants>
    );
  };
};

export default EditProductVariants;
