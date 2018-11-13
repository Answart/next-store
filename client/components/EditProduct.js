import React, { Component } from 'react';
import styled from 'styled-components';
import { StyledEditProduct } from './styles/ProductStyles';
import product from '../lib/dummyData';


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
              Update product here
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
                  Update existing product variant here
                </div>
              ) : (
                <p>This product has no selections to update.</p>
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
              Create product variant here
            </div>
          </div>
        )}
      </StyledEditProduct>
    )
  };
};

export default EditProduct;
