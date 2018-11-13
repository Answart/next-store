import React, { Component } from 'react';
import { StyledEditProduct } from './styles/ProductStyles';
import { Query } from 'react-apollo';
import CreateProductVariant from './CreateProductVariant';
import { PRODUCT_QUERY } from '../graphql';


class EditProduct extends Component {
  state = { activeTab: 0 };
  setActiveTab = (activeTab, e) => {
    e.preventDefault();
    this.setState({ activeTab });
  };
  render() {
    const { activeTab } = this.state;
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
                <button
                  onClick={this.setActiveTab.bind(this, 0)}
                >{product.title}</button>

                {activeTab !== 0 && (
                  <span>&#8811;
                    <button
                      onClick={this.setActiveTab.bind(this, 1)}
                    >Selections</button>

                    {activeTab == 2 && (
                      <span>&#8811;  Add Selection</span>
                    )}
                  </span>
                )}
              </div>

              {activeTab == 0 && (
                <div className="edt-prdct-tab">
                  <div className="edt-prdct-navi">
                    <button className="undrln-btn"
                      onClick={this.setActiveTab.bind(this, 1)}
                    >Selections &#8811;</button>
                  </div>

                  <div className="edt-prdct-cntnt">
                    update here
                  </div>
                </div>
              )}

              {activeTab == 1 && (
                <div className="edt-prdct-tab">
                  <div className="edt-prdct-navi">
                    <button className="undrln-btn"
                      onClick={this.setActiveTab.bind(this, 0)}
                    >&#8810; Product</button>
                    <button className="undrln-btn"
                      onClick={this.setActiveTab.bind(this, 2)}
                    >Add Selection &#8811;</button>
                  </div>

                  <div className="edt-prdct-cntnt">
                    {!!product.productVariants.length ? (
                      <div>
                        <i>{product.productVariants.length} unique Selections:</i>
                        update variants here
                      </div>
                    ) : (
                      <p>This product has no selections to remove.</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab == 2 && (
                <div className="edt-prdct-tab">
                  <div className="edt-prdct-navi">
                    <button className="undrln-btn"
                      onClick={this.setActiveTab.bind(this, 1)}
                    >&#8810; Selections</button>
                  </div>

                  <div className="edt-prdct-cntnt">
                    <CreateProductVariant
                      productId={id}
                    />
                  </div>
                </div>
              )}
            </StyledEditProduct>
          );
        }}
      </Query>
    )
  };
};

export default EditProduct;
