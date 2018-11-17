import React, { Component } from 'react';
import { StyledEditProduct } from './styles/ProductStyles';
import { Query } from 'react-apollo';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import CreateProductVariant from './CreateProductVariant';
import { PRODUCT_QUERY } from '../graphql';


class EditProduct extends Component {
  state = { tab: 0 };
  setActiveTab = (tab, e) => {
    e.preventDefault();
    this.setState({ tab });
  };
  render() {
    const { tab } = this.state;
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
          return (
            <StyledEditProduct>
              <div className="edt-prdct-title">
                Edit &#8811;
                <button className="thn-btn"
                  onClick={this.setActiveTab.bind(this, 0)}
                >{product ? product.title : ''}</button>

                {tab !== 0 && (
                  <span>&#8811;
                    <button className="thn-btn"
                      onClick={this.setActiveTab.bind(this, 1)}
                    >Selections</button>

                    {tab == 2 && (
                      <span>&#8811; Add Selection</span>
                    )}
                  </span>
                )}
              </div>

              <div className="edt-prdct-tab">
                <div className="edt-prdct-navi">
                  {product && tab == 0 && (
                    <button className="undrln-btn"
                      onClick={this.setActiveTab.bind(this, 1)}
                    >Selections &#8811;</button>
                  )}
                  {tab == 1 && (
                    <>
                      <button className="undrln-btn"
                        onClick={this.setActiveTab.bind(this, 0)}
                      >&#8810; Product</button>
                      <button className="undrln-btn"
                        onClick={this.setActiveTab.bind(this, 2)}
                      >Add Selection &#8811;</button>
                    </>
                  )}
                  {tab == 2 && (
                    <button className="undrln-btn"
                      onClick={this.setActiveTab.bind(this, 1)}
                    >&#8810; Selections</button>
                  )}
                </div>

                <div className="edt-prdct-cntnt">
                  {!product && (
                    <p>Could not find product with this id.</p>
                  )}
                  {product && tab == 0 && (
                    <>
                      <UpdateProduct product={product} />

                      <DeleteProduct id={product.id}>Delete Product</DeleteProduct>
                    </>
                  )}
                  {product && tab == 1 && (
                    <p>Update variants here</p>
                  )}
                  {product && tab == 2 && (
                    <CreateProductVariant productId={product.id}
                    />
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
