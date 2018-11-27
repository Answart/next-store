import React, { Component } from 'react';
import { StyledEditProductVariant } from './styles/ProductStyles';
import ProductVariants from './ProductVariants';
import { UpdateProductVariantForm } from './Forms';
import DeleteProductVariant from './Buttons/DeleteProductVariant';


class EditProductVariant extends Component {
  state = { currentVariant: null };
  selectVariant = (e, currentVariant) => {
    e.preventDefault();
    this.setState({ currentVariant });
  }
  render() {
    const { currentVariant } = this.state;
    const id = currentVariant ? currentVariant.id : null;
    return (
      <StyledEditProductVariant>
        <ProductVariants
          variants={this.props.productVariants}
          online={true}
          demoView={true}
          variantAction={this.selectVariant}
          variantActionLabel='Select'
        />

        <div className='edit-prdct-var-form'>
          {!currentVariant ? (
            <p>Choose a selection to update.</p>
          ) : (
            <UpdateProductVariantForm variant={currentVariant} />
          )}
        </div>

        <DeleteProductVariant
          id={id}
          productId={this.props.productId}
        >Delete Selection</DeleteProductVariant>
      </StyledEditProductVariant>
    );
  };
};

export default EditProductVariant;
