import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { StyledFilter } from '../styles/FilterStyles';
import FilterSection from './FilterSection';
import { DEPARTMENTS, CATEGORIES, COLORS, SIZES } from '../../config';


class Filter extends Component {
  static propTypes = {
    pageQuery: PropTypes.object.isRequired,
    products: PropTypes.arrayOf(PropTypes.object)
  };
  state = {
    showCategory: true,
    showColor: true,
    showSize: true,
    showPrice: true,
    showBrand: true
  };
  toggleFilter = e => {
    if (!!e && e.preventDefault) e.preventDefault();
    const { name } = e.currentTarget;

    this.setState(state => ({ [name]: !state[name] }));
  };
  updateFilter = e => {
    if (!!e && e.preventDefault) e.preventDefault();
    const { name, value } = e.currentTarget;
    if (!name) return;
    const { pageQuery } = this.props;

    if (!!value && pageQuery[name] !== value) {
      pageQuery[name] = value;
    } else {
      delete pageQuery[name];
    }

    Router.push({
      pathname: "/shop",
      query: { ...pageQuery }
    });
  };
  render() {
    const { pageQuery } = this.props;
    const {
      showCategory, showColor, showSize, showPrice, showBrand
    } = this.state;
    const categoryListType = pageQuery.department
      ? 'category'
      : 'department';
    const categoryList = categoryListType === 'category'
      ? CATEGORIES[pageQuery.department]
      : DEPARTMENTS;
    return (
      <StyledFilter data-test="filter">
        <FilterSection
          showName='showCategory'
          name={categoryListType}
          currentFilter={pageQuery[categoryListType]}
          showFilter={showCategory}
          toggleFilter={this.toggleFilter}
          updateFilter={this.updateFilter}
        >
          {showCategory && (
            <div>show categories</div>
          )}
        </FilterSection>

        <FilterSection
          showName='showColor'
          name='color'
          circleHover={true}
          currentFilter={pageQuery['color']}
          showFilter={showColor}
          toggleFilter={this.toggleFilter}
          updateFilter={this.updateFilter}
        >
          {showColor && (
            <div>show colors</div>
          )}
        </FilterSection>

        <FilterSection
          showName='showSize'
          name='size'
          circleHover={true}
          currentFilter={pageQuery['size']}
          showFilter={showSize}
          toggleFilter={this.toggleFilter}
          updateFilter={this.updateFilter}
        >
          {showSize && (
            <div>show sizes</div>
          )}
        </FilterSection>

        <FilterSection
          showName='showPrice'
          name='price'
          circleHover={true}
          currentFilter={pageQuery['price']}
          showFilter={showPrice}
          toggleFilter={this.toggleFilter}
          updateFilter={this.updateFilter}
        >
          {showPrice && (
            <div>show price range</div>
          )}
        </FilterSection>

        <FilterSection
          showName='showBrand'
          name='brand'
          circleHover={true}
          currentFilter={pageQuery['brand']}
          showFilter={showBrand}
          toggleFilter={this.toggleFilter}
          updateFilter={this.updateFilter}
        >
          {showBrand && (
            <div>show brands</div>
          )}
        </FilterSection>
      </StyledFilter>
    );
  }
};


export default Filter;
