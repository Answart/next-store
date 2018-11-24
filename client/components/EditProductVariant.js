import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import { StyledEditProduct, StyledEditProductVariant } from './styles/ProductStyles';
import { CreateProductVariantForm, UpdateProductVariantForm } from './Forms';
import DeleteProductVariant from './Buttons/DeleteProductVariant';
import ProductVariants from './ProductVariants';
import { PRODUCT_PROD_VARIANTS_QUERY } from '../graphql';


class EditProductVariant extends Component {
  state = {
    tab: 0,
    currentVariant: null
  };
  setActiveTab = (tab, e) => {
    e.preventDefault();
    this.setState({ tab });
  };
  selectVariant = (e, currentVariant) => {
    e.preventDefault();
    this.setState({ currentVariant });
  }
  render() {
    const { tab, currentVariant } = this.state;
    const { id, productTitle } = this.props;
    return (
      <Query
        query={PRODUCT_PROD_VARIANTS_QUERY}
        variables={{ id }}
      >
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const { productVariants } = data;
          const variant = productVariants.length ? productVariants[0] : null;
          return (
            <StyledEditProduct>
              <div className="edt-prdct-title">
                Edit &#8811;
                <Link href={{
                  pathname: `/product/edit`,
                  query: { id }
                }}><a className="thn-btn">
                  {productTitle}
                </a></Link>

                <span>&#8811;
                  <button className="thn-btn"
                    onClick={this.setActiveTab.bind(this, 0)}
                  >Selections</button>

                  {tab == 1 && (
                    <span>&#8811; Add Selection</span>
                  )}
                </span>
              </div>

              <div className="edt-prdct-tab">
                <div className="edt-prdct-navi">
                  {tab == 0 && (
                    <>
                      <Link href={{
                        pathname: `/product/edit`,
                        query: { id }
                      }}><a className="undrln-btn">
                        &#8810; Product
                      </a></Link>

                      <button className="undrln-btn"
                        onClick={this.setActiveTab.bind(this, 1)}
                      >Add Selection &#8811;</button>
                    </>
                  )}
                  {tab == 1 && (
                    <button className="undrln-btn"
                      onClick={this.setActiveTab.bind(this, 0)}
                    >&#8810; Selections</button>
                  )}
                </div>

                <div className="edt-prdct-cntnt">
                  {!productVariants.length && tab == 0 && (
                    <p>This product does not have any selections.</p>
                  )}
                  {!!productVariants.length && tab == 0 && (
                    <StyledEditProductVariant>
                      <ProductVariants
                        variants={productVariants}
                        online={true}
                        demoView={true}
                        variantAction={this.selectVariant}
                        variantActionLabel='Select'
                      />

                      <div className='edt-prdct-updt'>
                        {!currentVariant ? (
                          <p>Choose a selection to update.</p>
                        ) : (
                          <>
                            <UpdateProductVariantForm variant={currentVariant} />

                            <DeleteProductVariant id={currentVariant.id}
                            >Delete Selection</DeleteProductVariant>
                          </>
                        )}
                      </div>

                    </StyledEditProductVariant>
                  )}
                  {tab == 1 && (
                    <CreateProductVariantForm productId={id} />
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

export default EditProductVariant;
