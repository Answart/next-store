import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { StyledProductsListItem } from './styles/ProductStyles';
import styled from 'styled-components';


export default class Product extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired
  };

  render() {
    const { product } = this.props;
    const firstProductVariant = product.productVariants[0];
    const availability = !firstProductVariant
      ? "Out of Stock"
      : "";
    return (
      <StyledProductsListItem>
        <Link
          href={{
            pathname: `/product/buy`,
            query: { id: product.id }
          }}
        >
          <a>{product.image && (
            <img src={product.image} alt={product.title} />
          )}</a>
        </Link>

        <div className="prdct-itm-info">
          <Link
            href={{
              pathname: `/product/buy`,
              query: { id: product.id }
            }}
          >
            <a className='prdct-itm-title'>{product.title}</a>
          </Link>

          {firstProductVariant && (
            <div className='prdct-itm-price'>
              {firstProductVariant.sale ? (
                <div>
                  <span className='line-through'>
                    ${firstProductVariant.price}
                  </span>
                  <span className='prdct-itm-price prdct-itm-sale'>
                    ${firstProductVariant.salePrice}
                  </span>
                </div>
              ) : (
                <div>
                  ${firstProductVariant.price}
                </div>
              )}
            </div>
          )}

          <div className="prdct-itm-availability">
            {availability}
          </div>
        </div>

        {product.id && (
          <div className="prdct-itm-actions">
            <Link
              href={{
                pathname: `/product/update`,
                query: { id: product.id }
              }}
            >
              <a>Edit</a>
            </Link>

            <button id={product.id}>Remove</button>
          </div>
        )}
      </StyledProductsListItem>
    );
  }
}
