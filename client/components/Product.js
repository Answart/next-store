import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import StyledProduct from './styles/ProductStyles';
import ByCreator from './ByCreator';
import ProductVariants from './ProductVariants';


class Product extends Component {
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
      }).isRequired
    }).isRequired,
    viewerIsCreator: PropTypes.bool.isRequired,
    demoView: PropTypes.bool,
    VariantActionComponent: PropTypes.func,
    variantAction: PropTypes.func,
    variantActionLabel: PropTypes.string
  };
  render() {
    const {
      product, viewerIsCreator, demoView,
      variantAction, variantActionLabel, VariantActionComponent
    } = this.props;
    return (
      <StyledProduct>
        <div className="prdct-imgs">
          <img width="450" height="640" src={product.image.large_image_url} alt={product.title} />
        </div>

        <div className="prdct-content">
          <div className="prdct-padding">
            <Link href={{
              pathname: `/buy`,
              query: { id: product.id }
            }}>
              <a className="prdct-title">{product.title}</a>
            </Link>
          </div>

          <ByCreator
            name={product.user.name}
            online={true}
          />

          <div className="prdct-padding">
            {!viewerIsCreator && !product.online && (
              <i>Offline</i>
            )}
          </div>

          <ProductVariants
            variants={product.productVariants}
            online={product.online}
            demoView={demoView}
            VariantActionComponent={VariantActionComponent}
            variantAction={variantAction}
            variantActionLabel={variantActionLabel}
          />

          <div className="prdct-desc prdct-padding">
            <strong>Description:</strong>
            <p>{product.description}</p>

            {product.brand && (
              <div className="prdct-brand">
                <strong>Brand: </strong>{product.brand}
              </div>
            )}
          </div>
        </div>
      </StyledProduct>
    );
  }
}

export default Product;
