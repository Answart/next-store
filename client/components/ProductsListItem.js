import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';


const StyledProductsListItem = styled.div`
  padding: 1rem;
  img {
    display: grid;
    grid-auto-columns: 1fr;
    min-height: 32rem;
    min-width: 100%;
  }
  a {
    padding: 0;
    text-transform: none;
  }
`;

const ProductInfo = styled.div`
  padding: 0.2rem 0;
  a {
    padding: 0.2rem 0;
    text-transform: none;
    color: ${props => props.theme.darkblue};
  }
  .product-title {
    padding: 0.2rem 0;
    font-size: 1.1rem;
    text-align: left;
    font-weight: bold;
  }
  .product-price {
    padding: 0.4rem 0;
    font-size: 0.85rem;
    font-weight: bold;
    color: ${props => props.theme.textGrey};
  }
  .product-sale {
    padding-left: 0.5rem;
    color: ${props => props.theme.orange};
  }
  .product-availability {
    font-style: italic;
    font-size: 1rem;
    color: ${props => props.theme.orange};
  }
`;

const ProductActions = styled.div`
  padding: 0.2rem 0;
  a {
    padding: 0 0.3rem 0 0;
    font-size: 0.85rem;
    color: ${props => props.theme.textGrey};
  }
  button {
    padding: 0.3rem;
    border: 0;
    font-size: 0.9rem;
    font-weight: bold;
    color: ${props => props.theme.textGrey};
  }
`

export default class Product extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
  };

  render() {
    const { product } = this.props;
    const firstProductVariant = product.productVariants[0];
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

        <ProductInfo>
          <Link
            href={{
              pathname: `/product/buy`,
              query: { id: product.id }
            }}
          >
            <a className='product-title'>{product.title}</a>
          </Link>

          <div className='product-price'>
            {firstProductVariant.sale ? (
              <div>
                <span className='line-through'>
                  ${firstProductVariant.price}
                </span>
                <span className='product-price product-sale'>
                  ${firstProductVariant.salePrice}
                </span>
              </div>
            ) : (
              <div>
                ${firstProductVariant.price}
              </div>
            )}
          </div>

          {product.status && (
            <div className="product-availability">
              {product.status}
            </div>
          )}
        </ProductInfo>

        {product.id && (
          <ProductActions>
            <Link
              href={{
                pathname: `/product/update`,
                query: { id: product.id }
              }}
            >
              <a>Edit</a>
            </Link>

            <button id={product.id}>Remove</button>
          </ProductActions>
        )}
      </StyledProductsListItem>
    );
  }
}
