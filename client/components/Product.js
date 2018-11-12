import React, { Component } from 'react';
import Link from 'next/link';
import StyledProduct from './styles/ProductStyles';
import ProductVariants from './ProductVariants';
import product from '../lib/dummyData';


class Product extends Component {
  render() {
    const { id, demoView } = this.props;
    return (
      <StyledProduct>
        <div className="buy-prdct-imgs">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="buy-prdct-content">
          <div className="buy-prdct-padding">
            <Link href={{
              pathname: `/product/buy`,
              query: {
                id: `${product.id}`
              }
            }}>
              <a className="buy-prdct-title">{product.title}</a>
            </Link>
          </div>

          <div className="buy-prdct-creator buy-prdct-padding">
            By
            <Link href={{
              pathname: `/shop`,
              query: {
                name: `${product.user.name}`,
                online: true
              }
            }}>
              <a> {product.user.name}</a>
            </Link>
          </div>

          {product.productVariants &&
            <ProductVariants
              variants={product.productVariants}
              online={product.online}
              demoView={demoView}
            />
          }

          <div className="buy-prdct-desc buy-prdct-padding">
            <strong>Description:</strong>
            <p>{product.description}</p>

            {product.brand && (
              <div className="buy-prdct-brand">
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
