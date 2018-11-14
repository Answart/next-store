import React, { Component } from 'react';
import Link from 'next/link';
import StyledProduct from './styles/ProductStyles';
import ProductVariants from './ProductVariants';
import product, { user } from '../lib/dummyData';


class Product extends Component {
  render() {
    const { id, demoView } = this.props;
    const viewerIsCreator = product
      ? product.user.id === user.id
      : false;
    return (
      <StyledProduct>
        <div className="prdct-imgs">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="prdct-content">
          <div className="prdct-padding">
            <Link href={{
              pathname: `/product/buy`,
              query: {
                id: `${product.id}`
              }
            }}>
              <a className="prdct-title">{product.title}</a>
            </Link>
          </div>

          <div className="prdct-creator prdct-padding">
            By
            <Link href={{
              pathname: `/shop`,
              query: {
                name: `${product.user.name}`,
                online: true
              }
            }}><a className="undrln-btn">
              {product.user.name}
            </a></Link>
          </div>

          {viewerIsCreator && !product.online && (
            <i className="prdct-padding">Offline</i>
          )}

          {product.productVariants &&
            <ProductVariants
              variants={product.productVariants}
              online={product.online}
              demoView={demoView}
            />
          }

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
