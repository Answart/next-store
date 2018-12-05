import React, { Component } from 'react';
import Link from 'next/link';
import StyledProduct from './styles/ProductStyles';
import ByCreator from './ByCreator';
import ProductVariants from './ProductVariants';
import AddToCart from './Buttons/AddToCart';


class Product extends Component {
  render() {
    const { product, viewerIsCreator, demoView } = this.props;
    return (
      <StyledProduct>
        <div className="prdct-imgs">
          <img src={product.image} alt={product.title} />
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
            VariantActionComponent={AddToCart}
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
