import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import styled from 'styled-components';
import { DEPARTMENTS, CATEGORIES, COLORS, SIZES } from '../config';
import { capWord, getFilterProps } from '../lib/utils';


const FilterStyles = styled.div`
  text-align: left;
  width: 100%;
  overflow: hidden;
  .filter {
    display: grid;
    text-align: center;
    align-items: stretch;
    justify-content: start;
    align-content: start;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${props => props.theme.lightGrey};
    margin-bottom: 1rem;
    .filter-top {
      display: inline-grid;
      grid-template-columns: 10rem 4rem 4rem;
      grid-auto-flow: column;
      h4 {
        text-align: left;
        justify-content: start;
        align-content: start;
      }
      button {
        text-align: right;
        justify-content: end;
        align-content: end;
        &[disabled] {
          pointer-events: none;
        }
      }
      .filter-clear-btn {
        font-style: italic;
        color: ${props => props.theme.grey};
      }
    }
    .filter-categories {
      padding: 0 1rem;
      display: grid;
      grid-auto-flow: row;
      text-align: left;
      justify-content: start;
      button {
        text-align: left;
      }
    }
    .filter-colors {
      padding: 0.5rem 1rem 0 1rem;
      display: grid;
      grid-auto-flow: row;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(3, 1fr);
      align-items: stretch;
    }
    .filter-sizes {
      padding: 0.5rem 1rem 0 1rem;
      display: grid;
      grid-auto-flow: row;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(4, 1fr);
    }
  }
`;

class Filter extends Component {
  static propTypes = {
    pageQuery: PropTypes.object.isRequired,
    products: PropTypes.arrayOf(PropTypes.object)
  };
  state = {
    showCategories: true,
    showColors: true,
    showSizes: true,
    showPrices: true,
    showBrands: true
  };
  toggleFilter = e => {
    if (!!e && e.preventDefault) e.preventDefault();
    const { name } = e.currentTarget;
    let toggleMe = this.state[name];

    this.setState({ [name]: !toggleMe });
  };
  clearFilter = e => {
    if (!!e && e.preventDefault) e.preventDefault();
    const { name } = e.currentTarget;
    const { pageQuery } = this.props;

    if (pageQuery[name]) {
      delete pageQuery[name];

      Router.push({
        pathname: "/shop",
        query: { ...pageQuery }
      });
    }
  };
  updateFilter = e => {
    if (!!e && e.preventDefault) e.preventDefault();
    const { name, value } = e.currentTarget;
    if (!value) return;
    const { pageQuery } = this.props;

    if (pageQuery[name] !== value) {
      pageQuery[name] = value;
    } else {
      delete pageQuery[name];
    };

    Router.push({
      pathname: "/shop",
      query: { ...pageQuery }
    });
  };
  render() {
    const { pageQuery, products } = this.props;
    const { brands } = getFilterProps(products);
    const categoryListType = pageQuery.department ? 'category' : 'department';
    const categoryList = categoryListType === 'category'
      ? CATEGORIES[pageQuery.department]
      : DEPARTMENTS;
    return (
      <FilterStyles data-test="filter">
        {!!categoryList.length && (
          <div className="filter">
            <div className="filter-top">
              <h4>CATEGORY</h4>

              <button className="filter-clear-btn"
                disabled={!pageQuery[categoryListType]}
                name={categoryListType}
                onClick={this.clearFilter}
              >{!!pageQuery.category && 'Clear'}</button>

              <button
                name="showCategories"
                onClick={this.toggleFilter}
              >click</button>
            </div>

            {this.state.showCategories && (
              <div className="filter-categories">
                {categoryList.map((category, i) => (
                  <button key={i} className="undrln-btn"
                    disabled={category == pageQuery[categoryListType]}
                    title={`Go to category: ${capWord(category)}`}
                    name={categoryListType}
                    value={category}
                    onClick={this.updateFilter}
                  >
                    {capWord(category)}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {!!COLORS.length && (
          <div className="filter">
            <div className="filter-top">
              <h4>COLOR</h4>

              <button className="filter-clear-btn"
                disabled={!pageQuery.color}
                name="color"
                onClick={this.clearFilter}
              >{!!pageQuery.color && 'Clear'}</button>

              <button
                name="showColors"
                onClick={this.toggleFilter}
              >click</button>
            </div>

            {this.state.showColors && (
              <div className="filter-colors">
                {COLORS.map((color, i) => (
                  <button key={i} className={`undrln-btn ${color == pageQuery.color ? 'sample-selected' : 'sample-hover'}`}
                    title={`Refine by color: ${capWord(color)}`}
                    name="color"
                    value={color}
                    onClick={this.updateFilter}
                  >
                    <div className={`color-sample ${color}-sample`}></div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {!!SIZES.length && (
          <div className="filter">
            <div className="filter-top">
              <h4>SIZE</h4>

              <button className="filter-clear-btn"
                disabled={!pageQuery.size}
                name="size"
                onClick={this.clearFilter}
              >{!!pageQuery.size && 'Clear'}</button>

              <button
                name="showSizes"
                onClick={this.toggleFilter}
              >click</button>
            </div>

            {this.state.showSizes && (
              <div className="filter-sizes">
                {SIZES.map((size, i) => (
                  <button key={i} className={`undrln-btn ${size == pageQuery.size ? 'sample-selected' : 'sample-hover'}`}
                    name="size"
                    value={size}
                    onClick={this.updateFilter}
                  >
                    {capWord(size)}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="filter">
          <div className="filter-top">
            <h4>PRICE</h4>

            <button className="filter-clear-btn"
              disabled={!pageQuery.price}
              name="price"
              onClick={this.clearFilter}
            >{!!pageQuery.price && 'Clear'}</button>

            <button
              name="showPrices"
              onClick={this.toggleFilter}
            >click</button>
          </div>
        </div>

        {!!brands.length && (
          <div className="filter">
            <div className="filter-top">
              <h4>BRAND</h4>

              <button className="filter-clear-btn"
                disabled={!pageQuery.brand}
                name="brand"
                onClick={this.clearFilter}
              >{!!pageQuery.brand && 'Clear'}</button>

              <button
                name="showBrands"
                onClick={this.toggleFilter}
              >click</button>
            </div>

            {this.state.showBrands && (
              <div className="filter-categories">
                {brands.map((brand, i) => (
                  <button key={i} className="undrln-btn"
                    disabled={brand == pageQuery.brand}
                    title={`Refine by brand: ${capWord(brand)}`}
                    name="brand"
                    value={brand}
                    onClick={this.updateFilter}
                  >
                    {capWord(brand)}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </FilterStyles>
    );
  }
};


export default Filter;
