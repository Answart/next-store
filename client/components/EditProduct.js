import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import { StyledEditProduct } from './styles/ProductStyles';
import PageTitle from './PageTitle';
import { UpdateProductForm } from './Forms';
import DeleteProduct from './Buttons/DeleteProduct';
import { PRODUCT_QUERY } from '../graphql';


class EditProduct extends Component {
  render() {
    const { id } = this.props;
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
          return (
            <StyledEditProduct>
              <PageTitle
                page='Edit'
                titles={[{ label: productTitle }]}
              />

              <div className="edt-prdct-tab">
                <div className="edt-prdct-navi">
                  <Link href={{
                    pathname: `/product/selections/edit`,
                    query: {
                      id,
                      title: productTitle
                    }
                  }}><a className="undrln-btn">
                    Selections &#8811;
                  </a></Link>
                </div>

                <div className="edt-prdct-cntnt">
                  {!product ? (
                    <p>Could not find a product with this id.</p>
                  ) : (
                    <>
                      <UpdateProductForm product={product} />

                      <DeleteProduct id={product.id}>Delete Product</DeleteProduct>
                    </>
                  )}
                </div>
              </div>
            </StyledEditProduct>
          );
        }}
      </Query>
    )
  };
};

export default EditProduct;
