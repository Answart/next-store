import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import styled from 'styled-components';
import { departments, categories, colors, sizes } from '../config';
import { capWord, getFilterProps } from '../lib/utilFns';


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
      .color-sample {
        margin: -3.5px 0 0 -3.5px;
      }
    }
    .filter-sizes {
      padding: 0.5rem 1rem 0 1rem;
      display: grid;
      grid-auto-flow: row;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(4, 1fr);
    }
    .filter-hover {
      width: 2.5rem;
      height: 2.5rem;
      &:hover {
        border: 1px solid ${props => props.theme.black};
        border-radius: 15px;
      }
    }
    .filter-selected {
      width: 2.5rem;
      height: 2.5rem;
      border: 1px solid ${props => props.theme.black};
      border-radius: 15px;
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
  toggleFilter = (e, filter) => {
    if (!!e && e.preventDefault) e.preventDefault();
    let toggleMe = this.state[filter];

    this.setState({ [filter]: !toggleMe });
  };
  clearFilter = (e, queryVariable) => {
    if (!!e && e.preventDefault) e.preventDefault();
    const { pageQuery } = this.props;

    if (pageQuery[queryVariable]) {
      delete pageQuery[queryVariable];

      Router.push({
        pathname: "/shop",
        query: { ...pageQuery }
      });
    }
  };
  updateFilter = (e, queryVariable, queryValue) => {
    if (!!e && e.preventDefault) e.preventDefault();
    if (!queryValue) return;
    const { pageQuery } = this.props;
    console.log('updateFilter', queryVariable, queryValue)

    if (pageQuery[queryVariable] !== queryValue) {
      pageQuery[queryVariable] = queryValue;
    } else {
      delete pageQuery[queryVariable];
    };

    Router.push({
      pathname: "/shop",
      query: { ...pageQuery }
    });
  };
  render() {
    const {
      showCategories, showColors, showSizes, showPrices, showBrands
    } = this.state;
    const { pageQuery, products } = this.props;
    const { brands } = getFilterProps(products);
    const categoryListType = pageQuery.department ? 'category' : 'department';
    const categoryList = categoryListType === 'category'
      ? categories[pageQuery.department]
      : departments;
    return (
      <FilterStyles data-test="filter">
        {!!categoryList.length && (
          <div className="filter">
            <div className="filter-top">
              <h4>CATEGORY</h4>
              <button className="filter-clear-btn"
                disabled={!pageQuery[categoryListType]}
                onClick={(e) => this.clearFilter(e, categoryListType)}
              >{!!pageQuery.category && 'Clear'}</button>
              <button
                onClick={(e) => this.toggleFilter(e, 'showCategories')}
              >click</button>
            </div>

            {showCategories && (
              <div className="filter-categories">
                {categoryList.map((category, i) => (
                  <button key={i} className="undrln-btn"
                    disabled={category == pageQuery[categoryListType]}
                    title={`Go to category: ${capWord(category)}`}
                    onClick={(e) => this.updateFilter(e, categoryListType, category)}
                  >
                    {capWord(category)}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {!!colors.length && (
          <div className="filter">
            <div className="filter-top">
              <h4>COLOR</h4>
              <button className="filter-clear-btn"
                disabled={!pageQuery.color}
                onClick={(e) => this.clearFilter(e, 'color')}
              >{!!pageQuery.color && 'Clear'}</button>
              <button
                onClick={(e) => this.toggleFilter(e, 'showColors')}
              >click</button>
            </div>

            {showColors && (
              <div className="filter-colors">
                {colors.map((color, i) => (
                  <button key={i} className={`undrln-btn ${color == pageQuery.color ? 'filter-selected' : 'filter-hover'}`}
                    title={`Refine by color: ${capWord(color)}`}
                    onClick={(e) => this.updateFilter(e, 'color', color)}
                  >
                    <div className={`color-sample ${color}-sample`}></div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {!!sizes.length && (
          <div className="filter">
            <div className="filter-top">
              <h4>SIZE</h4>
              <button className="filter-clear-btn"
                disabled={!pageQuery.size}
                onClick={(e) => this.clearFilter(e, 'size')}
              >{!!pageQuery.size && 'Clear'}</button>
              <button
                onClick={(e) => this.toggleFilter(e, 'showSizes')}
              >click</button>
            </div>

            {showSizes && (
              <div className="filter-sizes">
                {sizes.map((size, i) => (
                  <button key={i} className={`undrln-btn ${size == pageQuery.size ? 'filter-selected' : 'filter-hover'}`}
                    onClick={(e) => this.updateFilter(e, 'size', size)}
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
              onClick={(e) => this.clearFilter(e, 'price')}
            >{!!pageQuery.price && 'Clear'}</button>
            <button
              onClick={(e) => this.toggleFilter(e, 'showPrices')}
            >click</button>
          </div>
        </div>

        {!!brands.length && (
          <div className="filter">
            <div className="filter-top">
              <h4>BRAND</h4>
              <button className="filter-clear-btn"
                disabled={!pageQuery.brand}
                onClick={(e) => this.clearFilter(e, 'brand')}
              >{!!pageQuery.brand && 'Clear'}</button>
              <button
                onClick={(e) => this.toggleFilter(e, 'showBrands')}
              >click</button>
            </div>

            {showBrands && (
              <div className="filter-categories">
                {brands.map((brand, i) => (
                  <button key={i} className="undrln-btn"
                    disabled={brand == pageQuery.brand}
                    title={`Refine by brand: ${capWord(brand)}`}
                    onClick={(e) => this.updateFilter(e, 'brand', brand)}
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
