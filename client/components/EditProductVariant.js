import React, { Component } from 'react';
import Link from 'next/link';
import { StyledEditProduct } from './styles/ProductStyles';


class EditProductVariant extends Component {
  state = { tab: 0 };
  setActiveTab = (tab, e) => {
    e.preventDefault();
    this.setState({ tab });
  };
  render() {
    const { tab } = this.state;
    const { id, productTitle } = this.props;
    const productVariants = [];
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
                    <div>
                      <p>Update variants here</p>
                    </div>
                  )}
                  {tab == 1 && (
                    <p>Create product variant here</p>
                  )}
                </div>
              </div>
            </StyledEditProduct>
          );
  };
};

export default EditProductVariant;
