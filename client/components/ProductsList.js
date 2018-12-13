import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { StyledProductsList, StyledProductsListItem } from './styles/ProductStyles';
import PriceTag from './PriceTag';
import { user } from '../lib/dummyData';


class ProductsList extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired
  };
  render() {
    return (
      <StyledProductsList>
        {this.props.products.map(prdct => {
          const viewerIsCreator = prdct
            ? prdct.user.id === user.id
            : false;
          const variant = prdct.productVariants.length
            ? prdct.productVariants[0]
            : null;
          return (
            <StyledProductsListItem key={prdct.id} >
              <Link href={{
                pathname: "/buy",
                query: { id: prdct.id }
              }}>
                <a>{prdct.image && (
                  <img width="400" height="610" src={prdct.image.image_url} alt={prdct.title} />
                )}</a>
              </Link>

              <div className="prdct-itm-info">
                <Link href={{
                  pathname: "/buy",
                  query: { id: prdct.id }
                }}>
                  <a className='prdct-itm-title'>{prdct.title}</a>
                </Link>

                {variant && variant.price && (
                  <div className="prdct-itm-price">
                    <PriceTag variant={variant} />
                  </div>
                )}

                {prdct.online && variant && (
                  <div className="prdct-itm-avail">
                    {variant.availability}
                  </div>
                )}
              </div>

              {prdct.id && viewerIsCreator && (
                <span className="prdct-itm-actns">
                  <Link href={{
                    pathname: "/product/edit",
                    query: { id: prdct.id }
                  }}><a>
                    Edit
                  </a></Link>
                  <button className="undrln-btn"
                    id={prdct.id}
                  >Delete</button>
                </span>
              )}

              {!prdct.online && (
                <span><i className="prdct-itm-actns">(Offline)</i></span>
              )}
            </StyledProductsListItem>
          )
        })}
      </StyledProductsList>
    );
  }
}


export default ProductsList;
