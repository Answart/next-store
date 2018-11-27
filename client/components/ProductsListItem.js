import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { StyledProductsListItem } from './styles/ProductStyles';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import { user } from '../lib/dummyData';


export default class Product extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired
  };
  render() {
    const { product } = this.props;
    const viewerIsCreator = product
      ? product.user.id === user.id
      : false;
    const variant = product.productVariants.length
      ? product.productVariants[0]
      : null;
    return (
      <StyledProductsListItem>
        <Link href={{
          pathname: `/buy`,
          query: { id: product.id }
        }}>
          <a>{product.image && (
            <img src={product.image} alt={product.title} />
          )}</a>
        </Link>

        <div className="prdct-itm-info">
          <Link href={{
            pathname: `/buy`,
            query: { id: product.id }
          }}>
            <a className='prdct-itm-title'>{product.title}</a>
          </Link>

          {variant && variant.price && (
            <div className='prdct-itm-price'>
              {variant.sale ? (
                <div>
                  <span className='line-through'>
                    {formatMoney(variant.price)}
                  </span>
                  <span className='prdct-itm-price prdct-itm-sale'>
                    {formatMoney(variant.salePrice)}
                  </span>
                </div>
              ) : (
                <div>
                  {formatMoney(variant.price)}
                </div>
              )}
            </div>
          )}

          {product.online && variant && (
            <div className="prdct-itm-avail">
              {variant.availability}
            </div>
          )}
        </div>

        {viewerIsCreator && product.id && (
          <span className="prdct-itm-actns">
            <Link href={{
              pathname: `/product/edit`,
              query: { id: product.id }
            }}><a>
              Edit
            </a></Link>
            <button className="undrln-btn"
              id={product.id}
            >Delete</button>
          </span>
        )}

        {!product.online && (
          <span><i className="prdct-itm-actns">(Offline)</i></span>
        )}
      </StyledProductsListItem>
    );
  }
}
