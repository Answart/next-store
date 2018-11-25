import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import StyledProduct from './styles/ProductStyles';
import ProductVariants from './ProductVariants';
import AddToCart from './Buttons/AddToCart';
import { user } from '../lib/dummyData';
import { PRODUCT_QUERY } from '../graphql';


class Product extends Component {

  render() {
    const { id, demoView } = this.props;
    return (
      <Query
        query={PRODUCT_QUERY}
        variables={{ id }}
      >
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const { product } = data;
          const productTitle = product ? product.title : '';
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
                      id: product.id
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
          )
        }}
      </Query>
    );
  }
}

export default Product;
