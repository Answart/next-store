import React, { Component } from 'react';
import { StyledEditProductVariants } from './styles/ProductStyles';
import ProductVariants from './ProductVariants';
import { UpdateProductVariantForm } from './Forms';
import DeleteProductVariant from './Buttons/DeleteProductVariant';


class EditProductVariants extends Component {
  state = { currentVariant: null };
  selectVariant = (e, currentVariant) => {
    e.preventDefault();
    this.setState({ currentVariant });
  }
  render() {
    const { currentVariant } = this.state;
    const id = currentVariant ? currentVariant.id : null;
    return (
      <StyledEditProductVariants>
        <div className="edit-prdct-var-choose">
          <div className="edit-prdct-lbl">1. Choose</div>
          <ProductVariants
            variants={this.props.productVariants}
            online={true}
            demoView={true}
            variantAction={this.selectVariant}
            variantActionLabel='Select'
          />
        </div>

        <div className='edit-prdct-var-form'>
          <div className="edit-prdct-lbl">2. Update</div>
          {!currentVariant ? (
            <p>Choose a selection to update.</p>
          ) : (
            <div>
              <UpdateProductVariantForm
                variant={currentVariant}
              />

              <div className="edit-pg-content-footer">
                <DeleteProductVariant
                  id={id}
                  productId={this.props.productId}
                >Delete Selection</DeleteProductVariant>
              </div>
            </div>
          )}
        </div>
      </StyledEditProductVariants>
    );
  };
};

export default EditProductVariants;
